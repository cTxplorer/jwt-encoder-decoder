import React from 'react';

export default function PayloadEditor({ value, onChange, onBlur, textareaRef }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label htmlFor="payload-editor" style={{ fontWeight: 600, fontSize: 15, fontFamily: 'inherit' }}>Payload:</label>
      <textarea
        ref={textareaRef}
        id="payload-editor"
        aria-label="JWT Payload"
        data-gramm="false"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{ width: '100%', fontFamily: 'Fira Mono, Roboto Mono, Source Code Pro, Menlo, monospace', fontSize: 15, background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, marginBottom: 8, padding: 14, resize: 'none', boxSizing: 'border-box', overflow: 'hidden', color: '#9c27b0', outline: 'none', transition: 'border 0.2s', minHeight: 80, lineHeight: 1.5 }}
      />
    </div>
  );
} 