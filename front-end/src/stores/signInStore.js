import { create } from "zustand";
import axios from "../api/axios";

const LOGIN_URL = "/api/login";

const useSignInStore = create((set, get) => ({
  loginEmail: typeof window !== 'undefined' ? localStorage.getItem('loginEmail') || '' : '',
  loginPassword: '',
  loading: false,

  handleChangePassword: (value) => {
    set({ loginPassword: value });
  },

  handleChangeEmail: (value) => {
    set({ loginEmail: value });
    localStorage.setItem('loginEmail', value);
  },

  handleClickSignIn: async (router) => {
    const { loginEmail, loginPassword } = get();

    try {
      set({ loading: true });
      
      const response = await axios.post(LOGIN_URL, {
        email: loginEmail,
        password: loginPassword,
      });

      console.log(response.data);

      const { user, token } = response.data;

      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      set({ loading: false });

      router.push('/Profile'); // Replace with your profile route
    } catch (error) {
      console.error('Error signing in:', error);
      set({ loading: false });
    }
  },
}));

export default useSignInStore;
