const API_BASE_URL = 'http://localhost:8000';  // Use seu próprio URL base da API aqui

export function fetchAuthors() {
    return fetch(`${API_BASE_URL}/author/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Status Code Error: ${response.status}`);
        }
        return response.json();
      })
  }