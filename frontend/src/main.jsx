import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ThemeContextProvider} from "./context/themeContext.jsx"
import {UserContextProvider} from "./context/userContext.jsx"
import { TasksContextProvider } from './context/tasksContext.jsx'
import { DateContextProvider } from './context/dateContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <UserContextProvider>
        <ThemeContextProvider> 
          <TasksContextProvider>
            <DateContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </DateContextProvider>
          </TasksContextProvider>
        </ThemeContextProvider> 
    </UserContextProvider>
  </StrictMode>,
)
