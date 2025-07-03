import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spacecraft Dashboard',
  description: 'A futurististic dashboard for spacecraft telemetry and control.',
  creator: 'Twilight Techy',
  icons: {
    icon: '/starship.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
