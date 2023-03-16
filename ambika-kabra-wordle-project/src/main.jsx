import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Instructions from './components/gameinfo/Instructions'
import Homepage from './components/homepage/Homepage'
import NavigationBar from './components/navbar/NavigationBar'
import { AppProvider } from './context/GameState'
import './index.css'

const router = createBrowserRouter([
  {
    path: "",
    element: <><NavigationBar/><Homepage/></>
  },
  {
    path: "instructions",
    element: <><NavigationBar/><Instructions/></>
  },
  {
    path: "game/:difficulty",
    element: <><NavigationBar/><App /></>
  },
  {
    path: "*",
    element: <><NavigationBar/><Homepage/></>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router}/>
    </AppProvider>
  </React.StrictMode>,
)