"use client";

import styles from './questionInput.module.css';
import React, {useEffect, useState, useCallback} from "react";
import Upload from "@/components/upload";
import Voice from "@/components/voice";

const QuestionInput = ({addToInputList, addToResponseList, addToMapList}) => {

    const [question, setQuestion] = useState("");

    const setVoiceInput = useCallback((voice)=> {
        setQuestion(voice)
    }, [setQuestion])

    const handleChange = (event) => {
        setQuestion(event.target.value);
        console.log('test')
    };

    const addInput = (input) => {
        addToInputList(input);

    };

    const addResponse = (response) => {
        addToResponseList(response);
    }

    const addMap = (coord) => {
        addToMapList(coord)
    }



    const handleSubmit = async (event) => {
        event.preventDefault();

        addInput(question)

        const fetchData = async () => {
            try {
                if (question.includes("can you show me where it is")) {
                    const url = "/api/get-map";
                    const response = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({question})
                    })

                    const data = await response.json()
                    console.log(data)
                    addToMapList(data)

                } else {
                    const url = "/api/ask-gpt";
                    const response = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({question}),
                    });

                    if (!response.ok) {
                        throw new Error("Request failed with status: " + response.status);
                    }


                    const data = await response.json();
                    addResponse(data)

                }


            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Error! Refresh!")

            }
        };

        await fetchData();

        setQuestion("");
    };


    return (
        <div className={styles.main}>

            <div className={styles.options}>
                <Upload/>
                <Voice setVoiceInput={setVoiceInput}/>
            </div>

            <form id={'csv-input'} onSubmit={handleSubmit} className={styles.container}>
                <input type="text" value={question} onChange={handleChange}
                       placeholder={"Ask a question about your CSV."} className={styles.input}/>
            </form>
        </div>
    );
};

export default QuestionInput;