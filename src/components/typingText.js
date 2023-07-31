"use client"

import React, {useState, useEffect} from "react";
import styles from "./typingText.module.css"

const TypingText = (props) => {
    const text = props.text
    const delay = props.delay

    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    return (
        <div className={styles.text}>{currentText}</div>
    )
}

export default TypingText