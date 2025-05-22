// ShortenerContext.tsx
import React, { createContext, useContext } from 'react';
import useShortener from '../hooks/useShortener.ts';

// Define the context type (optional, for TypeScript)
type ShortenerContextType = ReturnType<typeof useShortener> | null;

// Create the context
const ShortenerContext = createContext<ShortenerContextType>(null);

// Create a Provider component
export function ShortenerProvider({ children }: { children: React.ReactNode }) {
  const shortener = useShortener();

  return (
    <ShortenerContext.Provider value={shortener}>{children}</ShortenerContext.Provider>
  );
}

// Custom hook to use the context easily
export function useShortenerContext() {
  const context = useContext(ShortenerContext);
  if (!context) {
    throw new Error('useShortenerContext must be used within a ShortenerProvider');
  }
  return context;
}
