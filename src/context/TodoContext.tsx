import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface TodoContextType {
    todos: Todo[];
    addTodo: (title: string) => Promise<void>;
    updateTodo: (id: number, title: string) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
console.log('API_URL', API_URL);
export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);



    const fetchTodos = async () => {
        try {
            const res = await axios.get(`${API_URL}/todos `);
            console.log('All todos', res.data);
            setTodos(res.data); // Adjust based on your actual API shape
        } catch (error) {
            toast.error("Failed to load todos");
        }
    };

    console.log('import.meta.env.BASE_URL', import.meta.env.BASE_URL);
    const addTodo = async (title: string) => {
        console.log('add todo title...', title);
        try {
            const res = await axios.post(`${API_URL}/todos/create`, { title: title });
            console.log('add todo res...', res.data);
            setTodos((prev) => [...prev, res.data]);
            toast.success("Todo added successfully!");
        } catch (err) {
            toast.error("Failed to add todo");
        }
    };

    const updateTodo = async (id: number, title: string) => {
        try {
            const res = await axios.put(`${API_URL}/todos/${id}`, { title: title });
            console.log('updated title', title)
            setTodos((prev) =>
                prev.map((todo) => (todo.id === id ? res.data.todo : todo))
            );
            toast.success("Todo updated!");
        } catch (err) {
            toast.error("Update failed");
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/todos/${id}`);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
            toast.success("Todo deleted!");
        } catch (err) {
            toast.error("Delete failed");
        }
    };
    useEffect(() => {
        fetchTodos();
    }, []);
    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context) throw new Error("useTodos must be used within TodoProvider");
    return context;
};
