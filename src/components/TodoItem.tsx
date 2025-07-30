import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { motion } from "motion/react"
import axios from "axios";
import { useRef } from "react";
interface TodoItemProps {
    todo: any;
    id: number;
    onDeleteTodo: (id: number) => void; // ✅ new prop
}

const TodoItem = ({ todo, id, onDeleteTodo }: TodoItemProps) => {
    const ref = useRef(null);

    const deleteTodoHandler = async () => {
        try {
            const response = await axios.delete(`http://localhost:4000/todos/${id}`);
            console.log(response.data);
            onDeleteTodo(id); // ✅ inform parent to update UI
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <motion.div
            ref={ref}
            key={id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0, scale: 1.02 }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
                stiffness: 100,
                delay: (id % 1000) * 0.001,
                damping: 20,
            }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between bg-white/10 backdrop-blur-lg rounded-lg p-4 mb-4 shadow-md w-full"
        >
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="mr-3 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span className="text-white">{todo.title}</span>
            </div>
            <div className="flex space-x-4 items-center">
                <MdDeleteOutline
                    onClick={deleteTodoHandler}
                    className="text-red-600 hover:text-red-500 transition duration-300 ease-in-out text-xl cursor-pointer"
                />
                <TbEdit className="text-purple-400 hover:text-purple-500 transition duration-300 ease-in-out text-xl cursor-pointer" />
            </div>
        </motion.div>
    );
};

export default TodoItem;
