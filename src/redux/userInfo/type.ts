export interface IUserInfo {
  _id: string;
  token: string | null;
  isLogged: boolean;
  avatar: string | null
  email: string,
  name: string | null
};
