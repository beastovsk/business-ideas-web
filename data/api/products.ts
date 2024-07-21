import {getCookie} from 'cookies-next';

export const generateProduct = async (body) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/generateProduct`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'POST',
    body: JSON.stringify(body)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const getAllProducts = async ({isLatest}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/getAllProducts?isLatest=${isLatest}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'GET'
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const getProductById = async ({id}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/getProductById/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'GET'
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const deleteProductById = async ({id}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/deleteProductById/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'DELETE'
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const updateProduct = async (body) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/updateProduct`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'POST',
    body: JSON.stringify(body)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};
