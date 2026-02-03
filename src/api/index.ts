import { axiosPublic, axiosPrivate } from "./config";
import { AuthApi } from "./auth";

const auth = new AuthApi(axiosPublic, axiosPrivate);

export const api = {
  auth,
};

export { axiosPublic, axiosPrivate } from "./config";
