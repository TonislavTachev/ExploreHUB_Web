import React from 'react'
import WishlistItem from './WishlistItem'
import Preloader from '../Preloader/Preloader';
/**
 * @method
 * @method
 * @param {Array} wishlist - array of objects containing all of the wishlist events of the user 
 */

const List = ({wishlist}) => {

    //if there aren't any events, return nothing
    if(wishlist.length === 0){
        return <p></p>
    }

    //if there are events, map over them and display them
    return (
        <div>
           {wishlist.length > 0 ? wishlist.map(el => <WishlistItem excursion={el}/>) : <h3></h3>}
        </div>
    )
}

export default List
