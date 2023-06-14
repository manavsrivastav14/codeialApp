export * from './constants';

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error('Cannot store item in local storage.');
  }

  const valueToStore =
    typeof value !== 'string' ? JSON.stringify(value) : value;

  localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('Cannot get item from local storage');
  }
  localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('Cannot remove item from local storage');
  }
  localStorage.removeItem(key);
};

export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // user name => user%20name
    let encodedValue = encodeURIComponent(params[property]); // manav 123 => manav%20123

    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&'); // username=manav&password=123123
};
