import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'NoteDown',
  description: 'A simple notes-to-pdf web app.',
  manifest: '/manifest.json',
  applicationName: "NoteDown",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NoteDown",
  },
  formatDetection: {
    telephone: false,
  },
  icons: [
    { rel: 'shortcut icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/icons/icon-192x192.png' },
  ],
};

export const viewport: Viewport = {
  themeColor: "#e5f0ff",
  backgroundColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#e5f0ff" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
