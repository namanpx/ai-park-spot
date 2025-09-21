import cv2
import numpy as np

class SpaceAnalyzer:
    def __init__(self):
        # Initialize parameters
        self.occupied_threshold = 0.6
        self.background_subtractor = cv2.createBackgroundSubtractorMOG2()

    def analyze_spaces(self, frame, parking_spaces):
        """
        Analyze each parking space to determine if it's occupied
        Args:
            frame: numpy array of the video frame
            parking_spaces: list of ParkingSpace objects
        Returns:
            list of ParkingSpace objects that are available (not occupied)
        """
        available_spaces = []
        
        # Create mask for movement detection
        fgmask = self.background_subtractor.apply(frame)
        
        for space in parking_spaces:
            # Extract the region of interest (ROI) for the parking space
            x1, y1 = space.top_left
            x2, y2 = space.bottom_right
            roi = fgmask[y1:y2, x1:x2]
            
            # Calculate the percentage of foreground pixels
            total_pixels = roi.shape[0] * roi.shape[1]
            foreground_pixels = np.count_nonzero(roi)
            foreground_ratio = foreground_pixels / total_pixels
            
            # If the ratio is below threshold, space is available
            if foreground_ratio < self.occupied_threshold:
                available_spaces.append(space)
        
        return available_spaces
