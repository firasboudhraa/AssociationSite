import { create } from "zustand";
import axios from "../api/axios";

const REGISTER_URL = "/api/create";

const useSignUpStore = create((set, get) => ({
  formData: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  errors: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  validateForm: () => {
    const { formData } = get();
    const errors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    // Password validation (minimum 8 characters, 1 uppercase, 1 number)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.password = "Password must be at least 8 characters long, include an uppercase letter and a number.";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    set({ errors });
    return Object.values(errors).every((error) => error === "");
  },

  handleClickSignUp: async (router) => {
    const { formData } = get();

    if (!get().validateForm()) {
      return; // Stop execution if validation fails
    }

    try {
      set({ loading: true });
      
      const response = await axios.post(REGISTER_URL, formData);
      
      console.log(response.data);

      const { user, token } = response.data; 

      if (user && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user)); 
      } else {
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
