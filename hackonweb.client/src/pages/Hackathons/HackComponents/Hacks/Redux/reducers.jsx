// reducers.js

const initialState = {
    selectedHackathon: null
};
const hackathonReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SELECT_HACKATHON':
            return {
                ...state,
                selectedHackathon: action.payload
            };
        default:
            return state;
    }
};
export default hackathonReducer;
