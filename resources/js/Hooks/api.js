import axios from "./axios.config";

export const fetchLanguages = async () => {
    const response = await axios.get('/languages')
    const data = await response.data;
    return data;
  };

 export const fetchTags = async () => {
    const response = await axios.get('/tags')
    const data = await response.data;
    return data;
  };

 export const fetchPostCategories = async () => {
    const response = await axios.get('/categories')
    const data = await response.data;
    return data;
  };
