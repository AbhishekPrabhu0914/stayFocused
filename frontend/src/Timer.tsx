import { useState } from "react";

interface TimerProps {
    onComplete: (data: { task: string; category: string; time: number }) => void;
}

export default function Timer({ onComplete }: TimerProps) {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    var timer: number | undefined;

    const startTimer = () => {
        setRunning(true);
        timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    };

    const stopTimer = () => {
        clearInterval(timer);
        setRunning(false);
        onComplete({ task: "Unnamed Task", category: "General", time });
        setTime(0);
    };

    return (
        <div className="mb-4 text-center">
            <p className="text-lg font-semibold">Time: {time}s</p>
            <button
                className={`p-2 rounded w-full ${running ? "bg-red-500" : "bg-green-500"} text-white`}
                onClick={running ? stopTimer : startTimer}
            >
                {running ? "Stop" : "Start"}
            </button>
        </div>
    );
}
