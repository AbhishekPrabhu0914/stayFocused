from flask import Flask, request, jsonify
import cv2
import mediapipe as mp
import numpy as np
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

mp_face_detection = mp.solutions.face_detection
mp_drawing = mp.solutions.drawing_utils

@app.route('/upload', methods=['POST'])
def upload_image():
    data = request.get_json()
    image_data = data['image']
    image_data = image_data.split(',')[1]  # Remove the data URL prefix
    image_bytes = base64.b64decode(image_data)
    np_arr = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    # Process the image with MediaPipe
    with mp_face_detection.FaceDetection(model_selection=1, min_detection_confidence=0.5) as face_detection:
        results = face_detection.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

        # Draw face landmarks
        if results.detections:
            for detection in results.detections:
                mp_drawing.draw_detection(image, detection)

    # Encode the processed image to base64
    _, buffer = cv2.imencode('.png', image)
    processed_image_base64 = base64.b64encode(buffer).decode('utf-8')
    
    return jsonify({'processed_image': processed_image_base64})

if __name__ == '__main__':
    app.run(debug=True)