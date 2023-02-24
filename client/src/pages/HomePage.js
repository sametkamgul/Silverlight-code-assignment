import "./HomePage.css";
import React, { useEffect, useState } from "react";
import AnalyzeStatusComponent from "../components/AnalyzeStatusComponent";
import Pagination from "../components/Pagination";
import {
    readDataFromStorage,
    insertLocalStorage,
} from "../helpers/storageHelper";

/**
 * Home page - used for landing
 *
 * @return {React}
 */
function Home() {
    const [searchUrl, setSearchUrl] = useState("");
    const [analyzeComponentsList, setAnalyzeComponentList] = useState([]);
    const [isUpdateNeeded, setIsUpdateNeeded] = useState(true);

    useEffect(() => {
        if (!isUpdateNeeded) return;

        setIsUpdateNeeded(false);

        setAnalyzeComponentList(getDataFromStorage());
    }, [isUpdateNeeded]);

    /**
     * Gets data from local storage
     *
     * @return {React.Component Array || null} - returns array of components or null
     */
    const getDataFromStorage = () => {
        let data = readDataFromStorage();

        if (data.length > 0) {
            // last record is displayed first
            data = data.reverse();

            if (data.length > 0) {
                return data.map((d) => {
                    return (
                        <AnalyzeStatusComponent
                            searchUrl={d.searchUrl}
                            id={d.id}
                            isAnalyzed={d.isAnalyzed}
                            isDataFetchRequested={d.isDataFetchRequested}
                        ></AnalyzeStatusComponent>
                    );
                });
            }
        }

        return null;
    };

    /**
     * handles click event on analyze button
     *
     * @param {String} searchUrl
     */
    const handleClick = (searchUrl) => {
        // url regex check. example url: https://epctex.com or https://www.epctex.com
        const re =
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&=]*)/;

        const regex = new RegExp(re);

        if (regex.test(searchUrl)) {
            document.querySelector("#search-url").value = "";
            setSearchUrl("");

            const dataLength = calculateLength();

            const id = dataLength > 0 ? dataLength : 0;

            const url = {
                searchUrl: searchUrl,
                isAnalyzed: false,
                id: id,
                isDataFetchRequested: false,
            };

            insertLocalStorage(url);
        } else {
            const errorMessages = document.querySelectorAll(".error-message");
            errorMessages.forEach((e) => {
                e.classList.remove("hide");
            });

            setTimeout(() => {
                errorMessages.forEach((e) => {
                    e.classList.add("hide");
                });
            }, 3000);
        }
    };

    /**
     * calculates length of the data array from local storage. Used for id assignment on new values
     *
     * @return {Number} - length of data
     */
    const calculateLength = () => {
        let data = readDataFromStorage();

        return data.length;
    };

    return (
        <div className='Home' key={"Home"}>
            <header className='App-header'>
                <p id='product-title'>Silverlight</p>
                <div className='analyze-cta-container'>
                    <input
                        type='text'
                        placeholder='please enter an url'
                        onChange={(e) => {
                            setSearchUrl(e.target.value);
                        }}
                        id='search-url'
                    ></input>
                    <button
                        className='analyze-button'
                        onClick={() => {
                            handleClick(searchUrl);
                            setIsUpdateNeeded(true);
                        }}
                    >
                        Analyze
                    </button>
                    <div className='error-container'>
                        <p className='error-message hide'>
                            Please enter a valid url.
                        </p>
                        <p className='error-message hide'>
                            hint: https://epctex.com or https://www.epctex.com
                        </p>
                    </div>
                </div>
                {analyzeComponentsList ? (
                    <Pagination data={analyzeComponentsList}></Pagination>
                ) : (
                    <></>
                )}
            </header>
        </div>
    );
}

export default Home;
