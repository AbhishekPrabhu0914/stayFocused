from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

tasks = []

@app.route("/start_timer", methods=["POST"])
def start_timer():
    task_name = request.json.get("task", "Unnamed Task")
    category = request.json.get("category", "General")
    start_time = time.time()
    return jsonify({"message": "Timer started", "start_time": start_time})

@app.route("/stop_timer", methods=["POST"])
def stop_timer():
    end_time = time.time()
    task = request.json
    task["time"] = round(end_time - task["start_time"], 2)
    tasks.append(task)
    return jsonify({"message": "Task saved", "tasks": tasks})

@app.route("/stats")
def stats():
    category_totals = {}
    for task in tasks:
        category_totals[task["category"]] = category_totals.get(task["category"], 0) + task["time"]
    response = jsonify(category_totals)
    response.headers.add("Access-Control-Allow-Origin", "*")  
    return jsonify(category_totals)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
