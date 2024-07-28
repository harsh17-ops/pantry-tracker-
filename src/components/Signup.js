import { useState } from 'react'
import { auth } from '../utils/firebase'
import { useRouter } from 'next/router'
const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()
  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      router.push('/pantry')
    } catch (error) {
      console.error('Error signing up:', error)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-6">Signup</h1>
      <form onSubmit={handleSignup} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Signup</button>
      </form>
    </div>
  )
}
export default Signup
