import { motion } from "framer-motion";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const Todo = () => {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
            className="md:w-1/2 w-full bg-white/10 backdrop-sepia-0 backdrop-blur-2xl rounded-lg md:p-6 p-3 shadow-lg mx-auto"
        >
            <div className="flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-4 text-white">Todo App</h2>
                <AddTodo />
                <TodoList />
            </div>
        </motion.div>
    );
};

export default Todo;
