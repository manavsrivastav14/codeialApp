import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from '../utils';

// Some APIs will require authorization and hence we would be sending authorization key "Bearer" and bearer will be holding the value for token.
// body argument in the below line will contain information for eg. while logging in API call will contain body which consists of email and password
const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    //We need to stringify body since object cannot be send directly in fetch request
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config); // config will contain things like what is the method for the API call etc.
    const data = await response.json();
    if (data.success) {
      return {
        data: data.data, //NOTE:- We have all responses of APIs common
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error(error);
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  fetch();
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};
