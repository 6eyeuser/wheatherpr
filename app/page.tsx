import { redirect } from 'next/navigation'

export default function Home() {
  // Automatically redirect from root to login
  redirect('/login')
}