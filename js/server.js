const baseUrl = 'https://29.javascript.pages.academy/kekstagram';
const Route = {
  getData: '/data',
  sendData: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  getData: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  sendData: 'Не удалось отправить форму. Попробуйте еще раз',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${baseUrl}${route}`, { method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })

    .catch(() => {
      throw new Error (errorText);
    });
const getData = () => load(Route.getData, ErrorText.getData);

const sendData = (body) => load(Route.sendData, ErrorText.sendData, Method.POST, body);

export { getData, sendData};
