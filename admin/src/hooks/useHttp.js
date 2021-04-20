import Axios from "axios";
import { useSelector } from "react-redux";

export const useHttp = () => {
  const token = useSelector((state) => state.auth.data.token);
  const axios = Axios.create({ headers: { authorization: token } });

  const get = async (url) => {
    let result;
    try {
      result = await axios.get(url);
    } catch (e) {
      console.error(e);
      throw e;
    }
    return result;
  };

  const post = async (url, body) => {
    let result;
    try {
      result = await axios.post(url, body);
    } catch (e) {
      console.error(e);
      throw e;
    }
    return result;
  };

  const patch = async (url, body) => {
    let result;
    try {
      result = await axios.patch(url, body);
    } catch (e) {
      console.error(e);
      throw e;
    }
    return result;
  };

  const del = async (url, body) => {
    let result;
    try {
      result = await axios.delete(url, body);
    } catch (e) {
      console.error(e);
      throw e;
    }
    return result;
  };

  return { get, post, patch, del };
};
