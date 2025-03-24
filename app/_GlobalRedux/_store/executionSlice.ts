'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface ExecutionState {
    
    sideBarOpen:boolean;

}

const initialState: ExecutionState = {

    sideBarOpen:false,
}

export const executionSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        
        
        setSideBarOpen: (state,action) => { state.sideBarOpen =action.payload },
        
    }
})

export const {  setSideBarOpen } = executionSlice.actions;


      
export default executionSlice.reducer;