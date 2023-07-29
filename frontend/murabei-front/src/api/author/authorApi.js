import { NotificationManager } from 'react-notifications';
import { API_BASE_URL } from '../apiConfig';


export function fetchAuthors() {
  return fetch(`${API_BASE_URL}/author/`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Status Code Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      NotificationManager.error('There was an error fetching authors.', 'Error');
      console.error(error);
    });
}

export function createAuthor(author) {
  return fetch(`${API_BASE_URL}/author/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(author)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Status Code Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      NotificationManager.success('Author created successfully!', 'Success');
      return data;
    })
    .catch(error => {
      NotificationManager.error('There was an error creating the author.', 'Error');
      console.error(error);
    });
}

export function deleteAuthor(authorId) {
  return fetch(`${API_BASE_URL}/author/${authorId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Status Code Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      NotificationManager.success('Author deleted successfully!', 'Success');
      return data;
    })
    .catch(error => {
      NotificationManager.error('There was an error deleting the author.', 'Error');
      console.error(error);
    });
}

export function editAuthorApi(authorId, updatedAuthor) {
  return fetch(`${API_BASE_URL}/author/${authorId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedAuthor)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Status Code Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      NotificationManager.success('Author updated successfully!', 'Success');
      return data;
    })
    .catch(error => {
      NotificationManager.error('There was an error updating the author.', 'Error');
      console.error(error);
    });
}
