// Admin Razorpay API helpers (calls your backend endpoint)
import { request } from './client';

export function buildEpochRange({ dateFrom, dateTo }) {
  const now = new Date();
  if (!dateFrom && !dateTo) {
    const toTs = Math.floor(now.getTime() / 1000);
    const fromTs = Math.floor((now.getTime() - 24 * 60 * 60 * 1000) / 1000);
    return { from: fromTs, to: toTs };
  }
  if (dateFrom && dateTo) {
    return {
      from: Math.floor(new Date(`${dateFrom}T00:00:00`).getTime() / 1000),
      to: Math.floor(new Date(`${dateTo}T23:59:59`).getTime() / 1000),
    };
  }
  if (dateFrom) {
    return {
      from: Math.floor(new Date(`${dateFrom}T00:00:00`).getTime() / 1000),
      to: Math.floor(now.getTime() / 1000),
    };
  }
  const d = new Date(`${dateTo}T23:59:59`);
  return {
    from: Math.floor((d.getTime() - 24 * 60 * 60 * 1000) / 1000),
    to: Math.floor(d.getTime() / 1000),
  };
}

export async function fetchAdminPayments({ dateFrom, dateTo, count = 50, skip = 0 }) {
  const { from, to } = buildEpochRange({ dateFrom, dateTo });
  const qs = new URLSearchParams();
  if (from) qs.set('from', String(from));
  if (to) qs.set('to', String(to));
  if (count) qs.set('count', String(count));
  if (typeof skip === 'number') qs.set('skip', String(skip));

  const path = `/api/admin/razorpay/payments?${qs.toString()}`;
  return request(path, { method: 'GET' });
}
