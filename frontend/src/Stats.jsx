import { useEffect, useState } from "react";
import axios from "axios";

export default function Stats() {
    const [stats, setStats] = useState({});

    useEffect(() => {
        const fetchStats = async () => {
            const response = await axios.get("http://localhost:5000/stats");
            setStats(response.data);
        };
        fetchStats();
        const interval = setInterval(fetchStats, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Time Spent Per Category</h3>
            {Object.entries(stats).map(([category, time]) => (
                <p key={category} className="text-sm">{category}: {time}s</p>
            ))}
        </div>
    );
}
