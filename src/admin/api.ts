const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function authHeaders() {
  const token = localStorage.getItem('admin_token');
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export async function login(username: string, password: string) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${BASE}/api/stats`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}

export async function fetchEnquiries(page = 1, status?: string) {
  const params = new URLSearchParams({ page: String(page), limit: '15' });
  if (status) params.set('status', status);
  const res = await fetch(`${BASE}/api/enquiries?${params}`, { headers: authHeaders() });
  return res.json();
}

export async function updateEnquiryStatus(id: number, status: string) {
  const res = await fetch(`${BASE}/api/enquiries/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  return res.json();
}

export async function deleteEnquiry(id: number) {
  await fetch(`${BASE}/api/enquiries/${id}`, { method: 'DELETE', headers: authHeaders() });
}

export async function fetchSubscribers() {
  const res = await fetch(`${BASE}/api/subscribers`, { headers: authHeaders() });
  return res.json();
}

export async function deleteSubscriber(id: number) {
  await fetch(`${BASE}/api/subscribers/${id}`, { method: 'DELETE', headers: authHeaders() });
}

// Public
export async function submitEnquiry(data: object) {
  let res: Response;
  try {
    res = await fetch(`${BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error('Could not reach the server. Please email us directly at infoneurojnaai@gmail.com');
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Submission failed. Please try again.');
  }
  return res.json();
}

export async function subscribeNewsletter(email: string) {
  let res: Response;
  try {
    res = await fetch(`${BASE}/api/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
  } catch {
    throw new Error('Could not reach the server. Please try again later.');
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Subscription failed. Please try again.');
  }
  return res.json();
}
