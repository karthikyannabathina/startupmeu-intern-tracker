import { useState } from 'react';
import Header from './components/Header.jsx';
import StatsCards from './components/StatsCards.jsx';
import ApplicationFilters from './components/ApplicationFilters.jsx';
import ApplicationList from './components/ApplicationList.jsx';
import './App.css';

function App() {
  // Filter state — lifted here so Header, Filters, and List share one source of truth
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // stats and applications will be populated from the API in the next phase
  const stats = null;
  const applications = [];

  const handleAddClick = () => {
    // Add Application modal/form wired in a later phase
  };

  return (
    <div className="layout">
      <Header onAddClick={handleAddClick} />

      <main className="main">
        <StatsCards stats={stats} />

        <div className="applications-panel">
          <ApplicationFilters
            search={search}
            status={statusFilter}
            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
          />
          <ApplicationList applications={applications} />
        </div>
      </main>
    </div>
  );
}

export default App;
