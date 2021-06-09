import { combineReducers } from 'redux';

import { QUOTES_AVAILABLE, ADD_QUOTE, UPDATE_QUOTE, DELETE_QUOTE } from "./actions" //Import the actions types constant we defined in our actions

let dataState = { quotes: [] };

const dataReducers = (state = dataState, action) => {
    switch (action.type) {
        case ADD_QUOTE:
            let { get_quote } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.quotes));

            clone.unshift(get_quote); //add the new quote to the top

            return {...state, quotes: clone};

        case QUOTES_AVAILABLE:
            let { quotes } = action.data;

            return {...state, quotes};

        case UPDATE_QUOTE:{
            let { get_quote } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.quotes));

            //check if bookmark already exist
            const index = clone.findIndex((obj) => obj.id === get_quote.id);

            //if the get_quote is in the array, update the get_quote
            if (index !== -1) clone[index] = get_quote;

            return {...state, quotes: clone};
        }

        case DELETE_QUOTE:{
            let { id } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.quotes));

            //check if quote already exist
            const index = clone.findIndex((obj) => obj.id === id);

            //if the quote is in the array, remove the quote
            if (index !== -1) clone.splice(index, 1);

            return {...state, quotes: clone};
        }

        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({dataReducers});

export default rootReducer;
