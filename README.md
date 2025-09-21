# AI Car Parking Management System

This is a computer vision-based system that detects empty parking spaces using video input.

## Features

- Real-time video processing
- Automatic parking space detection
- Space occupancy analysis
- Visual feedback with color-coded spaces (Green: Available, Red: Occupied)

## Requirements

- Python 3.7+
- OpenCV
- NumPy

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

Run the main script:
```bash
python src/main.py
```

- Press 'q' to quit the application

## How it works

1. The system captures video input from a camera or video file
2. Each frame is processed to detect parking spaces
3. The spaces are analyzed for occupancy using background subtraction
4. Results are displayed in real-time with color-coded boxes

## Project Structure

- `src/main.py`: Main application entry point
- `src/parking_detector.py`: Parking space detection logic
- `src/space_analyzer.py`: Space occupancy analysis
- `src/utils/video_stream.py`: Video capture handling
