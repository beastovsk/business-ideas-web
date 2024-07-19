import {getCookie} from 'cookies-next';

export const getAllOperations = async ({isLatest}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/operation/getAllOperations?isLatest=${isLatest}`, {
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