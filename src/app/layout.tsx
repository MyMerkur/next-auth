import './globals.css'
import { ReactNode } from 'react'
import ClientProvider from '@/components/ClientProvider'
import Navbar from '@/components/Navbar'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <Navbar />
          {children}
          </ClientProvider>
      </body>
    </html>
  )
}
