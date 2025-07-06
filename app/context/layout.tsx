// If you need this file, here's a corrected version
// Otherwise, you can delete app/context/layout.tsx entirely

import { ReactNode } from 'react';

interface ContextLayoutProps {
  children: ReactNode;
}

export default function ContextLayout({ children }: ContextLayoutProps) {
  return (
    <div className="context-wrapper">
      {children}
    </div>
  );
}

// Remove the import for './readme.mdx' since it doesn't exist
// If you need to include documentation, create the file first