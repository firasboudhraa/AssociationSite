import { create } from "zustand";
import axios from "../api/axios";

const LOGIN_URL = "/api/login";
const FORGOT_Pass_URL = "/api/forgetPass";

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

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      set({ loading: false });

      router.push('/'); 
    } catch (error) {
      console.error('Error signing in:', error);
      set({ loading: false });
    }
  },
  handleClickForgetPass: async() => {
    const { loginEmail } = get();

    try {
        set ({ loading : true });
        const response = await axios.post (FORGOT_Pass_URL , JSON.stringify({
        email: loginEmail,
    }),
    {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });
    console.log(response.data);
    set({ loading : false});
}catch(error) {
    console.error('Error sending  reset link to email',error);
    set({ loading: false});
}
}
}));

export default useSignInStore;
