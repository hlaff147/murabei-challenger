import { NotificationManager } from 'react-notifications';
import { API_BASE_URL } from '../apiConfig';


export function fetchBook() {
  return fetch(`${API_BASE_URL}/book/`)
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
      NotificationManager.error('There was an error fetching books.', 'Error');
      console.error(error);
    });
}

export function createBook(book) {
  return fetch(`${API_BASE_URL}/book/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Status Code Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      NotificationManager.success('Book created successfully!', 'Success');
      return data;
    })
    .catch(error => {
      NotificationManager.error('There was an error creating the book.', 'Error');
      console.error(error);
    });
}

export function deleteBookApi(bookId) {
  return fetch(`${API_BASE_URL}/book/${bookId}/`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Status Code Error: ${response.status}`);
      }
      // Retorne a promessa sem chamar `response.json()`
      return response;
    })
    .then(() => {
      NotificationManager.success('Book deleted successfully!', 'Success');
    })
    .catch(error => {
      NotificationManager.error('There was an error deleting the book.', 'Error');
      console.error(error);
    });
}

export function editBookApi(bookId, updatedBook) {
  return fetch(`${API_BASE_URL}/book/${bookId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedBook)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Status Code Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      NotificationManager.success('Book updated successfully!', 'Success');
      return data;
    })
    .catch(error => {
      NotificationManager.error('There was an error updating the book.', 'Error');
      console.error(error);
    });
}
