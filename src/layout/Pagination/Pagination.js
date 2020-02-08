import React from 'react'

/**
 * 
 * @param {Integer} eventsperPage specify how many results should be displayed per page
 * @param {Integer} totalEvents the number of all events in the database
 * @param {Integer} paginate number of pagination tabs
 */
const Pagination = ({eventsperPage, totalEvents, paginate}) => {

    //calculates the number of pages
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalEvents/eventsperPage); i++){
        pageNumbers.push(i);
    }

   //STATIC HTML to render the pagination
    return (
            <ul className="pagination">
            {pageNumbers.map(number =>(
                <li key={number} className='waves-effect'>
                    <a onClick={() => paginate(number)} href='#'> {number}</a>
                </li>
            ))}
            </ul>
    
    )
}

export default Pagination
