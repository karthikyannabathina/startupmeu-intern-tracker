import { useState, useCallback, useEffect } from "react";

import {
  createApplication,
  updateApplication,
} from "../services/applicationService.js";

export function useApplicationForm(refreshData) {
  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // Close form and reset its state
  const closeForm = useCallback(() => {
    if (isSubmitting) return;

    setShowForm(false);
    setEditingApplication(null);
    setFormError(null);
  }, [isSubmitting]);

  // Open form for a new application
  const handleAddClick = useCallback(() => {
    setFormError(null);
    setEditingApplication(null);
    setShowForm(true);
  }, []);

  // Open form to edit an existing application
  const handleEdit = useCallback((application) => {
    setFormError(null);
    setEditingApplication(application);
    setShowForm(true);
  }, []);

  // Submit new or updated application
  const handleSubmit = useCallback(
    async (payload) => {
      setIsSubmitting(true);
      setFormError(null);

      try {
        if (editingApplication) {
          await updateApplication(editingApplication._id, payload);
        } else {
          await createApplication(payload);
        }

        setShowForm(false);
        setEditingApplication(null);

        await refreshData();
      } catch (err) {
        setFormError(err.message || "Something went wrong.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [editingApplication, refreshData],
  );

  // Escape closes the form unless submission is in progress
  useEffect(() => {
    if (!showForm || isSubmitting) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeForm();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showForm, isSubmitting, closeForm]);

  return {
    showForm,
    editingApplication,
    isSubmitting,
    formError,
    handleAddClick,
    handleEdit,
    handleSubmit,
    closeForm,
  };
}
