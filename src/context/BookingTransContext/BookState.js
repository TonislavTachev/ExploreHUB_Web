import React, {useReducer} from 'react'
import BookReducer from './BookReducer';
import axios from 'axios';
import BookContext from './BkContext';
import {GET_TRANSACTION_HISTORY, CANCEL_BOOKING} from '../../types';

const BookState = props => {

    const initialState = {
        history:null
    }

    const [state, dispatch] = useReducer(BookReducer, initialState);

 
    const getHistory = async(user_id) =>{

        try{
            const data = await axios.get(`http://localhost:5000/history/transactions/${user_id}`);
            dispatch({type:GET_TRANSACTION_HISTORY, payload: data.data.data});
        }catch(error){

        }
    }

    const cancel = async(student_id, event_id)=>{
   
        try {
            const canc = axios.post(`http://localhost:5000/history/transactions/${student_id}/cancel/${event_id}`);
            dispatch({type:CANCEL_BOOKING, payload:event_id});
        } catch (error) {
            
        }
    }

    return (
        <BookContext.Provider value={{
            history:state.history,
            getHistory,
            cancel
        }}>
            {props.children}
        </BookContext.Provider>
    )
}

export default BookState