import { useState } from 'react';

const STATUSES = [
  'Wishlist',
  'Applied',
  'Assessment',
  'Interview',
  'Offer',
  'Rejected',
  'Withdrawn',
];

const EMPTY_FORM = {
  company:     '',
  role:        '',
  status:      'Wishlist',
  appliedDate: '',
  deadline:    '',
  jobUrl:      '',
  location:    '',
  salary:      '',
  notes:       '',
};

// Very simple URL check — protocol optional, must have a dot in the host
const URL_RE = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i;

/**
 * MongoDB stores dates as ISO strings ("2024-03-15T00:00:00.000Z").
 * <input type="date"> requires "YYYY-MM-DD".
 * Returns an empty string for null/undefined values.
 */
function toDateInputValue(iso) {
  if (!iso) return '';
  return iso.slice(0, 10); // "YYYY-MM-DD" is always the first 10 chars
}

/**
 * Build the initial field state from an existing application document.
 * Falls back to EMPTY_FORM values for any field that is missing/null.
 */
function buildInitialFields(data) {
  if (!data) return EMPTY_FORM;
  return {
    company:     data.company     ?? '',
    role:        data.role        ?? '',
    status:      data.status      ?? 'Wishlist',
    appliedDate: toDateInputValue(data.appliedDate),
    deadline:    toDateInputValue(data.deadline),
    jobUrl:      data.jobUrl      ?? '',
    location:    data.location    ?? '',
    salary:      data.salary != null ? String(data.salary) : '',
    notes:       data.notes       ?? '',
  };
}

function validate(fields) {
  const errors = {};
  if (!fields.company.trim())  errors.company = 'Company is required.';
  if (!fields.role.trim())     errors.role    = 'Role is required.';
  if (fields.jobUrl && !URL_RE.test(fields.jobUrl.trim())) {
    errors.jobUrl = 'Please enter a valid URL.';
  }
  if (fields.salary !== '' && (isNaN(Number(fields.salary)) || Number(fields.salary) < 0)) {
    errors.salary = 'Salary must be a non-negative number.';
  }
  return errors;
}

/**
 * ApplicationForm — shared between Add and Edit modes.
 *
 * Props:
 *   initialData  {Object|null}  — existing application document (edit) or null (add)
 *   onSubmit     {Function}     — called with the cleaned payload object
 *   onCancel     {Function}     — called when the user dismisses the form
 *   isSubmitting {boolean}      — disables inputs and shows loading text on submit button
 *   apiError     {string|null}  — API-level error message to display inside the form
 */
function ApplicationForm({ initialData = null, onSubmit, onCancel, isSubmitting, apiError }) {
  const isEditing = initialData !== null;

  const [fields, setFields] = useState(() => buildInitialFields(initialData));
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear the field error as the user corrects it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Build the payload — omit empty optional fields so the backend
    // applies its own defaults rather than receiving empty strings
    const payload = { ...fields };
    if (!payload.appliedDate) delete payload.appliedDate;
    if (!payload.deadline)    delete payload.deadline;
    if (!payload.jobUrl)      delete payload.jobUrl;
    if (!payload.location)    delete payload.location;
    if (payload.salary === '') delete payload.salary;
    else payload.salary = Number(payload.salary);
    if (!payload.notes)       delete payload.notes;

    onSubmit(payload);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="form-title">
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title" id="form-title">
            {isEditing ? 'Edit Application' : 'Add Application'}
          </h2>
          <button
            className="modal__close"
            onClick={onCancel}
            aria-label="Close form"
            disabled={isSubmitting}
          >
            &times;
          </button>
        </div>

        <form className="app-form" onSubmit={handleSubmit} noValidate>
          {apiError && (
            <p className="app-form__api-error" role="alert">{apiError}</p>
          )}

          {/* ── Row 1: Company + Role ── */}
          <div className="app-form__row">
            <div className="app-form__field">
              <label className="app-form__label" htmlFor="company">
                Company <span className="app-form__required">*</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className={`app-form__input${errors.company ? ' app-form__input--error' : ''}`}
                value={fields.company}
                onChange={handleChange}
                placeholder="e.g. Google"
                disabled={isSubmitting}
              />
              {errors.company && <p className="app-form__error">{errors.company}</p>}
            </div>

            <div className="app-form__field">
              <label className="app-form__label" htmlFor="role">
                Role <span className="app-form__required">*</span>
              </label>
              <input
                id="role"
                name="role"
                type="text"
                className={`app-form__input${errors.role ? ' app-form__input--error' : ''}`}
                value={fields.role}
                onChange={handleChange}
                placeholder="e.g. Software Engineer Intern"
                disabled={isSubmitting}
              />
              {errors.role && <p className="app-form__error">{errors.role}</p>}
            </div>
          </div>

          {/* ── Row 2: Status + Location ── */}
          <div className="app-form__row">
            <div className="app-form__field">
              <label className="app-form__label" htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                className="app-form__input app-form__select"
                value={fields.status}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="app-form__field">
              <label className="app-form__label" htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                className="app-form__input"
                value={fields.location}
                onChange={handleChange}
                placeholder="e.g. Remote, New York"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* ── Row 3: Applied Date + Deadline ── */}
          <div className="app-form__row">
            <div className="app-form__field">
              <label className="app-form__label" htmlFor="appliedDate">Applied Date</label>
              <input
                id="appliedDate"
                name="appliedDate"
                type="date"
                className="app-form__input"
                value={fields.appliedDate}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="app-form__field">
              <label className="app-form__label" htmlFor="deadline">Deadline</label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                className="app-form__input"
                value={fields.deadline}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* ── Row 4: Job URL + Salary ── */}
          <div className="app-form__row">
            <div className="app-form__field">
              <label className="app-form__label" htmlFor="jobUrl">Job URL</label>
              <input
                id="jobUrl"
                name="jobUrl"
                type="url"
                className={`app-form__input${errors.jobUrl ? ' app-form__input--error' : ''}`}
                value={fields.jobUrl}
                onChange={handleChange}
                placeholder="https://jobs.example.com/..."
                disabled={isSubmitting}
              />
              {errors.jobUrl && <p className="app-form__error">{errors.jobUrl}</p>}
            </div>

            <div className="app-form__field">
              <label className="app-form__label" htmlFor="salary">Salary / Stipend</label>
              <input
                id="salary"
                name="salary"
                type="number"
                min="0"
                className={`app-form__input${errors.salary ? ' app-form__input--error' : ''}`}
                value={fields.salary}
                onChange={handleChange}
                placeholder="e.g. 75000"
                disabled={isSubmitting}
              />
              {errors.salary && <p className="app-form__error">{errors.salary}</p>}
            </div>
          </div>

          {/* ── Notes (full width) ── */}
          <div className="app-form__field">
            <label className="app-form__label" htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              className="app-form__input app-form__textarea"
              value={fields.notes}
              onChange={handleChange}
              placeholder="Referral contact, interview format, etc."
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          {/* ── Actions ── */}
          <div className="app-form__actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? (isEditing ? 'Updating…' : 'Saving…')
                : (isEditing ? 'Update Application' : 'Save Application')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;
