import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/contact`;

const submitContactForm = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

export default submitContactForm;
