import { NotificationManager } from 'react-notifications';

const API_BASE_URL = 'http://localhost:8000';

export function fetchSubjectsApi() {
  return fetch(`${API_BASE_URL}/subject/`)
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
      NotificationManager.error('There was an error fetching subjects.', 'Error');
      console.error(error);
    });
}

export function createSubjectApi(subject) {
  return fetch(`${API_BASE_URL}/subject/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subject)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Status Code Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      NotificationManager.success('Subject created successfully!', 'Success');
      return data;
    })
    .catch(error => {
      NotificationManager.error('There was an error creating the subject.', 'Error');
      console.error(error);
    });
}

export function deleteSubjectApi(subjectId) {
  return fetch(`${API_BASE_URL}/subject/${subjectId}/`, {
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
      NotificationManager.success('Subject deleted successfully!', 'Success');
    })
    .catch(error => {
      NotificationManager.error('There was an error deleting the subject.', 'Error');
      console.error(error);
    });
}

export function editSubjectApi(subjectId, updatedSubject) {
  return fetch(`${API_BASE_URL}/subject/${subjectId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedSubject)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Status Code Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      NotificationManager.success('Subject updated successfully!', 'Success');
      return data;
    })
    .catch(error => {
      NotificationManager.error('There was an error updating the subject.', 'Error');
      console.error(error);
    });
}
