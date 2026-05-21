
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/context/auth-context';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'RALReviews',
  description: 'AI-Powered Restaurant Feedback Analysis',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <div className="flex-grow">
            {children}
          </div>
        </AuthProvider>
        <footer className="text-center text-sm text-muted-foreground py-4 flex flex-col items-center justify-center gap-2">
            <Image
                src="https://firebasestorage.googleapis.com/v0/b/ralfeedback.firebasestorage.app/o/img%2FRAL-logo-75%20(1).png?alt=media&token=a4c0cf51-d568-4780-bff2-e94fe8838025"
                alt="RAL Logo"
                width={102}
                height={102}
                className="h-6 w-auto animate-pulse-subtle"
            />
            <p>© Restaurant Associates Jamaica Ltd. 2025</p>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
