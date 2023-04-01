import { createSlice } from '@reduxjs/toolkit';


const initialState =  {
  tasks: []
}
export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      setTasks: (state, action) => {
         state = action.payload
         return state;
      },
      addTask:(state, action)=>{
        state.push({
          id: action.payload.id,
          description: action.payload.description,
          done: action.payload.done
        })
      },
      removeTask: (state, action)=>{
        const updatedTasks = state.filter((task)=> task.id !== action.payload.id)
        state = updatedTasks
        return state;
      }
    }
});
export const { setTasks,addTask, removeTask} = tasksSlice.actions;
export default tasksSlice.reducer;