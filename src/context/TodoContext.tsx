import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;

}

interface TodoContextType {
    loading: boolean;
    todos: Todo[];
    addTodo: (title: string) => Promise<void>;
    updateTodo: (id: number, title: string, completed: boolean) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);
const API_URL = import.meta.env.VITE_API_LIVE_URL;
console.log('API_URL', API_URL);
export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);


    const fetchTodos = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/todos `);
            console.log('All todos', res.data);
            setTodos(res.data); // Adjust based on your actual API shape
        } catch (error) {
            toast.error("Failed to load todos");
        }
        finally {
            setLoading(false);
        }
    };


    const addTodo = async (title: string) => {
        console.log('add todo title...', title);
        try {
            setLoading(true);
            const res = await axios.post(`${API_URL}/todos/create`, { title: title });
            console.log('add todo res...', res.data);
            setTodos((prev) => [...prev, res.data]);
            toast.success("Todo added successfully!");
        } catch (err) {
            toast.error("Failed to add todo");
        }
        finally {
            setLoading(false);
        }
    };

    const updateTodo = async (id: number, title: string, completed: boolean) => {
        try {
            setLoading(true);
            const res = await axios.put(`${API_URL}/todos/${id}`, { title: title, completed: completed });
            console.log('updated title', title)
            setTodos((prev) =>
                prev.map((todo) => (todo.id === id ? res.data.todo : todo))
            );
            toast.success("Todo updated!");
        } catch (err) {
            toast.error("Update failed");
        }
        finally {
            setLoading(false);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            setLoading(true);
            await axios.delete(`${API_URL}/todos/${id}`);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
            toast.success("Todo deleted!");
        } catch (err) {
            toast.error("Delete failed");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTodos();
    }, []);
    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, loading }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context) throw new Error("useTodos must be used within TodoProvider");
    return context;
};
