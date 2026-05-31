import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2, Lock } from 'lucide-react';
import { BASE_DEDICATIONS, DEDICATION_STATUSES } from '../data/dedications';
import { CAMPAIGN_DEFAULTS, formatCurrency, readCampaignData, updateCampaignTotal } from '../lib/campaignApi';
import { getDefaultDedicationStatuses, readDedicationStatuses, updateDedicationStatuses } from '../lib/dedicationApi';

const parseAmount = (value) => {
  const number = Number(String(value).replace(/[^0-9]/g, ''));
  return Number.isFinite(number) ? number : 0;
};

const UpdateTotal = () => {
  const [amount, setAmount] = useState(String(CAMPAIGN_DEFAULTS.raised));
  const [campaignData, setCampaignData] = useState(CAMPAIGN_DEFAULTS);
  const [dedicationStatuses, setDedicationStatuses] = useState(getDefaultDedicationStatuses);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('total');
  const [authStatus, setAuthStatus] = useState('idle');
  const [authMessage, setAuthMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [dedicationStatus, setDedicationStatus] = useState('idle');
  const [dedicationMessage, setDedicationMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    readCampaignData().then((data) => {
      setCampaignData(data);
      setAmount(String(data.raised));
    });

    readDedicationStatuses().then(setDedicationStatuses);
  }, [isAuthenticated]);

  const numericAmount = useMemo(() => parseAmount(amount), [amount]);
  const dedicationOptions = useMemo(() => (
    BASE_DEDICATIONS.map((dedication) => ({
      ...dedication,
      status: dedicationStatuses[dedication.id] || dedication.status,
    }))
  ), [dedicationStatuses]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setAuthStatus('saving');
    setAuthMessage('');

    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.status === 401) {
        throw Object.assign(new Error('Invalid password'), { code: 'invalid_password' });
      }

      if (!response.ok) {
        throw new Error(`Admin login returned ${response.status}`);
      }

      setAuthStatus('saved');
      setIsAuthenticated(true);
    } catch (error) {
      setAuthStatus('error');
      setAuthMessage(
        error.code === 'invalid_password'
          ? 'Please enter the correct password.'
          : 'Could not unlock the admin page. Please try again.'
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('saving');
    setMessage('');

    try {
      const updatedData = await updateCampaignTotal(numericAmount, password);
      setCampaignData(updatedData);
      setAmount(String(updatedData.raised));
      setStatus('saved');
      setMessage(`Saved. The homepage running total is now ${formatCurrency(updatedData.raised)}.`);
    } catch (error) {
      setStatus('error');
      setMessage(
        error.code === 'invalid_password' || error.code === 'missing_password'
          ? 'Please enter the correct password.'
          : 'Could not save the total. Please try again.'
      );
    }
  };

  const handleDedicationStatusChange = (id, nextStatus) => {
    setDedicationStatuses((currentStatuses) => ({
      ...currentStatuses,
      [id]: nextStatus,
    }));
  };

  const handleDedicationSubmit = async (event) => {
    event.preventDefault();
    setDedicationStatus('saving');
    setDedicationMessage('');

    try {
      const updatedStatuses = await updateDedicationStatuses(dedicationStatuses, password);
      setDedicationStatuses(updatedStatuses);
      setDedicationStatus('saved');
      setDedicationMessage('Saved. The dedication statuses are now live on the Dedications page.');
    } catch (error) {
      setDedicationStatus('error');
      setDedicationMessage(
        error.code === 'invalid_password' || error.code === 'missing_password'
          ? 'Please enter the correct password.'
          : 'Could not save dedication statuses. Please try again.'
      );
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center bg-[#f6f7f3] px-4 py-10 text-secondary-950">
        <section className="mx-auto w-full max-w-xl">
          <div className="form-frame p-6 pt-10 sm:p-8 sm:pt-12">
            <p className="eyebrow">Campaign Admin</p>
            <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Enter Password
            </h1>
            <p className="mt-3 text-sm font-bold leading-relaxed text-secondary-500">
              Unlock the admin page to update the running total or dedication statuses.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div>
                <label htmlFor="admin-password" className="mb-2 block text-sm font-extrabold text-secondary-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-400" />
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="field-control py-4 pl-12 text-lg font-bold"
                    placeholder="Enter password"
                    autoComplete="current-password"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authStatus === 'saving'}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary-600 px-6 py-4 text-lg font-extrabold text-white shadow-xl shadow-primary-950/10 transition hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300/40 disabled:cursor-not-allowed disabled:bg-secondary-400"
              >
                {authStatus === 'saving' ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Unlocking
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Unlock Admin
                  </>
                )}
              </button>
            </form>

            {authMessage && (
              <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                {authMessage}
              </div>
            )}

            <div className="mt-6 text-sm text-secondary-500">
              <Link to="/" className="font-extrabold text-primary-700 hover:text-primary-800">
                Open homepage
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f7f3] px-4 py-10 text-secondary-950">
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="form-frame p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Campaign Admin</p>
              <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                Admin Dashboard
              </h1>
            </div>
            <Link to="/" className="text-sm font-extrabold text-primary-700 hover:text-primary-800">
              Open homepage
            </Link>
          </div>

          <div className="mt-7 grid gap-2 rounded-md border border-secondary-200 bg-secondary-50 p-2 sm:grid-cols-2">
            {[
              { label: 'Running Total', value: 'total' },
              { label: 'Dedication Status', value: 'dedications' },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-sm px-4 py-3 text-sm font-extrabold transition ${
                  activeTab === tab.value
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-950/10'
                    : 'text-secondary-600 hover:bg-white hover:text-secondary-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'total' && (
          <div className="form-frame p-6 pt-10 sm:p-8 sm:pt-12">
            <p className="eyebrow">Running Total</p>
            <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Update Running Total
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="running-total" className="mb-2 block text-sm font-extrabold text-secondary-700">
                  Running Total
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-extrabold text-secondary-400">
                    $
                  </span>
                  <input
                    id="running-total"
                    inputMode="numeric"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    className="field-control py-5 pl-10 text-3xl font-extrabold"
                    placeholder="10400"
                  />
                </div>
              </div>

              <div className="rounded-md border border-secondary-200 bg-secondary-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-bold text-secondary-600">Preview</span>
                  <span className="font-display text-2xl font-extrabold text-primary-600">
                    {formatCurrency(numericAmount)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'saving'}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary-600 px-6 py-4 text-lg font-extrabold text-white shadow-xl shadow-primary-950/10 transition hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300/40 disabled:cursor-not-allowed disabled:bg-secondary-400"
              >
                {status === 'saving' ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Save Total
                  </>
                )}
              </button>
            </form>

            {message && (
              <div
                className={`mt-5 rounded-md border p-4 text-sm font-bold ${
                  status === 'error'
                    ? 'border-red-200 bg-red-50 text-red-700'
                    : 'border-green-200 bg-green-50 text-green-800'
                }`}
              >
                {message}
              </div>
            )}

            <div className="mt-6 text-sm text-secondary-500">
              <span>Current saved total: {formatCurrency(campaignData.raised)}</span>
            </div>
          </div>
        )}

        {activeTab === 'dedications' && (
          <div className="form-frame p-6 pt-10 sm:p-8 sm:pt-12">
            <p className="eyebrow">Dedications</p>
            <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Update Dedication Status
            </h2>
            <p className="mt-3 text-sm font-bold leading-relaxed text-secondary-500">
              Choose whether each dedication is available, reserved, or sold.
            </p>

            <form onSubmit={handleDedicationSubmit} className="mt-8 space-y-4">
              <div className="overflow-hidden rounded-md border border-secondary-200 bg-white">
                {dedicationOptions.map((dedication, index) => (
                  <div
                    key={dedication.id}
                    className={`grid gap-3 p-4 sm:grid-cols-[1fr_180px] sm:items-center ${
                      index === 0 ? '' : 'border-t border-secondary-100'
                    }`}
                  >
                    <div>
                      <p className="font-display text-lg font-extrabold text-secondary-950">
                        {dedication.title}
                      </p>
                      <p className="mt-1 text-sm font-bold text-secondary-500">
                        {[dedication.amount, dedication.phase].filter(Boolean).join(' · ') || 'No amount listed'}
                      </p>
                    </div>
                    <label className="sr-only" htmlFor={`dedication-status-${dedication.id}`}>
                      {dedication.title} status
                    </label>
                    <select
                      id={`dedication-status-${dedication.id}`}
                      value={dedication.status}
                      onChange={(event) => handleDedicationStatusChange(dedication.id, event.target.value)}
                      className="field-control py-3 text-base font-extrabold"
                    >
                      {Object.entries(DEDICATION_STATUSES).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={dedicationStatus === 'saving'}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary-600 px-6 py-4 text-lg font-extrabold text-white shadow-xl shadow-primary-950/10 transition hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300/40 disabled:cursor-not-allowed disabled:bg-secondary-400"
              >
                {dedicationStatus === 'saving' ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Save Dedication Statuses
                  </>
                )}
              </button>
            </form>

            {dedicationMessage && (
              <div
                className={`mt-5 rounded-md border p-4 text-sm font-bold ${
                  dedicationStatus === 'error'
                    ? 'border-red-200 bg-red-50 text-red-700'
                    : 'border-green-200 bg-green-50 text-green-800'
                }`}
              >
                {dedicationMessage}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default UpdateTotal;
