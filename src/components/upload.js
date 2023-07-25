"use client"

import React, { useState } from "react";

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

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
                    // Handle the response from the server if needed
                } else {
                    console.error("Error uploading file:", response.status, response.statusText);
                    // Handle error, if any
                }
            } catch (error) {
                console.error("Error uploading file:", error);
                // Handle error, if any
            }
        } else {
            console.error("No file selected.");
            // Handle no file selected case
        }
    };

    return (
        <div>
            <form onSubmit={handleFileUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default Upload;
