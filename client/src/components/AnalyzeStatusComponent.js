import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    updateLocalStorage,
    getAnalyzeStatusFromStorage,
} from "../helpers/storageHelper";

/**
 * Analyze status of the searched urls
 *
 * @param {Object} props
 * @return {React.Component}
 */
function AnalyzeStatusComponent(props) {
    let [isAnalyzed, setIsAnalyzed] = useState(props.isAnalyzed);
    let [isDataFetchRequested, setIsDataFetchRequested] = useState(
        props.isDataFetchRequested
    );
    let [isUpdateNeeded, setIsUpdateNeeded] = useState(true);

    useEffect(() => {
        // gets current value for analyzing
        const analyzeStatus = getAnalyzeStatusFromStorage(props.id);
        setIsAnalyzed(analyzeStatus.isAnalyzed);
        setIsDataFetchRequested(analyzeStatus.isDataFetchRequested);

        if (isAnalyzed === false && isDataFetchRequested === false) {
            fetchData(props);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, isAnalyzed, isDataFetchRequested]);

    /**
     * fetches data from server
     *
     * @param {Object} props
     */
    const fetchData = (props) => {
        let result = {};
        const searchUrl = props.searchUrl;
        const url = `http://localhost:3001/api?url=${searchUrl}`;

        // update isDataFetchRequested on local storage
        updateLocalStorage({ id: props.id, isDataFetchRequested: true });

        setIsDataFetchRequested(true);
        setIsUpdateNeeded(!isUpdateNeeded);

        // send GET request to retrieve data from api
        axios
            .get(url)
            .then((response) => {
                response.data.id = props.id;
                response.data.searchUrl = searchUrl;
                response.data.isAnalyzed = true;
                response.data.isDataFetchRequested = true;

                result = response.data;

                // updates data on local storage
                updateLocalStorage(result);

                setIsAnalyzed(true);
                setIsUpdateNeeded(!isUpdateNeeded);
            })
            .catch((error) => {
                // TODO: update component status with error
                console.log(error);
                document.querySelector(".status").textContent = "Failed";
            });
    };

    return (
        <div className='analyze' data-testid={props.id} key={`key-${props.id}`}>
            <div className='left'>
                <a href={props.searchUrl}>{props.searchUrl}</a>
            </div>
            <div className={`right status ${!isAnalyzed ? "" : "hide"}`}>
                Analyzing...
            </div>
            <div className={`right status ${isAnalyzed ? "" : "hide"}`}>
                <a href={`/result?id=${props.id}`} target='_self'>
                    View More
                </a>
            </div>
        </div>
    );
}

export default AnalyzeStatusComponent;
