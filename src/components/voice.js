"use client"

import 'regenerator-runtime/runtime'
import React, {useEffect, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from "./voice.module.css"

const Voice = ({setVoiceInput}) => {

    const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(null)

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        setSpeechRecognitionSupported(browserSupportsSpeechRecognition)
    }, [browserSupportsSpeechRecognition])


    useEffect(() => {
        setVoiceInput(transcript);
    }, [transcript, setVoiceInput])


    if (speechRecognitionSupported === null) return null

    if (!speechRecognitionSupported) {
        return <span>Browser does not support speech recognition.</span>
    }



    return (
        <div >
            <p className={styles.main}>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
        </div>
    );
};
export default Voice;