import './globals.css'
import { Inter } from 'next/font/google'
import 'regenerator-runtime/runtime'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Transit TEch',
  description: 'AI Tool for LA Metro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
