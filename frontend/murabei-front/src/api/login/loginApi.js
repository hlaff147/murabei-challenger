import { NotificationManager } from "react-notifications";
import { API_BASE_URL } from '../apiConfig';


export function loginApi(credentials) {
    return fetch(`${API_BASE_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Status Code Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        NotificationManager.success('Logged in successfully!', 'Success');
        return data;
      })
      .catch(error => {
        NotificationManager.error('There was an error during the login.', 'Error');
        console.error(error);
      });
  }