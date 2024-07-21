import { create } from "zustand";
import axios from "../app/api/axios";

const REGISTER_URL = "/api/create";

const useSignUpStore = create((set, get) => ({
  formData: {
    name: "",
    email: "",
    password: "",
  },
  loading: false,

  handleChange: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },

  handleClickSignUp: async (router) => {
    const { formData } = get();
    
    try {
      set({ loading: true });
      
      const response = await axios.post(REGISTER_URL, formData);
      
      console.log(response.data);

      const { user, token } = response.data; 

      if (user && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user)); 
      }else {
        console.error("User or token is undefined");
      }

      set({ loading: false });
      router.push('/');
    } catch (error) {
      console.error("Error signing up:", error);
      set({ loading: false });
    }
  },
}));

export default useSignUpStore;
