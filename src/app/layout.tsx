import type { Metadata } from 'next'
import { Amplify } from 'aws-amplify';

//import awsconfig from '../aws-exports';

import { Dhurjati } from 'next/font/google'
import './globals.css'

//Amplify.configure(awsconfig);
const dhurjati = Dhurjati({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'Subkitz',
  description: 'bomb the beat',
}

export default  function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dhurjati.className}>{children}</body>
    </html>
  )
}

