import React from 'react';

export default function SignatureStatus({ signatureValid }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: 16,
      fontWeight: 700,
      fontSize: 15,
      background: signatureValid === true ? '#e0f7fa' : signatureValid === false ? '#ffebee' : '#ececec',
      color: signatureValid === true ? '#0097a7' : signatureValid === false ? '#c62828' : '#888',
      border: signatureValid === true ? '1px solid #00bcd4' : signatureValid === false ? '1px solid #e57373' : '1px solid #ccc',
      transition: 'all 0.2s',
    }}>
      {signatureValid === true && '✔ Signature Verified'}
      {signatureValid === false && '✖ Invalid Signature'}
      {signatureValid === null && 'Signature status will appear here'}
    </span>
  );
} 