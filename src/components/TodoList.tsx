import { useEffect } from 'react';
import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';
// interface TotoListProps {
//     onDeleteTodo: (id: number) => void
//     todos: any
//     onUpdateTodo: (updatedTodo: any) => void
// }
const TodoList = () => {
  const { todos } = useTodos();
  useEffect(() => {
    console.log(todos);
  }, [todos]);
  return (
    <div className='flex flex-col gap-2 my-5 w-full max-h-[300px] overflow-y-auto py-4 px-3'>
      {todos.map((todo: any) => (
        <TodoItem key={todo?.id} todo={todo} />
      ))}

      {
        todos.length === 0 && <p className='text-center text-white text-xl'>No todos yet</p>
      }
    </div>
  );
};

export default TodoList;
