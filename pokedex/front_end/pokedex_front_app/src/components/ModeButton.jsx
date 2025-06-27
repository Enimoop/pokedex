import React from 'react';

export default function ModeButton({ mode, setMode }) {
  return (
    <select
      value={mode}
      onChange={(e) => setMode(e.target.value)}
      className="modebutton-select"
    >
      <option value="select">Select</option>
      <option value="update">Update</option>
      <option value="add">Add</option>
      <option value="delete">Delete</option>
    </select>
  );
}
