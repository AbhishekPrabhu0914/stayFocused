import { useState } from "react";
import axios from "axios";
import TaskInput from "./TaskInput.jsx";
import Timer from "./Timer";
import Stats from "./Stats";

export default function App() {
    const [tasks, setTasks] = useState([]);

    const handleTaskComplete = async (taskData) => {
        const response = await axios.post("http://localhost:5000/stop_timer", taskData);
        setTasks(response.data.tasks);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Task Timer</h1>
            <TaskInput />
            <Timer onComplete={handleTaskComplete} />
            <Stats tasks={tasks} />
        </div>
    );
}
