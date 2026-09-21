
import { useState } from 'react'

function App() {


  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <h1>Hello, Vite + React!</h1>
      <p>Count is {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
    </>
  )
}

export default App
