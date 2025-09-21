import cv2
import numpy as np
from parking_detector import ParkingDetector
from space_analyzer import SpaceAnalyzer
from utils.video_stream import VideoStream

def main():
    # Initialize components
    video_stream = VideoStream()
    parking_detector = ParkingDetector()
    space_analyzer = SpaceAnalyzer()

    while True:
        # Get frame from video stream
        frame = video_stream.get_frame()
        if frame is None:
            break

        # Detect parking spaces
        parking_spaces = parking_detector.detect_spaces(frame)
        
        # Analyze each space for occupancy
        available_spaces = space_analyzer.analyze_spaces(frame, parking_spaces)

        # Display results
        for space in parking_spaces:
            color = (0, 255, 0) if space in available_spaces else (0, 0, 255)
            cv2.rectangle(frame, space.top_left, space.bottom_right, color, 2)

        # Show the frame
        cv2.imshow('Parking Space Detection', frame)
        
        # Break if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Cleanup
    video_stream.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
