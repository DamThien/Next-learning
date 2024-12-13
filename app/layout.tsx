// app/layout.tsx
import React from 'react';

export const metadata = {
  title: 'CRUD App',
  description: 'A simple CRUD app with Next.js 13 and TypeScript',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
