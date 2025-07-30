
import './App.css'
import Todo from './components/Todo'
function App() {

  return (
    <>
      <div className='flex flex-col p-4 items-center justify-center min-h-screen bg-[url(./assets/todo-bg-1.jpg)] bg-cover bg-center w-full'>
        <Todo />
      </div>
    </>
  )
}

export default App
