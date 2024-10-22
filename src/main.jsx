import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { FetchContextProvider } from './context/fetchContext.jsx'
import { BasketContextProvider } from './context/basketContext.jsx'
import { AuthContextProvider } from './context/authContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FetchContextProvider>
      <AuthContextProvider>
        <BasketContextProvider>
          <App />
        </BasketContextProvider>
      </AuthContextProvider>
      </FetchContextProvider>    
    </BrowserRouter>
  </StrictMode>,
)
