import cv2

class VideoStream:
    def __init__(self, source=0):
        """
        Initialize video capture
        Args:
            source: camera index or video file path (default: 0 for webcam)
        """
        self.cap = cv2.VideoCapture(source)
        if not self.cap.isOpened():
            raise ValueError("Error: Could not open video source")

    def get_frame(self):
        """
        Get the next frame from the video stream
        Returns:
            numpy array of the frame, or None if no frame is available
        """
        ret, frame = self.cap.read()
        if ret:
            return frame
        return None

    def release(self):
        """
        Release the video capture resources
        """
        self.cap.release()
