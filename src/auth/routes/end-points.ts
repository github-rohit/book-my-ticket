export const AUTH_BASE_END_POINT = '/api/v1/user';

function getEndPoint(uri: string) {
  return `${AUTH_BASE_END_POINT}${uri}`;
}

export const SIGNUP = `/signup`;
export const SIGNUP_END_POINT = getEndPoint(SIGNUP);

export const SIGNIN = `/signin`;
export const SIGNIN_END_POINT = getEndPoint(SIGNIN);

export const SIGNOUT = `/signout`;
export const SIGNOUT_END_POINT = getEndPoint(SIGNOUT);

export const CHANGE_PASSWORD = `/changepassword`;
export const CHANGE_PASSWORD_END_POINT = getEndPoint(CHANGE_PASSWORD);
