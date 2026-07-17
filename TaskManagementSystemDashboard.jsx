import React, { useState, useMemo } from 'react';
import { CheckCircle2, Circle, Clock3, Github, ListChecks, Plus, X } from 'lucide-react';

const seedTasks = [
  { id: 'TMS-101', title: 'Fix JSON corruption on concurrent writes', priority: 'high', dueDate: '2026-07-18', status: 'in-progress' },
  { id: 'TMS-102', title: 'Write unit tests for validation.py', priority: 'medium', dueDate: '2026-07-21', status: 'pending' },
  { id: 'TMS-103', title: 'Add due-date based sorting', priority: 'medium', dueDate: '2026-07-22', status: 'pending' },
  { id: 'TMS-104', title: 'Refactor file_handler.py error handling', priority: 'high', dueDate: '2026-07-19', status: 'pending' },
  { id: 'TMS-105', title: 'Document CLI menu in README', priority: 'low', dueDate: '2026-07-25', status: 'completed' },
  { id: 'TMS-106', title: 'Add filter-by-status command', priority: 'medium', dueDate: '2026-07-20', status: 'completed' },
  { id: 'TMS-107', title: 'Review pull request from teammate', priority: 'low', dueDate: '2026-07-23', status: 'in-progress' },
];

const priorityMeta = {
  high: { label: 'High', text: '#8A3115', bg: '#F5DED1' },
  medium: { label: 'Medium', text: '#7A5206', bg: '#F3E3C2' },
  low: { label: 'Low', text: '#25553C', bg: '#D9EAE0' },
};

