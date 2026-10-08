/**
 * applicationService.js
 *
 * All API calls for the /api/applications resource.
 * Uses relative URLs so Vite's dev proxy forwards them to the Express server,
 * and the same paths resolve correctly after a production build behind the
 * same origin.
 *
 * Every function throws an Error if the response envelope signals failure,
 * so callers only need to handle one error path.
 */

const BASE = '/api/applications';

/**
 * Fetch the list of applications.
 * Both params are optional — omitting them returns the full list.
 *
 * @param {string} search  - Partial match against company or role
 * @param {string} status  - Exact status value (e.g. "Applied")
 * @returns {Promise<Array>} Array of application documents
 */
export async function getApplications(search = '', status = '') {
  const params = new URLSearchParams();
  if (search.trim()) params.set('search', search.trim());
  if (status)        params.set('status', status);

  const query = params.toString();
  const url   = query ? `${BASE}?${query}` : BASE;

  const res  = await fetch(url);
  const body = await res.json();

  if (!body.success) {
    throw new Error(body.message || 'Failed to fetch applications');
  }

  return body.data;
}

/**
 * Fetch aggregate statistics.
 *
 * @returns {Promise<{ total: number, byStatus: Record<string, number> }>}
 */
export async function getStats() {
  const res  = await fetch(`${BASE}/stats`);
  const body = await res.json();

  if (!body.success) {
    throw new Error(body.message || 'Failed to fetch statistics');
  }

  return body.data;
}
