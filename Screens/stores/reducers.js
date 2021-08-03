import { combineReducers } from 'redux';

import {
    QUOTES_AVAILABLE,
    ADD_QUOTE,
    UPDATE_QUOTE,
    DELETE_QUOTE,

    MENU_AVAILABLE,
    ADD_MENU,
    DEL_MENU,
    UPDATE_MENU,
    DEL_ALL_MENU
} from "./actions" //Import the actions types constant we defined in our actions

let dataState = {
    quotes: [],
    menus: []
};

const dataReducers = (state = dataState, action) => {
    switch (action.type) {
        case ADD_QUOTE:
            let { get_quote } = action.data;
            console.log("ADD_QUOTE get_quote", get_quote)
            console.log("state.quotes", state.quotes)
            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.quotes));

            clone.unshift(get_quote); //add the new quote to the top

            return { ...state, quotes: clone };

        case QUOTES_AVAILABLE:
            let { quotes } = action.data;

            return { ...state, quotes };

        case UPDATE_QUOTE: {
            let { get_quote } = action.data;
            console.log("UPDATE_QUOTE, get_quote", get_quote)
            console.log("state.quotes", state.quotes)
            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.quotes));

            //check if bookmark already exist
            const index = clone.findIndex((obj) => obj.id === get_quote.id);

            //if the get_quote is in the array, update the get_quote
            if (index !== -1) clone[index] = get_quote;

            return { ...state, quotes: clone };
        }

        case DELETE_QUOTE: {
            let { id } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.quotes));

            //check if quote already exist
            const index = clone.findIndex((obj) => obj.id === id);

            //if the quote is in the array, remove the quote
            if (index !== -1) clone.splice(index, 1);

            return { ...state, quotes: clone };
        }

        case ADD_MENU: {
            var get_menu = action.data.details;
            console.log("get_menu", get_menu)
            state.menus.push(get_menu);
            return { ...state };
        }

        case MENU_AVAILABLE: {
            console.log("MENU_AVAILABLE action from async", action)
            let get_menus = action.data.details;
            state.menus = (get_menus);
            console.log("state.menus", state.menus)
            return { ...state };
        }

        case UPDATE_MENU: {
            var get_menu = action.data.details;
            console.log("get_menu", get_menu)
            state.menus.map((val,key) => {
                if(val.itemId == get_menu.itemId){
                    state.menus[key].itemSelcted = get_menu.itemSelcted  
                }
            })
            // state.menus.push(get_menu);
            return { ...state };
        }

        case DEL_MENU: {
            var id = action.data.details;
            console.log("id",id)
            state.menus.map((val,key) => {
                if(val.itemId == id){
                    state.menus.splice(key, 1) 
                }
            })

            return { ...state};
        }

        case DEL_ALL_MENU: {
            var id = action.data.details;
            state.menus= []
            return { ...state};
        }

        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({ dataReducers });

export default rootReducer;
