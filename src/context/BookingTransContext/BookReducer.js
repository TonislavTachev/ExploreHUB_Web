import { GET_TRANSACTION_HISTORY, CANCEL_BOOKING } from '../../types';

export default(state, action) =>{
    switch (action.type) {
        
        case GET_TRANSACTION_HISTORY:
           return{
               ...state,
               history:action.payload
           }
        case CANCEL_BOOKING:
            return{
                ...state,
                history: state.history.filter(el => el.EventID !== action.payload)
            }
    
        default:
            break;
    }
}