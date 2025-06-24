import React from 'react';
import './pc.css';

export default function Pc({ rows, cols }) {
  const totalCells = rows * cols;

  return (
    <div className="pc-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {[...Array(totalCells)].map((_, i) => (
        <div key={i} className="pc-cell" />
      ))}
    </div>
  );
}
