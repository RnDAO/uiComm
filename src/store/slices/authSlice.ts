import { StateCreator } from "zustand";
import axios from 'axios'
import IAuth from '../types/IAuth'

const createAuthSlice: StateCreator<IAuth> = (set, get) => ({
    isLoggedIn: false,
    redirectToDiscord: async()=>{
        const res = await axios.get(`http://104.248.137.224:3000/api/v1/auth/login`)
        console.log('res',res);
    }
})

export default createAuthSlice;