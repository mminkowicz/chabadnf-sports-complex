import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import { CAMPAIGN_DEFAULTS, formatCurrency, readCampaignData, updateCampaignTotal } from '../lib/campaignApi';

const parseAmount = (value) => {
  const number = Number(String(value).replace(/[^0-9]/g, ''));
  return Number.isFinite(number) ? number : 0;
};

const UpdateTotal = () => {
  const [amount, setAmount] = useState(String(CAMPAIGN_DEFAULTS.raised));
  const [campaignData, setCampaignData] = useState(CAMPAIGN_DEFAULTS);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    readCampaignData().then((data) => {
      setCampaignData(data);
      setAmount(String(data.raised));
    });
  }, []);

  const numericAmount = useMemo(() => parseAmount(amount), [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('saving');
    setMessage('');

    try {
      const updatedData = await updateCampaignTotal(numericAmount);
      setCampaignData(updatedData);
      setAmount(String(updatedData.raised));
      setStatus('saved');
      setMessage(`Saved. The homepage running total is now ${formatCurrency(updatedData.raised)}.`);
    } catch (error) {
      setStatus('error');
      setMessage('Could not save the total. Please try again.');
    }
  };

  return (
    <main className="flex min-h-screen items-center bg-[#f6f7f3] px-4 py-10 text-secondary-950">
      <section className="mx-auto max-w-xl">
        <div className="form-frame p-6 pt-10 sm:p-8 sm:pt-12">
          <p className="eyebrow">Campaign Admin</p>
          <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Update Running Total
          </h1>

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
                  autoFocus
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
                  Save
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

          <div className="mt-6 flex flex-col gap-2 text-sm text-secondary-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Current saved total: {formatCurrency(campaignData.raised)}</span>
            <Link to="/" className="font-extrabold text-primary-700 hover:text-primary-800">
              Open homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UpdateTotal;
