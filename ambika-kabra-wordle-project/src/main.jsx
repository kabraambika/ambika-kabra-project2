import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Instructions from './components/gameinfo/Instructions'
import Homepage from './components/homepage/Homepage'
import NavigationBar from './components/navbar/NavigationBar'
import { AppProvider } from './context/GameState'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
          <NavigationBar/>
          <Routes>
              <Route exact path="/" element={ <Homepage />} />
              <Route path="/instructions" element={ <Instructions />} />
              <Route path="/game/:difficulty" element={ <App />} />
          </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
)