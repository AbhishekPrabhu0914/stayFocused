import { useState } from "react";
import axios from "axios";

const categories = ["Coding", "Meeting", "Exercise", "Reading"];

export default function TaskInput() {
    const [task, setTask] = useState("");
    const [category, setCategory] = useState(categories[0]);

    const startTask = async () => {
        await axios.post("http://localhost:5000/start_timer", { task, category });
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Task Name"
                className="border p-2 w-full rounded"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <select className="border p-2 w-full mt-2" onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
            <button
                className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
                onClick={startTask}
            >
                Start Task
            </button>
        </div>
    );
}
