import React, { useEffect, useState, useRef } from "react";
import styles from "./Timeline.module.css";

const Timeline = () => {
    const [length, setLength] = useState(2000);
    const [scale, setScale] = useState(10);
    const timelineRef = useRef(null);
    const allowedScales = [10, 20, 50, 100, 200, 500, 1000]

    // Generate timeline marks
    const marks = Array.from({ length: Math.floor(length / scale) + 1 }, (_, i) => i * scale);

    // Update CSS variable for timeline width
    useEffect(() => {
        const timelineWidth = marks.length * 10 - 10; // Determines the view width of the timeline
        document.documentElement.style.setProperty("--timeline-length", `${timelineWidth}vw`);
    }, [marks]);

    const handleZoom = (e) => {
        e.preventDefault();
    
        // Determine zoom direction
        const zoomIn = e.deltaY < 0; // Pinching out or scrolling up
        const zoomOut = e.deltaY > 0; // Pinching in or scrolling down
    
        // Find the current index of the scale in the allowedScales array
        const currentIndex = allowedScales.indexOf(scale);
    
        let newIndex = currentIndex;
    
        // Adjust index based on zoom direction, with bounds checking
        if (zoomIn && currentIndex < allowedScales.length - 1) {
            newIndex++; // Move to the next larger scale
        } else if (zoomOut && currentIndex > 0) {
            newIndex--; // Move to the next smaller scale
        }
    
        // Update the scale state to the new value
        setScale(allowedScales[newIndex]);
    };

    useEffect(() => {
        const timelineElement = timelineRef.current;

        // Add event listeners to the timeline element
        timelineElement.addEventListener("wheel", handleZoom);

        // Cleanup event listeners
        return () => {
            timelineElement.removeEventListener("wheel", handleZoom);
        };
    }, [scale]);

    return (
        <div className={styles.timelinePage}>
            <div className={styles.timelineContainer}>
                <div className= {styles.timeline} ref={timelineRef}>
                    {marks.map((mark, index) => (
                        <div className={styles.mark} key={index}>
                            {mark}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
