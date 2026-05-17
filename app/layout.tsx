import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Sora } from 'next/font/google';

import { ThemeProvider } from '../components/theme-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Pranshu Dwivedi | Backend Developer',
  description:
    'Modern futuristic portfolio for Pranshu Dwivedi, a backend developer specializing in Java, Spring Boot, Docker, MySQL, and scalable systems.',
  keywords: ['Pranshu Dwivedi', 'Backend Developer', 'Java', 'Spring Boot', 'DSA', 'Portfolio'],
  authors: [{ name: 'Pranshu Dwivedi' }],
  openGraph: {
    title: 'Pranshu Dwivedi | Backend Developer',
    description: 'Backend developer portfolio with sleek glassmorphism design and smooth motion.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranshu Dwivedi | Backend Developer',
    description: 'Backend developer portfolio with sleek glassmorphism design and smooth motion.'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} ${mono.variable} bg-background text-foreground antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
