/* eslint-disable object-curly-newline, import/prefer-default-export */
/* global CODUS_API_BASE */
async function apiRequest({ endpoint, method, heads, body }) {
  const url = [
    CODUS_API_BASE.replace(/\/$/g, ''), // Strip trailing slash
    endpoint.replace(/^\//g, ''), // Strip leading slash
  ].join('/');

  return fetch(url, {
    headers: heads,
    method,
    body,
  })
    .then(r => r.json())
    .then(({ data, error }) => {
      if (error) return Promise.reject(error);
      return data;
    });
}

/** Perform a GET request */
export function get({ endpoint }) {
  return apiRequest({ endpoint, method: 'GET' });
}

/** Perform a POST request */
export function post(args) {
  const { body, contentType = 'application/json' } = args;
  return apiRequest({
    ...args,
    method: 'POST',
    heads: { 'Content-Type': contentType },
    body: contentType === 'application/json' ? JSON.stringify(body) : body,
  });
}
