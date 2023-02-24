/**
 * reads all data from local storage in Array of objects format
 *
 * @return {Array}
 */
const readDataFromStorage = () => {
    const dataRaw = localStorage.getItem("data");
    let data = [];
    // init data storage
    if (dataRaw === null) {
        localStorage.setItem("data", JSON.stringify([]));
    } else {
        data = JSON.parse(dataRaw);
    }

    return data;
};

/**
 * insert new data to local storage
 *
 * @param {String} url - object of search url
 */
const insertLocalStorage = (url) => {
    let data = readDataFromStorage();

    data.push(url);

    localStorage.setItem("data", JSON.stringify(data));
};

/**
 * updates local storage after the data is fetched from the server
 *
 * @param {Object} newdata
 */
const updateLocalStorage = (newdata) => {
    let data = readDataFromStorage();

    data.forEach((d) => {
        if (d.id === newdata.id) {
            Object.keys(newdata).forEach((key) => {
                d[key] = newdata[key];
            });
        }
    });

    localStorage.setItem("data", JSON.stringify(data));
};

/**
 * gets information about is it analyzed and is data fetch requested from server
 *
 * @param {Number} id
 * @return {Object}
 */
const getAnalyzeStatusFromStorage = (id) => {
    let result = { isAnalyzed: false, isDataFetchRequested: false };

    let data = readDataFromStorage();

    if (data.length > 0) {
        const filteredData = data.filter((d) => d.id === id);

        if (filteredData.length > 0) {
            result = {
                isAnalyzed: filteredData[0].isAnalyzed,
                isDataFetchRequested: filteredData[0].isDataFetchRequested,
            };
        }
    }

    return result;
};

export {
    readDataFromStorage,
    insertLocalStorage,
    updateLocalStorage,
    getAnalyzeStatusFromStorage,
};
