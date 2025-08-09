import { useEffect } from 'react';
import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';
import Skeleton from 'react-loading-skeleton';

const TodoList = () => {
  const { todos, loading } = useTodos();
  useEffect(() => {
    console.log(todos);
  }, [todos]);
  return (
    <div className='flex flex-col gap-2 my-5 w-full max-h-[300px] overflow-y-auto py-4 px-3'>

      {loading ? (
        // Show 4 skeleton items
        Array(4).fill(0).map((_, i) => (
          <div key={i} className="p-3 bg-[#838181] rounded-lg">
            <Skeleton
              height={20}
              width={`80%`}
              baseColor="#2e2e2e"
              highlightColor="#444"
            />
          </div>
        ))
      ) : todos.length > 0 ? (
        todos.map((todo: any) => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      ) : (
        <p className='text-center text-white text-xl'>No todos yet</p>
      )}

    </div>
  );

};

export default TodoList;
