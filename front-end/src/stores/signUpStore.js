import { create } from "zustand";
import axios from "../api/axios";

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
      
      const response = await axios.post(
        REGISTER_URL,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      console.log(response.data);
      set({ loading: false });
      router.push('/Profile');
    } catch (error) {
      console.error("Error signing up:", error);
      set({ loading: false });
    }
  },
}));

export default useSignUpStore;
