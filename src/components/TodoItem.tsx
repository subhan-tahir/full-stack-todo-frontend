import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { motion } from "framer-motion"; // Correct import
import { useEffect, useState } from "react";
import UpdateModal from "./UpdateModal";
import { useTodos } from "../context/TodoContext";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
    useEffect(() => {
        console.log('todo', todo);
    }, [])
    const [showModal, setShowModal] = useState(false);
    const { deleteTodo, updateTodo } = useTodos()
    //   const handleDelete = async () => {
    //     try {
    //       await axios.delete(`http://localhost:3000/todos/${todo.id}`);
    //       onDeleteTodo(todo.id);
    //     } catch (error) {
    //       console.error("Delete failed", error);
    //     }
    //   };

    //   const handleUpdate = async (updatedTitle: string) => {
    //     try {
    //       const response = await axios.put(`http://localhost:3000/todos/${todo.id}`, {
    //         title: updatedTitle,
    //       });
    //       onUpdateTodo(response.data.todo);
    //       setShowModal(false);
    //     } catch (error) {
    //       console.error("Update failed", error);
    //     }
    //   };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="flex items-center justify-between bg-white/10 backdrop-blur-lg rounded-lg p-4 mb-4 shadow-md w-full"
            >
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={todo?.completed}
                        readOnly
                        className="mr-3 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-white">{todo?.title}</span>
                </div>
                <div className="flex space-x-4 items-center">
                    <button
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-red-300 text-red-600 cursor-pointer hover:text-red-500 p-1 rounded-full"
                    >
                        <MdDeleteOutline className="text-lg" />
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-purple-400 text-purple-800 cursor-pointer hover:text-purple-500 p-1 rounded-full"
                    >
                        <TbEdit className="text-lg" />
                    </button>
                </div>
            </motion.div>

            {showModal && (
                <UpdateModal
                    onClose={() => setShowModal(false)}
                    onUpdate={(newTitle) => updateTodo(todo.id, newTitle)}
                    initialTitle={todo.title}
                />
            )}
        </>
    );
};

export default TodoItem;
