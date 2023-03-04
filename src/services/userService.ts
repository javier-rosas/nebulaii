const authApi = process.env.AWS_AUTHENTICATION_API

export async function authenticateUser(userData: any) {
  return fetch(`${authApi}/authenticate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to authenticate user');
      }
      return response.json();
    })
    .then((data) => {
      console.log('From the backend', data.token);
      return data.token;
    })
    .catch((error) => {
      throw error;
    });
}