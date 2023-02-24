import React, { useEffect, useState } from "react";
import { readDataFromStorage } from "../helpers/storageHelper";
import "./DetailPage.css";

function DetailPage(props) {
    const [{ pages, technologiesComponents, currentUrlComponent }, setData] =
        useState({});

    useEffect(() => {
        const id = getId();
        getData(id);
        setData(getData(id));
    }, []);

    return (
        <div className='DetailPage' data-testid="detail-page">
            <div>
                <a href='/' className='back-button'>
                    &#60; back
                </a>
            </div>
            <div className='current-url' data-testid="current-url">{currentUrlComponent}</div>
            <div className='pages' data-testid="pages">{pages}</div>
            <div className='technologies' data-testid="technologies">{technologiesComponents}</div>
        </div>
    );
}

/**
 * gets id number from query url parameter
 *
 * @return {Number} - id number of the search url
 */
function getId() {
    // read query id parameter
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    return id;
}

/**
 * gets corresponding data for specified id
 *
 * @param {Number} id
 * @return {React.Component || {}} return React.Component
 */
function getData(id) {
    const data = readDataFromStorage();

    if (data.length > 0) {
        const filteredData = data.filter((d) => {
            return d.id === parseInt(id);
        });

        if (filteredData.length > 0) {
            return {
                pages:
                    filteredData[0].pages > 1 ? (
                        <p>{filteredData[0].pages} Pages Found</p>
                    ) : (
                        <p>{filteredData[0].pages} Page Found</p>
                    ),

                technologiesComponents: filteredData[0].technologies.map(
                    (t, i) => {
                        return (
                            <p key={i} className='technology'>
                                {t}
                            </p>
                        );
                    }
                ),
                currentUrlComponent: (
                    <p className='searchUrl'>
                        {filteredData[0].searchUrl} Results
                    </p>
                ),
            };
        }
    }

    return {};
}

export default DetailPage;
