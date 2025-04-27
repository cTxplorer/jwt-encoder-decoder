import React from 'react';
import HeaderEditor from './HeaderEditor';
import PayloadEditor from './PayloadEditor';
import SecretInput from './SecretInput';

export default function DecodedJWTCard({
  algorithm,
  headerInput,
  onHeaderChange,
  onHeaderBlur,
  headerRef,
  payloadInput,
  onPayloadChange,
  onPayloadBlur,
  payloadRef,
  secret,
  onSecretChange,
  minHeight,
  algoSelectDisabled
}) {
  return (
    <div style={{ flex: 1, minWidth: 340, background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px #0001', padding: 28, marginBottom: 32, minHeight, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
      <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, fontFamily: 'inherit' }}>Decoded</h2>
      <div style={{ marginBottom: 20 }}>
        <label htmlFor="algo-select" style={{ fontWeight: 600, fontSize: 15, fontFamily: 'inherit' }}>Algorithm:</label>
        <select id="algo-select" value={algorithm} disabled={algoSelectDisabled} style={{ marginLeft: 8, fontSize: 15, padding: '2px 8px', borderRadius: 4, border: '1px solid #e0e0e0', background: '#f8f8f8', fontFamily: 'inherit' }}>
          <option value="HS256">HS256</option>
        </select>
      </div>
      <HeaderEditor value={headerInput} onChange={onHeaderChange} onBlur={onHeaderBlur} textareaRef={headerRef} />
      <PayloadEditor value={payloadInput} onChange={onPayloadChange} onBlur={onPayloadBlur} textareaRef={payloadRef} />
      <SecretInput value={secret} onChange={onSecretChange} />
    </div>
  );
} 