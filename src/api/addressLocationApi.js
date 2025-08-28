import axios from "axios";

export const getProvinces = () => axios.get("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1");
export const getDistricts = (provinceCode) =>
  axios.get(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`);
export const getWards = (districtCode) =>
  axios.get(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtCode}&limit=-1`);
