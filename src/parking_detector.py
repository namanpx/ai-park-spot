import cv2
import numpy as np
from dataclasses import dataclass

@dataclass
class ParkingSpace:
    top_left: tuple
    bottom_right: tuple
    id: int

class ParkingDetector:
    def __init__(self):
        # Initialize any pre-trained models or parameters here
        self.model = None
        self.min_space_width = 80
        self.min_space_height = 160

    def detect_spaces(self, frame):
        """
        Detect parking spaces in the given frame
        Args:
            frame: numpy array of the video frame
        Returns:
            list of ParkingSpace objects
        """
        # Convert frame to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Apply some preprocessing
        blur = cv2.GaussianBlur(gray, (5, 5), 0)
        edges = cv2.Canny(blur, 50, 150)
        
        # Find contours
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        parking_spaces = []
        for i, contour in enumerate(contours):
            # Get bounding rectangle
            x, y, w, h = cv2.boundingRect(contour)
            
            # Filter based on minimum size
            if w >= self.min_space_width and h >= self.min_space_height:
                space = ParkingSpace(
                    top_left=(x, y),
                    bottom_right=(x + w, y + h),
                    id=i
                )
                parking_spaces.append(space)
        
        return parking_spaces
