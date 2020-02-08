import {SET_ALERT, REMOVE_ALERT, SET_HISTORY_ALERT} from '../../types';

export default(state, action) =>{
    switch (action.type) {
        case SET_ALERT:
          return {
            ...state,
            alert: action.payload
          }

        case SET_HISTORY_ALERT:
          return{
            ...state,
            historyAlert :action.payload
          }

        case REMOVE_ALERT:
             return {
               ...state,
               alert:null,
               historyAlert:null
             }
    
        default:
            return state;
    }
}