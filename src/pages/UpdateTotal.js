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

const adminShellClass = 'relative min-h-screen overflow-hidden bg-secondary-950 px-4 py-10 text-white';
const adminCardClass = 'relative overflow-hidden rounded-md border border-white/14 bg-secondary-950/76 p-6 shadow-2xl shadow-black/45 backdrop-blur-xl sm:p-8';
const adminInputClass = 'w-full rounded-md border border-white/14 bg-white/[0.06] text-white shadow-inner shadow-black/20 outline-none transition placeholder:text-white/35 focus:border-primary-300/70 focus:ring-4 focus:ring-primary-300/20';
const adminLabelClass = 'mb-2 block text-sm font-extrabold text-white/72';

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
      <main className={`${adminShellClass} flex items-center`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(249,115,22,0.22)_0%,rgba(249,115,22,0)_34%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_30%),linear-gradient(135deg,#02080f_0%,#07111f_48%,#02080f_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
        <section className="relative z-10 mx-auto w-full max-w-xl">
          <div className={`${adminCardClass} pt-10 sm:pt-12`}>
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-600" />
            <p className="eyebrow">Campaign Admin</p>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Enter Password
            </h1>
            <p className="mt-4 text-sm font-bold leading-relaxed text-white/62">
              Unlock the admin page to update the running total or dedication statuses.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div>
                <label htmlFor="admin-password" className={adminLabelClass}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-300" />
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className={`${adminInputClass} py-4 pl-12 pr-4 text-lg font-bold`}
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
              <div className="mt-5 rounded-md border border-red-300/30 bg-red-500/12 p-4 text-sm font-bold text-red-100">
                {authMessage}
              </div>
            )}

            <div className="mt-6 text-sm text-white/55">
              <Link to="/" className="font-extrabold text-primary-300 hover:text-primary-200">
                Open homepage
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={adminShellClass}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_8%,rgba(249,115,22,0.18)_0%,rgba(249,115,22,0)_35%),radial-gradient(circle_at_80%_4%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_28%),linear-gradient(135deg,#02080f_0%,#07111f_48%,#02080f_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/48 to-transparent" />
      <section className="relative z-10 mx-auto max-w-5xl space-y-6">
        <div className={adminCardClass}>
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-600" />
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Campaign Admin</p>
              <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                Admin Dashboard
              </h1>
            </div>
            <Link to="/" className="text-sm font-extrabold text-primary-300 hover:text-primary-200">
              Open homepage
            </Link>
          </div>

          <div className="mt-7 grid gap-2 rounded-md border border-white/14 bg-white/[0.045] p-2 shadow-inner shadow-black/20 sm:grid-cols-2">
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
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-950/30'
                    : 'text-white/62 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'total' && (
          <div className={`${adminCardClass} pt-10 sm:pt-12`}>
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-600" />
            <p className="eyebrow">Running Total</p>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Update Running Total
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="running-total" className={adminLabelClass}>
                  Running Total
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-extrabold text-primary-300">
                    $
                  </span>
                  <input
                    id="running-total"
                    inputMode="numeric"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    className={`${adminInputClass} py-5 pl-10 pr-4 text-3xl font-extrabold`}
                    placeholder="10400"
                  />
                </div>
              </div>

              <div className="rounded-md border border-white/14 bg-white/[0.045] p-4 shadow-inner shadow-black/20">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-bold text-white/58">Preview</span>
                  <span className="font-display text-2xl font-extrabold text-primary-300">
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
                    ? 'border-red-300/30 bg-red-500/12 text-red-100'
                    : 'border-green-300/30 bg-green-500/12 text-green-100'
                }`}
              >
                {message}
              </div>
            )}

            <div className="mt-6 text-sm text-white/58">
              <span>Current saved total: {formatCurrency(campaignData.raised)}</span>
            </div>
          </div>
        )}

        {activeTab === 'dedications' && (
          <div className={`${adminCardClass} pt-10 sm:pt-12`}>
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-600" />
            <p className="eyebrow">Dedications</p>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Update Dedication Status
            </h2>
            <p className="mt-3 text-sm font-bold leading-relaxed text-white/62">
              Choose whether each dedication is available, reserved, or sold.
            </p>

            <form onSubmit={handleDedicationSubmit} className="mt-8 space-y-4">
              <div className="overflow-hidden rounded-md border border-white/14 bg-white/[0.035] shadow-inner shadow-black/20">
                {dedicationOptions.map((dedication, index) => (
                  <div
                    key={dedication.id}
                    className={`grid gap-3 p-4 sm:grid-cols-[1fr_180px] sm:items-center ${
                      index === 0 ? '' : 'border-t border-white/10'
                    }`}
                  >
                    <div>
                      <p className="font-display text-lg font-extrabold text-white">
                        {dedication.title}
                      </p>
                      <p className="mt-1 text-sm font-bold text-white/55">
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
                      className={`${adminInputClass} px-4 py-3 text-base font-extrabold`}
                    >
                      {Object.entries(DEDICATION_STATUSES).map(([value, label]) => (
                        <option key={value} value={value} className="bg-secondary-950 text-white">
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
                    ? 'border-red-300/30 bg-red-500/12 text-red-100'
                    : 'border-green-300/30 bg-green-500/12 text-green-100'
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
