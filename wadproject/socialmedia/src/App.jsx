
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import HomePage from './scenes/homePage/HomePage'
import LoginPage from './scenes/loginPage/LoginPage'
import ProfilePage from './scenes/profilePage/ProfilePage'
import { useMemo } from 'react'
import {useSelector} from 'react-redux'
import {CssBaseline,ThemeProvider} from "@mui/material"
import {createTheme}  from "@mui/material/styles"
import { themeSettings } from './theme'
import Message from './scenes/message/Message'
import SeperatePageMessage from './scenes/message/SeperatePageMessage'
function App() {
  
const mode =useSelector((state)=>state.mode)
const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])
  return (
    <>

    <BrowserRouter>
    <ThemeProvider  theme={theme}>
      <CssBaseline/>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/profile/:userId" element={<ProfilePage/>} />
      <Route path="/messages" element={<Message/>} />
      <Route path="/messages/:fid" element={<SeperatePageMessage/>} />
    </Routes>

    </ThemeProvider>
    
    </BrowserRouter>
      
    </>
  )
}

export default App