const statusMeta = {
  pending: { label: 'Pending', accent: '#8A8F87' },
  'in-progress': { label: 'In progress', accent: '#A8720F' },
  completed: { label: 'Completed', accent: '#1F6E5C' },
};

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function SimpleDashboard() {
  const [tasks, setTasks] = useState(seedTasks);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', priority: 'medium', dueDate: '' });

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
  }), [tasks]);

  const visible = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  function addTask(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    const id = 'TMS-' + Math.random().toString(16).slice(2, 6).toUpperCase();
    setTasks(prev => [
      { id, title: form.title.trim(), priority: form.priority, dueDate: form.dueDate, status: 'pending' },
      ...prev,
    ]);
    setForm({ title: '', priority: 'medium', dueDate: '' });
    setShowForm(false);
  }

  return (
    <div className="tms">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .tms {
          --ink: #1B1F1D;
          --ink-soft: #5E6961;
          --paper: #F5F6F3;
          --surface: #FFFFFF;
          --border: #E1E4DE;
          --accent: #1F6E5C;
          --accent-soft: #E5F0EB;
          font-family: 'IBM Plex Sans', sans-serif;
          color: var(--ink);
          background: var(--paper);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
          max-width: 760px;
          margin: 0 auto;
        }
        .tms * { box-sizing: border-box; }

        .tms-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 22px; }
        .tms-brand { display: flex; align-items: center; gap: 10px; }
        .tms-mark {
          font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 500;
          color: var(--accent); background: var(--accent-soft); padding: 4px 8px; border-radius: 6px;
        }
        .tms-title { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 600; }
        .tms-sub { font-size: 12.5px; color: var(--ink-soft); margin-top: 3px; }
        .tms-link {
          display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px;
          color: var(--ink-soft); text-decoration: none; border: 1px solid var(--border);
          padding: 7px 12px; border-radius: 8px; background: var(--surface);
        }
        .tms-link:hover { border-color: #C7CCC3; color: var(--ink); }
        .tms-add-btn { border: none; background: var(--ink); color: #fff; cursor: pointer; font-family: 'IBM Plex Sans', sans-serif; }
        .tms-add-btn:hover { background: #000; color: #fff; }

        .tms-form {
          display: flex; gap: 8px; flex-wrap: wrap; align-items: center;
          background: var(--surface); border: 1px solid var(--border); border-radius: 10px;
          padding: 12px; margin-bottom: 18px;
        }
        .tms-form input[type="text"] { flex: 1; min-width: 160px; }
        .tms-form input, .tms-form select {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; padding: 8px 10px;
          border: 1px solid var(--border); border-radius: 7px; background: var(--paper); color: var(--ink); outline: none;
        }

        .tms-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
        .tms-stat { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 13px 14px; }
        .tms-stat-label { font-size: 11.5px; color: var(--ink-soft); margin-bottom: 4px; }
        .tms-stat-value { font-family: 'Space Grotesk', sans-serif; font-size: 21px; font-weight: 600; }

        .tms-filters { display: flex; gap: 7px; margin-bottom: 14px; }
        .tms-pill {
          font-size: 12px; padding: 6px 12px; border-radius: 999px; border: 1px solid var(--border);
          background: var(--surface); cursor: pointer; color: var(--ink-soft);
        }
        .tms-pill.active { background: var(--ink); color: #fff; border-color: var(--ink); }

        .tms-list { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; margin-bottom: 20px; }
        .tms-row {
          display: flex; align-items: center; gap: 12px; padding: 11px 14px;
          border-bottom: 1px solid var(--border);
        }
        .tms-row:last-child { border-bottom: none; }
        .tms-row-status { flex: 0 0 auto; }
        .tms-row-title { flex: 1; font-size: 13.5px; font-weight: 500; }
        .tms-row-id { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: var(--ink-soft); margin-top: 2px; }
        .tms-row-due { display: flex; align-items: center; gap: 4px; font-size: 11.5px; color: var(--ink-soft); flex: 0 0 auto; }
        .tms-badge { font-size: 10.5px; font-weight: 500; padding: 2px 8px; border-radius: 999px; flex: 0 0 auto; }

        .tms-footer {
          display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;
          border-top: 1px solid var(--border); padding-top: 14px; font-size: 11.5px; color: var(--ink-soft);
        }

        @media (max-width: 560px) {
          .tms-stats { grid-template-columns: repeat(2, 1fr); }
          .tms-row-due { display: none; }
        }
      `}</style>

      <div className="tms-header">
        <div className="tms-brand">
          <span className="tms-mark">[ TMS ]</span>
          <div>
            <div className="tms-title">Task management system</div>
            <div className="tms-sub">Python CLI task manager · JSON storage · modular design</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <a className="tms-link" href="https://github.com/SrijhaM/Task_Management_System" target="_blank" rel="noreferrer">
            <Github size={13} /> Source
          </a>
          <button className="tms-link tms-add-btn" onClick={() => setShowForm(s => !s)}>
            {showForm ? <X size={13} /> : <Plus size={13} />} {showForm ? 'Cancel' : 'New task'}
          </button>
        </div>
      </div>

      {showForm && (
        <form className="tms-form" onSubmit={addTask}>
          <input
            type="text" placeholder="Task title"
            value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            autoFocus
          />
          <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date" value={form.dueDate}
            onChange={e => setForm({ ...form, dueDate: e.target.value })}
          />
          <button type="submit" className="tms-link tms-add-btn">
            <Plus size={13} /> Add
          </button>
        </form>
      )}

      <div className="tms-stats">
        <div className="tms-stat">
          <div className="tms-stat-label">Total tasks</div>
          <div className="tms-stat-value">{stats.total}</div>
        </div>
        <div className="tms-stat">
          <div className="tms-stat-label">Pending</div>
          <div className="tms-stat-value">{stats.pending}</div>
        </div>
        <div className="tms-stat">
          <div className="tms-stat-label">In progress</div>
          <div className="tms-stat-value">{stats.inProgress}</div>
        </div>
        <div className="tms-stat">
          <div className="tms-stat-label">Completed</div>
          <div className="tms-stat-value">{stats.completed}</div>
        </div>
      </div>

      <div className="tms-filters">
        {['all', 'pending', 'in-progress', 'completed'].map(f => (
          <button
            key={f}
            className={`tms-pill ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : statusMeta[f].label}
          </button>
        ))}
      </div>

      <div className="tms-list">
        {visible.map(t => (
          <div className="tms-row" key={t.id}>
            <div className="tms-row-status">
              {t.status === 'completed'
                ? <CheckCircle2 size={16} color={statusMeta.completed.accent} />
                : <Circle size={16} color={statusMeta[t.status].accent} />}
            </div>
            <div style={{ flex: 1 }}>
              <div className="tms-row-title">{t.title}</div>
              <div className="tms-row-id">{t.id}</div>
            </div>
            <span className="tms-badge" style={{ color: priorityMeta[t.priority].text, background: priorityMeta[t.priority].bg }}>
              {priorityMeta[t.priority].label}
            </span>
            <div className="tms-row-due"><Clock3 size={12} /> {formatDate(t.dueDate)}</div>
          </div>
        ))}
      </div>

      <div className="tms-footer">
        <span><ListChecks size={12} style={{ verticalAlign: '-2px', marginRight: '4px' }} />Python 3 · JSON · UUID · datetime</span>
        <span>Built by Srijha M</span>
      </div>
    </div>
  );
}
