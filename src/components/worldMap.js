"use client"

import React from "react";
import {GoogleMap, LoadScript, MarkerF, useJsApiLoader} from '@react-google-maps/api';
import styles from './worldMap.module.css'

const WorldMap = (props) => {

    const containerStyle = {
        width: '400px',
        height: '300px'
    };

    const center = {
        lat: props.latitude,
        lng: props.longitude,
    };

    return (
        <div className={styles.map}>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                controlSize={5}
            >
                <MarkerF position={center}/>
            </GoogleMap>

        </div>
    )


}

export default WorldMap