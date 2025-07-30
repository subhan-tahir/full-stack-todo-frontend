import { motion } from "framer-motion";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface TodoItems {
    id: number;
    title: string;
}
const Todo = () => {
    const [todos, setTodos] = useState<TodoItems[]>([]);

    // Fetch todos on mount
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await axios.get("http://localhost:4000/todos");
                setTodos(res.data);
            } catch (error) {
                console.log("Error fetching todos:", error);
            }
        };
        fetchTodos();
    }, []);

    // Add todo to state without reload
    const handleAddTodo = (newTodo: any) => {
        setTodos((prev) => [...prev, newTodo]);
        toast.success("Todo added successfully!");
    };

    const handleDeleteTodo = (id: number) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        toast.success("Todo deleted successfully!");
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
            className="md:w-1/2 w-full bg-white/10 backdrop-sepia-0 backdrop-blur-2xl rounded-lg md:p-6 p-3 shadow-lg mx-auto"
        >
            <div className="flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-4 text-white">Todo App</h2>
                <AddTodo onAddTodo={handleAddTodo} />
                <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
            </div>
        </motion.div>
    );
};

export default Todo;
