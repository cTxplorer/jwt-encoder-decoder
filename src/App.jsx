import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { SignJWT, jwtVerify } from 'jose';
import EncodedJWTCard from './components/EncodedJWTCard';
import DecodedJWTCard from './components/DecodedJWTCard';

import './global.css';

const defaultHeader = {
  alg: 'HS256',
  typ: 'JWT',
};
const defaultPayload = {
  sub: '1234567890',
  name: 'John Doe',
  iat: 1516239022,
};

function strToUint8Array(str) {
  return new TextEncoder().encode(str);
}

function useAutosizeTextArea(value) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  }, [value]);
  return ref;
}

export default function App() {
  const [algorithm] = useState('HS256');
  const [secret, setSecret] = useState('your-256-bit-secret');
  const [header, setHeader] = useState(defaultHeader);
  const [payload, setPayload] = useState(defaultPayload);
  const [encoded, setEncoded] = useState('');
  const [signatureValid, setSignatureValid] = useState(null);
  const [headerInput, setHeaderInput] = useState(JSON.stringify(defaultHeader, null, 2));
  const [payloadInput, setPayloadInput] = useState(JSON.stringify(defaultPayload, null, 2));
  const [encodedInput, setEncodedInput] = useState('');
  const [encodedChangedByUser, setEncodedChangedByUser] = useState(false);

  // Refs for auto-resizing textareas
  const encodedRef = useAutosizeTextArea(encodedInput);
  const headerRef = useAutosizeTextArea(headerInput);
  const payloadRef = useAutosizeTextArea(payloadInput);

  // Encode JWT when headerInput, payloadInput, or secret changes
  useEffect(() => {
    async function encodeJWT() {
      try {
        const parsedHeader = JSON.parse(headerInput);
        const parsedPayload = JSON.parse(payloadInput);
        setHeader(parsedHeader);
        setPayload(parsedPayload);
        const key = strToUint8Array(secret);
        let jwt = new SignJWT(parsedPayload)
          .setProtectedHeader(parsedHeader);
        const token = await jwt.sign(key);
        setEncoded(token);
        setEncodedInput(token);
        setEncodedChangedByUser(false);
        // Verify signature
        try {
          await jwtVerify(token, key, { algorithms: ['HS256'] });
          setSignatureValid(true);
        } catch {
          setSignatureValid(false);
        }
      } catch {
        setSignatureValid(null);
      }
    }
    if (!encodedChangedByUser) {
      encodeJWT();
    }
    // eslint-disable-next-line
  }, [headerInput, payloadInput, secret]);

  // Decode JWT when encodedInput changes by user
  useEffect(() => {
    async function decodeJWT() {
      if (!encodedChangedByUser) return;
      if (!encodedInput) return;
      try {
        const decodedHeader = jwtDecode(encodedInput, { header: true });
        const decodedPayload = jwtDecode(encodedInput);
        setHeader(decodedHeader);
        setPayload(decodedPayload);
        setHeaderInput(JSON.stringify(decodedHeader, null, 2));
        setPayloadInput(JSON.stringify(decodedPayload, null, 2));
        setEncoded(encodedInput);
        // Verify signature
        try {
          const key = strToUint8Array(secret);
          await jwtVerify(encodedInput, key, { algorithms: ['HS256'] });
          setSignatureValid(true);
        } catch {
          setSignatureValid(false);
        }
      } catch {
        setSignatureValid(false);
      }
    }
    decodeJWT();
    // eslint-disable-next-line
  }, [encodedInput]);

  // Re-verify signature when secret changes (without re-encoding JWT)
  useEffect(() => {
    async function verifySignature() {
      if (!encodedInput) {
        setSignatureValid(null);
        return;
      }
      try {
        const key = strToUint8Array(secret);
        await jwtVerify(encodedInput, key, { algorithms: ['HS256'] });
        setSignatureValid(true);
      } catch {
        setSignatureValid(false);
      }
    }
    verifySignature();
    // eslint-disable-next-line
  }, [secret]);

  const inputStyle = {
    width: '100%',
    fontFamily: 'Fira Mono, Roboto Mono, Source Code Pro, Menlo, monospace',
    fontSize: 15,
    background: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    marginBottom: 8,
    padding: 14,
    resize: 'none',
    boxSizing: 'border-box',
    overflow: 'hidden',
    color: '#222',
    outline: 'none',
    transition: 'border 0.2s',
  };

  // For card height sync: set minHeight of encoded textarea to match decoded card
  const encodedCardMinHeight = 420;

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: 0 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
        <h1 style={{ fontWeight: 800, fontSize: 36, letterSpacing: -1, color: '#222' }}>JWT Encoder & Decoder</h1>
        <div style={{marginBottom: 32}}>Safe & secure – runs in your browser. No data sent outside.</div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <EncodedJWTCard
            value={encodedInput}
            onChange={e => {
              setEncodedInput(e.target.value);
              setEncodedChangedByUser(true);
            }}
            signatureValid={signatureValid}
            minHeight={encodedCardMinHeight}
            textareaRef={encodedRef}
          />
          <DecodedJWTCard
            algorithm={algorithm}
            headerInput={headerInput}
            onHeaderChange={e => setHeaderInput(e.target.value)}
            onHeaderBlur={e => {
              try {
                setHeaderInput(JSON.stringify(JSON.parse(e.target.value), null, 2));
              } catch {}
            }}
            headerRef={headerRef}
            payloadInput={payloadInput}
            onPayloadChange={e => setPayloadInput(e.target.value)}
            onPayloadBlur={e => {
              try {
                setPayloadInput(JSON.stringify(JSON.parse(e.target.value), null, 2));
              } catch {}
            }}
            payloadRef={payloadRef}
            secret={secret}
            onSecretChange={e => setSecret(e.target.value)}
            minHeight={encodedCardMinHeight}
            algoSelectDisabled={true}
          />
        </div>
      </div>
      <footer style={{ textAlign: 'center', color: '#aaa', fontSize: 14, marginTop: 32, marginBottom: 8 }}>
        Vibe coded with <span style={{ color: '#e91e63' }}>♥</span> for safe JWT debugging
      </footer>
    </div>
  );
} 
