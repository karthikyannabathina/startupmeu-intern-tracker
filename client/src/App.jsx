
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import ApplicationForm from './components/ApplicationForm.jsx';

import { useApplications } from './hooks/useApplications.js';
import { useApplicationForm } from './hooks/useApplicationForm.js';

import './App.css';

function App() {
  const applicationsData = useApplications();

  const applicationForm = useApplicationForm(
    applicationsData.refreshData
  );

  return (
    <div className="layout">
      <Header onAddClick={applicationForm.handleAddClick} />

      <Dashboard
        {...applicationsData}
        handleEdit={applicationForm.handleEdit}
      />

      {applicationForm.showForm && (
        <ApplicationForm
          initialData={applicationForm.editingApplication}
          onSubmit={applicationForm.handleSubmit}
          onCancel={applicationForm.closeForm}
          isSubmitting={applicationForm.isSubmitting}
          apiError={applicationForm.formError}
        />
      )}
    </div>
  );
}

export default App;