import React from 'react';

export default function ProgressCard({ percent = 78 }) {
  return (
    <div className="progress-card">
      <div className="progress-ring">
        <svg viewBox="0 0 36 36">
          <path className="bg" d="M18 2a16 16 0 1 0 0 32a16 16 0 1 0 0-32" />
          <path className="progress" d="M18 2a16 16 0 1 0 0 32a16 16 0 1 0 0-32" strokeDasharray={`${percent},100`} />
        </svg>
        <div className="percent">{percent}%</div>
      </div>
      <div className="progress-label">Configured</div>
    </div>
  );
}
