import React from 'react';

export default function ModeButton({ mode, setMode }) {
  return (
    <select
      value={mode}
      onChange={(e) => setMode(e.target.value)}
      style={{
        padding: '5px 10px',
        fontSize: '0.9rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        background: '#e8f5e9',
        color: 'black',
        cursor: 'pointer',
      }}
    >
      <option value="select">Select</option>
      <option value="update">Update</option>
      <option value="add">Add</option>
      <option value="delete">Delete</option>
    </select>
  );
}
