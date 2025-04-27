import React from 'react';

export default function SecretInput({ value, onChange }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label htmlFor="secret-input" style={{ fontWeight: 600, fontSize: 15, fontFamily: 'inherit' }}>Secret:</label>
      <input
        id="secret-input"
        aria-label="Secret"
        type="text"
        value={value}
        onChange={onChange}
        style={{ width: '100%', fontFamily: 'Fira Mono, Roboto Mono, Source Code Pro, Menlo, monospace', fontSize: 15, background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, marginBottom: 8, padding: 14, resize: 'none', boxSizing: 'border-box', overflow: 'hidden', color: '#2196f3', outline: 'none', transition: 'border 0.2s', marginTop: 4 }}
      />
    </div>
  );
} 