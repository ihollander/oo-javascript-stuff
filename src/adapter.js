class JSONAPIAdapter {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  getAll() {
    return this.makeRequest(this.baseUrl, {
      method: 'GET'
    })
  }

  // { likes: 10 }
  post(javascriptObject) {
    return this.makeRequest(`${this.baseUrl}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(javascriptObject)
    })
  }

  // { likes: 10 }
  patch(id, javascriptObject) {
    return this.makeRequest(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(javascriptObject)
    })
  }

  makeRequest(endpoint, parameters) {
    return fetch(endpoint, parameters)
      .then(r => {
        return r.json()
      })
  }
}