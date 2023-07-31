const server = 'https://29.javascript.pages.academy';

const Pathname = {
  GET: '/kekstagram/data',
  POST: '/kekstagram',
};

const errorText = {
  get: () => 'Не удалось загрузить данные! Попробуйте обновить страницу.',
  post: () => 'Не удалось отправить форму! Попробуйте ещё раз.',
  request: (code, text) => `Не удалось загрузить данные! Код ошибки: ${code}. Описание ошибки: ${text}.`,
};

const request = (pathname, method = 'GET', body = null) => {
  const url = new URL(pathname, server);

  return fetch(url, { method, body })
    .then((response) => {
      const {ok, status, statusText} = response;

      if (!ok) {
        throw new Error(errorText.request(status, statusText), { cause: 'errorResponse' });
      }

      return response.json();
    })
    .catch((err) => {
      if (err.cause === 'errorResponse') {
        throw err;
      }

      throw new Error(errorText[method.toLowerCase()]());
    });
};

const getData = () => request(Pathname.GET);

const sendData = (body) => request(Pathname.POST, 'POST', body);

export { getData, sendData };
