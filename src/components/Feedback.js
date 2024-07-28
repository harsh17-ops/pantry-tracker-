import { useState } from 'react'
const Feedback = () => {
  const [feedback, setFeedback] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    setFeedback('')
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-6">Feedback</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <textarea
          className="w-full px-4 py-2 border rounded mb-4"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Your feedback"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  )
}
export default Feedback
