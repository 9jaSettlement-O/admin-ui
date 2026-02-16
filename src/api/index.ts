import { axiosPublic, axiosPrivate } from "./config";
import { AuthApi } from "./auth";
import { UsersApi } from "./users";
import { BusinessesApi } from "./businesses";
import { TransactionsApi } from "./transactions";

const auth = new AuthApi(axiosPublic, axiosPrivate);
const users = new UsersApi(axiosPrivate);
const businesses = new BusinessesApi(axiosPrivate);
const transactions = new TransactionsApi(axiosPrivate);

export const api = {
  auth,
  users,
  businesses,
  transactions,
};

export { axiosPublic, axiosPrivate } from "./config";
