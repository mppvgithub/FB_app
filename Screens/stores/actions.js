export const QUOTES_AVAILABLE = 'QUOTES_AVAILABLE';
export const ADD_QUOTE = 'ADD_QUOTE';
export const UPDATE_QUOTE = 'UPDATE_QUOTE';
export const DELETE_QUOTE = 'DELETE_QUOTE';

export const MENU_AVAILABLE = 'MENU_AVAILABLE';
export const ADD_MENU='ADD_MENU';
export const UPDATE_MENU='UPDATE_MENU';
export const DEL_MENU='DEL_MENU';
export const DEL_ALL_MENU='DEL_ALL_MENU';


// Get Quotes
export const get_addQuotes = (quotes) => ({
    type: QUOTES_AVAILABLE,
    data: {quotes}
});

// Add Quote - CREATE (C)
export const addQuote = (quote) => ({
    type: ADD_QUOTE,
    data: {quote}
});

// Update Quote - UPDATE (U)
export const updateQuote = (quote) => ({
    type: UPDATE_QUOTE,
    data: {quote}
});

// Delete Quote - DELETE (D)
export const deleteQuote = (id) => ({
    type: DELETE_QUOTE,
    data: {id}
});

// ==================== menu mangement ==================== 

export const get_addMenu = (details) => ({
    type: MENU_AVAILABLE,
    data: {details}
});

export const add_menu = (details) =>({
    type:ADD_MENU,
    data:{details}
})

export const update_menu = (details) =>({
    type:UPDATE_MENU,
    data:{details}
})
export const del_menu = (details) =>({
    type:DEL_MENU,
    data:{details}
})

export const del_all_menu = (details) =>({
    type:DEL_ALL_MENU,
    data:{}
})
