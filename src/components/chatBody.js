"use client";

import React, {useState} from 'react';
import QuestionInput from "@/components/questionInput";
import styles from "./chatBody.module.css"
import Image from "next/image";
import person from "@/assets/person.png"
import transit from "@/assets/transit-tech-logo.png"
import TypingText from "@/components/typingText";
import WorldMap from "@/components/worldMap";
import {LoadScript} from "@react-google-maps/api";


const ChatBox = (props) => {


    if (props.type === "response") {
        console.log('bruh')
        return(
            <div className={styles.response}>
                <Image className={styles.image} src={transit} alt={'User'} width={35} height={35}/>
                {/*<div className={styles.text}>{props.body.answer}</div>*/}
                <TypingText text={props.body.answer} delay={3} />
            </div>
        )
    }
    if (props.type === "question") {
        return(
            <div className={styles.question}>
                <Image className={styles.image} src={person} alt={'User'} width={35} height={35}/>
                <div className={styles.text}>{props.body}</div>

            </div>
        )
    }
    if (props.type === "map") {
        return(
            <div className={styles.response}>
                <Image className={styles.image} src={transit} alt={'User'} width={35} height={35}/>
                <WorldMap latitude={props.body.latitude} longitude={props.body.longitude} />
            </div>
        )
    }
}

const ChatBody = () => {
    const [chat, setChat] = useState([]);

    const addToResponseList = (response) => {
        setChat((prevState => [...prevState, {type: 'response', body: response}]))
    };

    const addToInputList = (question) => {
        setChat((prevState => [...prevState, {type: 'question', body: question}]))

    };

    const addToMapList = (coordinates) => {
        setChat((prevState => [...prevState, {type:'map', body: coordinates}]))
    }

    return (
        <div>
            <LoadScript googleMapsApiKey={process.env.googleMapsAPI}/>
            <div className={styles.chat}>
                {chat.map((obj, index) => {
                return (
                    <ChatBox key={index} type={obj.type} body={obj.body}/>
                    );
                })
                }
            </div>
            <QuestionInput addToInputList={addToInputList} addToResponseList={addToResponseList} addToMapList={addToMapList} />
        </div>
    );
};

export default ChatBody;
