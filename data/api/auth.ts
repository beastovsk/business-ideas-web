export const LoginRequest = async (data) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const RegRequest = async (data) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

export const ConfirmEmail = async (args: {confirmToken: string}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/confirmEmail`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(args)
  }).then((data) => {
    if (!data.ok) return;
    return data.json();
  });
};

// export const SendResetCode = async (args: {email: string}) => {
//   return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sendResetCode`, {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     method: 'POST',
//     body: JSON.stringify(args)
//   }).then((data) => {
//     if (!data.ok) return;
//     return data.json();
//   });
// };

// export const ResetPassword = async (args: {password: string; confirmToken: string}) => {
//   return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resetPassword`, {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     method: 'POST',
//     body: JSON.stringify(args)
//   }).then((data) => {
//     if (!data.ok) return;
//     return data.json();
//   });
// };
