document.addEventListener('DOMContentLoaded', () => {
  const toyHolder = document.getElementById('toy-collection')
  const toyForm = document.querySelector('.add-toy-form')

  toyForm.addEventListener('submit', event => {
    event.preventDefault()
    const toyObject = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }
    Toy.create(toyObject) // create a new toy locally AND save it to the API
      .then(() => {
        toyHolder.innerHTML = Toy.renderAll()
      })
  })

  toyHolder.addEventListener('click', event => {
    if (event.target.className === "like-btn") {
      debugger
      const toyId = event.target.dataset.id
      const toy = Toy.find(toyId)
      toy.updateLikes()
        .then(() => {
          toyHolder.innerHTML = Toy.renderAll()
        })
      // lazy way:
      // find the toy card
      // toy.renderCard()
    }
  })

  Toy.populateFromAPI()
    .then(() => {
      toyHolder.innerHTML = Toy.renderAll()
    })

})