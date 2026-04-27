import { useState } from 'react';
import LogList from './components/LogList';
import LogForm from './components/LogForm';
import './App.css';

function App() {
    const [editingLog, setEditingLog] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSaved = () => {
        setEditingLog(null);
        setRefreshKey(prev => prev + 1);
    };

    const handleEdit = (log) => {
        setEditingLog(log);
    };

    const handleCancel = () => {
        setEditingLog(null);
    };

    return (
        <div className="app">
            <h1>📋 Daily Activity Tracker</h1>
            <LogForm
                onSaved={handleSaved}
                editingLog={editingLog}
                onCancel={handleCancel}
            />
            <LogList
                refreshKey={refreshKey}
                onEdit={handleEdit}
            />
        </div>
    );
}

export default App;
