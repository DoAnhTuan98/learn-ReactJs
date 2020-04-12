import * as types from './../constants/ActionTypes';
import Randomstring from 'randomstring'

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];
var findIndex = (tasks,id) => {
    var result = -1 ;
    tasks.forEach((task,index) => {
        if(task.id === id) {
        result = index;
        }
    });
    return result;
}

var myReducer = (state = initialState,action) => {
    switch(action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            console.log(typeof action.task.status)
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status === 'true' || action.task.status === true ? true : false
            }
            if(!task.id) { // them task
                task.id = Randomstring.generate(16);
                state.push(task);
            }else { // sua task
                var index = findIndex(state,task.id);
                state[index] = task;
            }
            
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state]
        case types.UPDATE_STATUS_TASK:
            var index = findIndex(state,action.id);
            var cloneTask = {...state[index]};
            cloneTask.status = !cloneTask.status;
            state[index] = cloneTask;
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            var index = findIndex(state,action.id);
            state.splice(index,1);
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
};

export default myReducer;