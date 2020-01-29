import axios from "axios";
export const getData = async url => {
  try {
    const res = await axios.get(url);
    console.log(res);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};
