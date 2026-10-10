import { useState, useEffect, useCallback, useRef } from "react";

import {
  getApplications,
  getStats,
  deleteApplication,
} from "../services/applicationService.js";

export function useApplications() {
  // Filters
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Data
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);

  // Loading and errors
  const [loadingApps, setLoadingApps] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState(null);

  // Delete state
  const [deletingId, setDeletingId] = useState(null);

  // Wait until the user stops typing before hitting the API
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

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

  const latestRequest = useRef(0);

  // Fetch applications using the current filters
  const fetchApplications = useCallback(async (query, status) => {
    // Only the most recent request may update state (guards against out-of-order responses)
    const requestId = ++latestRequest.current;
    setLoadingApps(true);
    setError(null);

    try {
      const data = await getApplications(query, status);
      if (requestId === latestRequest.current) setApplications(data);
    } catch (err) {
      if (requestId === latestRequest.current) setError(err.message);
    } finally {
      if (requestId === latestRequest.current) setLoadingApps(false);
    }
  }, []);

  // Refresh both applications and statistics
  const refreshData = useCallback(() => {
    return Promise.all([
      fetchApplications(debouncedSearch, statusFilter),
      fetchStats(),
    ]);
  }, [fetchApplications, fetchStats, debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchApplications(debouncedSearch, statusFilter);
  }, [debouncedSearch, statusFilter, fetchApplications]);

  // Load statistics on mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

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
    [refreshData],
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
