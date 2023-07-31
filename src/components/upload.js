"use client"

import React, { useState } from "react";
import styles from './upload.module.css'

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const [uploadStyle, setUploadStyle] = useState(styles.uploader)
    const [promptSubmit, setPromptSubmit] = useState(styles.submit)

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            try {
                // Replace 'your-api-endpoint' with the actual API endpoint on your server
                const response = await fetch("/api/upload-csv", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    console.log("File uploaded successfully!");
                    setUploadStyle(styles.uploaded)
                    setPromptSubmit(styles.promptSubmit)
                    // Handle the response from the server if needed
                } else {
                    console.error("Error uploading file:", response.status, response.statusText);
                    alert("Error uploading file")
                    // Handle error, if any
                }
            } catch (error) {
                console.error("Error uploading file:", error);
                alert("Error uploading file")
                // Handle error, if any
            }
        } else {
            console.error("No file selected.");
            alert("No file selected.")
            // Handle no file selected case
        }
    };

    return (
        <div className={styles.main}>
            <form onSubmit={handleFileUpload}>
                <label htmlFor={"csv_input"}/>
                <input className={uploadStyle} id={"csv_input"} type="file" onChange={handleFileChange} title={''} />
                <button className={promptSubmit} type="submit">Upload</button>
            </form>
        </div>
    );
};

export default Upload;
