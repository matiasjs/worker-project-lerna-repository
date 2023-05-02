export const setCookieOnFrontend = (
  name: string,
  value: string,
  options?: {
    expireTime: number;
  }
) => {
  let cookie = `${name}=${value};`;

  if (options?.expireTime) {
    cookie = `${cookie} Expires=${new Date(options.expireTime).toUTCString()};`;
  }

  document.cookie = cookie;
};

export const deleteCookieOnFrontend = (name: string) => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
