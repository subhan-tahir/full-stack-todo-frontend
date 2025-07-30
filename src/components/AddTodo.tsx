import axios from "axios";
import { useState } from "react";


const AddTodo = ({ onAddTodo }: { onAddTodo: (todo: any) => void }) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event: React.FormEvent) => {
        console.log(import.meta.env.BASE_URL);
        event.preventDefault();
        if (!value) return setError("Please enter a todo");
        console.log("Todo added", value);
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:4000/todos/create`, { title: value });
            onAddTodo(res.data);

        }
        catch (error: any) {
            console.log(error, "error");
        }
        finally {
            setLoading(false);
        }
        setValue("");
        setError("");
    };
    return (
        <form className="w-full mt-6" onSubmit={handleSubmit}>
            <div className={`flex items-center border-b-2 border-purple-700 py-2 focus-within:border-purple-500 transition duration-300 ease-in-out ${error && "border-red-500"}`}>
                <input
                    name="todo"
                    autoComplete="off"

                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    placeholder="Add a new todo"
                    className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                />

                <button
                    type="submit"
                    className={`flex-shrink-0 bg-primary-color hover:bg-primary-color-hover transition duration-300 ease-in-out cursor-pointer text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ${loading ? "disabled:opacity-50 cursor-not-allowed" : ""} `}
                >
                    {loading ? "Adding..." : "Add"}
                </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </form>
    )
}

export default AddTodo
