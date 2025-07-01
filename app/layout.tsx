import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Escaply - Plan your next trip in 10 minutes',
  description: 'You tell us your constraints. We will give you a plan.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-misty-cream min-h-screen`}>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#F8F6F2',
              color: '#2C3E50',
              border: '1px solid #48CAE4',
            },
          }}
        />
        {children}
      </body>
    </html>
  )
} 