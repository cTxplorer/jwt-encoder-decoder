import React from 'react';
import SignatureStatus from './SignatureStatus';

export default function EncodedJWTCard({ value, onChange, signatureValid, minHeight, textareaRef }) {
  return (
    <div style={{ flex: 1, minWidth: 340, background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px #0001', padding: 28, marginBottom: 32, minHeight, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
      <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, fontFamily: 'inherit' }}>Encoded</h2>
      <textarea
        ref={textareaRef}
        aria-label="Encoded JWT"
        value={value}
        data-gramm="false"
        onChange={onChange}
        style={{ width: '100%', fontFamily: 'Fira Mono, Roboto Mono, Source Code Pro, Menlo, monospace', fontSize: 15, background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, marginBottom: 8, padding: 14, resize: 'none', boxSizing: 'border-box', overflow: 'hidden', color: '#e91e63', outline: 'none', transition: 'border 0.2s', minHeight: 220, lineHeight: 1.5 }}
        placeholder="Paste a token here"
      />
      <div style={{ marginBottom: 16 }}>
        <SignatureStatus signatureValid={signatureValid} />
      </div>
    </div>
  );
} 