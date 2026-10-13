'use client';
import { useEffect } from 'react';

/** Enregistre le service worker (en production seulement, pour ne pas gêner le rechargement en dev). */
export function RegisterServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {});
  }, []);
  return null;
}
