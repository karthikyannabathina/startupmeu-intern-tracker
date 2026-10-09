
import { useState, useEffect, useCallback } from 'react';

import {
  getApplications,
  getStats,
  deleteApplication,
} from '../services/applicationService.js';

export function useApplications() {
  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Data
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);

  // Loading and errors
  const [loadingApps, setLoadingApps] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState(null);

  // Delete state
  const [deletingId, setDeletingId] = useState(null);

  // Fetch dashboard statistics
  const fetchStats = useCallback(async () => {
    setLoadingStats(true);

    try {
      const data = await getStats();

      setStats({
        total: data.total,
        applied: data.byStatus?.Applied ?? 0,
        interview: data.byStatus?.Interview ?? 0,
        offer: data.byStatus?.Offer ?? 0,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  // Fetch applications using the current filters
  const fetchApplications = useCallback(
    async (query, status) => {
      setLoadingApps(true);
      setError(null);

      try {
        const data = await getApplications(query, status);
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingApps(false);
      }
    },
    []
  );

  // Refresh both applications and statistics
  const refreshData = useCallback(() => {
    return Promise.all([
      fetchApplications(search, statusFilter),
      fetchStats(),
    ]);
  }, [
    fetchApplications,
    fetchStats,
    search,
    statusFilter,
  ]);

  // Load statistics on mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Load applications when filters change
  useEffect(() => {
    fetchApplications(search, statusFilter);
  }, [search, statusFilter, fetchApplications]);

  // Delete an application
  const handleDelete = useCallback(
    async (id) => {
      setDeletingId(id);
      setError(null);

      try {
        await deleteApplication(id);
        await refreshData();
      } catch (err) {
        setError(err.message);
      } finally {
        setDeletingId(null);
      }
    },
    [refreshData]
  );

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    applications,
    stats,

    loadingApps,
    loadingStats,
    error,

    deletingId,
    handleDelete,
    refreshData,
  };
}