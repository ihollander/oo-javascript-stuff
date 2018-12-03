class Toy {
  constructor(toyJSON) {
    this.id = toyJSON.id
    this.name = toyJSON.name
    this.image = toyJSON.image
    this.likes = toyJSON.likes
    Toy.all.push(this)
  }

  // updating the number of likes
  // updating local data
  // updating API
  updateLikes() {
    this.likes++
    return Toy.adapter.patch(this.id, { likes: this.likes })
  }

  renderCard() {
    return `<div class="card">
              <h2>${this.name}</h2>
              <img src="${this.image}" class="toy-avatar" />
              <p>${this.likes} Likes </p>
              <button data-id="${this.id}" class="like-btn">Like <3</button>
            </div>`
  }

  static create(toyObject) {
    return Toy.adapter.post(toyObject)
      .then(toyJSON => {
        new Toy(toyJSON)
      })
  }

  static find(id) {
    return Toy.all.find(t => t.id == id)
  }

  static renderAll() {
    return Toy.all.map(t => t.renderCard()).join('')
  }

  static populateFromAPI() {
    return Toy.adapter.getAll()
      .then(toyObjects => {
        toyObjects.forEach(toyObject => {
          new Toy(toyObject)
        })
      })
  }
}

Toy.all = []
Toy.adapter = new JSONAPIAdapter('http://localhost:3000/toys')

// Kids class
// Kids.adapter = new JSONA...