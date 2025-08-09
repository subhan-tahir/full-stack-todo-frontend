import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { motion } from "framer-motion"; // Correct import
import { useEffect, useState } from "react";
import UpdateModal from "./UpdateModal";
import { useTodos } from "../context/TodoContext";
import DeleteModal from "./DeleteModal";

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
    const [showModal, setShowModal] = useState<string | null>(null);
    const { deleteTodo, updateTodo, loading } = useTodos()
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
                        onClick={() => setShowModal('delete')}
                        className="bg-red-300 text-red-600 cursor-pointer hover:text-red-500 p-1 rounded-full"
                    >
                        <MdDeleteOutline className="text-lg" />
                    </button>
                    <button
                        onClick={() => setShowModal('update')}
                        className="bg-purple-400 text-purple-800 cursor-pointer hover:text-purple-500 p-1 rounded-full"
                    >
                        <TbEdit className="text-lg" />
                    </button>
                </div>
            </motion.div>

            {showModal === 'update' && (
                <UpdateModal
                    onClose={() => setShowModal(null)}
                    onUpdate={(newTitle) => updateTodo(todo.id, newTitle)}
                    initialTitle={todo.title}
                    loading={loading}
                />
            )}

            {/*Delete Modal */}
            {
                showModal === 'delete' && (
                    <DeleteModal onClose={() => setShowModal(null)} onDelete={() => deleteTodo(todo.id)}
                        loading={loading}
                    />
                )
            }
        </>
    );
};

export default TodoItem;
