import {deleteCookie, getCookie} from 'cookies-next';

export const ChangeEmail = async (args: {currentEmail: string; newEmail: string; password: string}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/changeEmail`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'POST',
    body: JSON.stringify(args)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const ChangePassword = async (args: {password: string; currentPassword: string}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/changePassword`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'POST',
    body: JSON.stringify(args)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const GetUser = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUser`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'GET'
  }).then((data) => {
    if (!data.ok) {
      localStorage.removeItem('email');
      deleteCookie('token');
      return;
    }
    return data.json();
  });
};

export const CreateTransaction = async (args: {
  paymentMethod: string;
  fullName: string;
  amount: string;
  phoneNumber: string;
}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/createTransaction`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'POST',
    body: JSON.stringify(args)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};
export const ConfirmTransaction = async (args: {uuid: string; paymentMethod: string; amount: string}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/confirmTransaction`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    method: 'POST',
    body: JSON.stringify(args)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};
