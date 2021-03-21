import React, { useCallback, useState } from 'react';

export const useHttp = () => {
  const request = async (url, method, headers, body) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        method,
        body
      });
      const json = await response.json();
      return json;
    } catch (e) {
      console.error(e);
    }
  }

  const get = async url => {
    const result = await request(url, 'GET');
    return result;
  }

  const post = async (url, body) => {
    const result = await request(url, 'POST', { }, JSON.stringify(body));
    return result;
  }

  const patch = async (url, body) => {
    const result = await request(url, 'PATCH', { }, JSON.stringify(body));
    return result;
  }

  const del = async (url, body) => {
    const result = await request(url, 'DELETE', { }, JSON.stringify(body));
    return result;
  }

  return { request, get, post, patch, del };
};
