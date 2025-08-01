import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import { TodoProvider } from './context/TodoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoProvider>
      <App />
      <ToastContainer
        position="top-center"
        draggable={true}
        pauseOnHover={true}
        toastClassName="custom-toast"
        progressClassName={"toastify-progress-bar"}
      />
    </TodoProvider>
  </StrictMode>,
)
