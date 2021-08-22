const localv1 = "http://localhost:8006/";
const localol = "https://my-api-movie.herokuapp.com/apis/v1/";

export const getAllProduct = async (loai) => {
  let a = await fetch(`${localv1}getproduct?loai=${loai}`);
  return await a.json();
};
