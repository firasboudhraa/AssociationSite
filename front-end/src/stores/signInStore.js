// useSignInStore.js

import { create } from "zustand";
import axios from "../api/axios";

const LOGIN_URL = "/api/login";

const useSignInStore = create((set, get) => ({
    loginEmail: typeof window !== 'undefined' ? localStorage.getItem('loginEmail') || '' : '',
    loginPassword: '',
    loading: false,
    handleChangePassword: (value) => { set({ loginPassword: value }) },
    handleChangeEmail: (value) => { 
        set({ loginEmail: value });
        localStorage.setItem('loginEmail', value);
    },
    handleClickSignIn: async () => {
        try {
            set({ loading: true });
            const response = await axios.post(LOGIN_URL, {
                email: get().loginEmail,
                password: get().loginPassword,
            });
            console.log(response.data);

            // Assuming your backend returns user data and token
            const { user, token } = response.data;

            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);

            set({ loading: false });
        } catch (error) {
            console.error('Error signing in:', error);
            set({ loading: false });
        }
    },
}));

export default useSignInStore;
