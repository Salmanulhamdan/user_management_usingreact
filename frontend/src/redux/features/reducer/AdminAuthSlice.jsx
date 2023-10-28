import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const initialState = {
    adminAuthToken: localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')): null, 
    
    admin: localStorage.getItem('authTokens')? jwtDecode (localStorage.getItem('authTokens')): null, 
}

const adminAuthSlice = createSlice({
    name : 'adminAuth',
    initialState,
    reducers: {
        setAuthAdmin: (state, action) => {
            console.log("action",action.payload)
            state.adminAuthToken = action.payload.adminAuthToken;
            state.admin = action.payload.admin
          },

        logoutAdmin:(state) => {
            state.adminAuthToken = null
            state.admin = null
            localStorage.removeItem('authTokens')
        }
    }
});


export const { setAuthAdmin, logoutAdmin } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;