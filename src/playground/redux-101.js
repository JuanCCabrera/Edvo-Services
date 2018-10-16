import { createStore } from 'redux';

//Action generators - functions that return action objects

const incrementCount = ({ incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy: decrementBy
});

const resetCount = () => ({
    type: 'RESET'
});

const setCount = ({count = 0} = {}) => ({
    type: 'SET',
    count: count
});

//Reducers
//1. Reducers are pure functions:
//// Output is only determined by input
//// Do not affect or use scope external to the function
//// Never change state or actions (only mutate them)

const countReducer = (state = {count:0}, action) => {
    switch(action.type){
        case 'INCREMENT':
            return{
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return{
                count: state.count - action.decrementBy
            };
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return {
                count: action.count
            };
        default:
            return state;
    }
};


//Store 

const store = createStore(countReducer);


//Subscribe executes a function every time the store changes. 
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

console.log(store.getState());
//Actions - than an object that gets setn to the store
// increment, decrement, reset

store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(incrementCount());

//unsubscribe();

store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy: 20}));

store.dispatch(resetCount());

store.dispatch(setCount({count: 5}));

