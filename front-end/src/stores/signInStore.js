import { create } from "zustand";
import axios from "../api/axios";

const LOGIN_URL = "/api/login";
const FORGOT_PASS_URL = "/api/forgetPass";

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

      const formData = new FormData();
      formData.append('email', loginEmail);
      formData.append('password', loginPassword);

      const response = await axios.post(LOGIN_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(response.data);

      const { user, token } = response.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      set({ loading: false });

      router.push('/');
    } catch (error) {
      console.error('Error signing in:', error);
      set({ loading: false });
    }
  },

  handleClickForgetPass: async () => {
    const { loginEmail } = get();

    try {
      set({ loading: true });

      const formData = new FormData();
      formData.append('email', loginEmail);

      const response = await axios.post(FORGOT_PASS_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(response.data);
      set({ loading: false });
    } catch (error) {
      console.error('Error sending reset link to email:', error);
      set({ loading: false });
    }
  },
}));

export default useSignInStore;
