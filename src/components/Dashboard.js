import Link from 'next/link'
const Dashboard = () => (
  <nav className="bg-gray-800 p-4">
    <ul className="flex space-x-4">
      <li><Link href="/"><a className="text-white">Home</a></Link></li>
      <li><Link href="/about"><a className="text-white">About</a></Link></li>
      <li><Link href="/feedback"><a className="text-white">Feedback</a></Link></li>
      <li><Link href="/pantry"><a className="text-white">Pantry</a></Link></li>
      <li><Link href="/login"><a className="text-white">Login</a></Link></li>
      <li><Link href="/signup"><a className="text-white">Signup</a></Link></li>
    </ul>
  </nav>
)
export default Dashboard
