import { useState } from 'react'
import './App.css'
import Signup from './Signup'
import Appbar from './Appbar'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Homepage from './Homepage'
import Signin from './Signin'
import Courses from './Courses'
import AddCourse from './AddCourse'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Signin/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/addcourse' element={<AddCourse/>}/>
      </Routes>
</Router>

    </>
  )
}

export default App
