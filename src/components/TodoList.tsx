import TodoItem from './TodoItem';
interface TotoListProps {
    onDeleteTodo: (id: number) => void
    todos: any
}
const TodoList = ({ todos, onDeleteTodo }: TotoListProps) => {
  return (
    <div className='flex flex-col gap-2 my-5 w-full max-h-[300px] overflow-y-auto py-4 px-3'>
      {todos.map((todo: any) => (
        <TodoItem id={todo.id} todo={todo} key={todo.id} onDeleteTodo={onDeleteTodo}/>
      ))}
    </div>
  );
};

export default TodoList;
