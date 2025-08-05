'use client';

import { useSelector } from 'react-redux';
import { SocketProvider } from '@/context/socketContext';

export default function AppProviders({ children }) {
  const { provider } = useSelector((state) => state.auth);
  const token = provider?.accessToken;

  return (
    <SocketProvider token={token}>
      {children}
    </SocketProvider>
  );
}
