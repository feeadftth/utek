import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Editor from './Editor'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Editor />} />
      </Routes>
    </Router>
  )
}

export default App
