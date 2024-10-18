from flask import Flask, request, render_template, jsonify
import cv2
import numpy as np
import io
from PIL import Image
import base64

app = Flask(__name__)

# Enhanced lane detection function with improved checks
def lane_detection(image, min_lines_threshold=1):
    # Create a copy of the original image for processing
    processed_image = image.copy()

    # Convert the copy to grayscale and detect edges
    gray = cv2.cvtColor(processed_image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blur, 50, 150)

    # Define the region of interest (ROI)
    height, width = edges.shape
    mask = np.zeros_like(edges)
    polygons = np.array([[(0, height), (width, height), (width, 0), (0, 0)]])
    cv2.fillPoly(mask, polygons, 255)
    masked = cv2.bitwise_and(edges, mask)

    # Hough line detection with adjusted parameters
    lines = cv2.HoughLinesP(masked, 1, np.pi/180, 30, minLineLength=20, maxLineGap=200)

    if lines is not None:
        valid_lines = [line for line in lines]  # Keep all detected lines
        
        if len(valid_lines) >= min_lines_threshold:
            message = "Lanes detected"
        else:
            message = "No lanes detected"
    else:
        message = "No lanes detected"

    # Return the original (untouched) image and message
    return image, message

@app.route('/')
def index():
    return render_template('DS.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    try:
        img = Image.open(file.stream)
        img_array = np.array(img)
    except Exception as e:
        print(f"Failed to open image: {e}")
        return jsonify({'error': 'Invalid image file'}), 400

    # Perform lane detection (this will return the original image)
    result_img, message = lane_detection(img_array)

    # Encode the original uploaded image (not the processed one) to base64
    _, buffer = cv2.imencode('.png', img_array)
    encoded_image = base64.b64encode(buffer).decode('utf-8')

    # Return the message and the original image
    return jsonify({'message': message, 'image': encoded_image}), 200

if __name__ == "__main__":
    app.run(debug=True)