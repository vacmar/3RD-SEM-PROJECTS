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
    polygons = np.array([[(0, height), (width, height), (int(width * 0.5), int(height * 0.6))]])
    cv2.fillPoly(mask, polygons, 255)
    masked = cv2.bitwise_and(edges, mask)

    # Hough line detection with adjusted parameters
    lines = cv2.HoughLinesP(masked, 1, np.pi/180, 30, minLineLength=40, maxLineGap=150)

    if lines is not None:
        valid_lines = [line for line in lines if is_valid_line(line)]
        
        if len(valid_lines) >= min_lines_threshold:
            message = "Lanes detected"
        else:
            message = "No lanes detected"
    else:
        message = "No lanes detected"

    # Return the original (untouched) image and message
    return image, message

def is_valid_line(line):
    # Implement your logic to validate the line
    for x1, y1, x2, y2 in line:
        slope = (y2 - y1) / (x2 - x1) if (x2 - x1) != 0 else float('inf')
        if abs(slope) > 0.5:  # Example condition to filter out near-horizontal lines
            return True
    return False

def is_valid_line(line):
    # Implement your logic to validate the line
    # Example: Filter lines based on slope or position
    for x1, y1, x2, y2 in line:
        slope = (y2 - y1) / (x2 - x1) if (x2 - x1) != 0 else float('inf')
        if abs(slope) > 0.5:  # Example condition to filter out near-horizontal lines
            return True
    return False

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
