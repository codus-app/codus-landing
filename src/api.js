/* eslint-disable object-curly-newline, import/prefer-default-export */
/* global CODUS_API_BASE */
async function apiRequest({ endpoint, method, heads, body, signal }) {
  const url = [
    CODUS_API_BASE.replace(/\/$/g, ''), // Strip trailing slash
    endpoint.replace(/^\//g, ''), // Strip leading slash
  ].join('/');

  return fetch(url, {
    headers: heads,
    method,
    body,
    signal,
  })
    .then(r => r.json())
    .then(({ data, error }) => {
      if (error) return Promise.reject(error);
      return data;
    });
}

/** Perform a GET request and return a promise */
export function get({ endpoint, signal }) {
  return apiRequest({ endpoint, method: 'GET', signal });
}
