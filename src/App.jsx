import './App.css'
import AddComponent from './components/AddComponent'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
        <Routes>
          <Route path='/' element={<EmployeeComponent />} />
          <Route path='/employees' element={<EmployeeComponent />} />
          <Route path='/add-employee' element={<AddComponent />} />
          <Route path='/edit-employee/:id' element={<AddComponent />} />
        </Routes>
      <FooterComponent />
    </BrowserRouter>
    </>
  )
}

export default App
