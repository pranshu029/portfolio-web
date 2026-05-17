'use client';

import * as React from 'react';

// Dark-only site: Theme provider removed. Keep this wrapper in place for future use and consistency.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
