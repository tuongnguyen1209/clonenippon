const localv1 = "http://localhost:8006/";
const localol = "https://clonenippon.herokuapp.com/";

export const getAllProduct = async (loai) => {
  let a = await fetch(`${localol}getproduct?loai=${loai}`);
  return await a.json();
};
