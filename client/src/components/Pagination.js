import React, { useState, useEffect } from "react";
/**
 * Pagination Component
 *
 * @param {Object} props
 * @return {React}
 */
const Pagination = (props) => {
    const data = props.data;
    const maxPageLimit = 3;

    // current page
    const [currentPage, setCurrentPage] = useState(0);

    // current page data
    const [pageData, setPageData] = useState([]);

    // navigation handler on page
    const [navigation, setNavigation] = useState();

    // navigation amount
    const [navigationAmount, setNavigationAmount] = useState(0);

    /**
     * sets current page when click the corresponding navigation button
     *
     * @param {Number} c - index number of the current page
     */
    const setCurrentPageNavigation = (c) => {
        setCurrentPage(c);
    };

    useEffect(() => {
        setPageData(() => {
            const lowerLimit = currentPage * maxPageLimit;
            const upperLimit = currentPage * maxPageLimit + maxPageLimit;
            setNavigationAmount(data.length / maxPageLimit);

            return data.slice(lowerLimit, upperLimit);
        });

        setNavigation(() => {
            let navigationComponent = [];

            for (let i = 0; i < navigationAmount; i++) {
                const n = (
                    <a
                        key={"pagination" + i.toString()}
                        href='/'
                        className='navigation-button'
                        onClick={(e) => {
                            e.preventDefault();

                            setCurrentPageNavigation(i);
                        }}
                    >
                        {i + 1}
                    </a>
                );
                navigationComponent.push(n);
            }

            return navigationComponent;
        });
    }, [currentPage, data, navigationAmount, props]);

    return (
        <div className='pagination' data-testid={"pagination"}>
            <p>Analyzing Targets</p>
            <div className='targets'>{pageData}</div>
            <div className='navigation'>{navigation}</div>
        </div>
    );
};

export default Pagination;
