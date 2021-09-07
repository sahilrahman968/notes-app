console.log('notes app welcome')
showNotes()
//if user adds a note, add it to to the local storage
let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', function (e) {
  let addTxt = document.getElementById('addTxt')
  let notes = localStorage.getItem('notes')
  if (notes == null) {
    notesObj = []
  } else {
    notesObj = JSON.parse(notes)
  }
  if (addTxt.value != '') {
    notesObj.push(addTxt.value)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addTxt.value = ''
    console.log(notesObj)
  } else {
    alert('Please add a valid note')
  }

  showNotes()
})

//function to show elements from local storage
function showNotes() {
  let notes = localStorage.getItem('notes')
  if (notes == null) {
    notesObj = []
  } else {
    notesObj = JSON.parse(notes)
  }
  let html = ''
  notesObj.forEach(function (element, index) {
    html += ` <div class="noteCard card my-2 mx-2" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          </div>
        </div>`
  })
  let notesElem = document.getElementById('notes')
  if (notesObj.length != 0) {
    notesElem.innerHTML = html
  } else {
    notesElem.innerHTML = `You have not added any notes`
  }
}

//function to delete a note
function deleteNote(index) {
  let notes = localStorage.getItem('notes')
  if (notes == null) {
    notesObj = []
  } else {
    notesObj = JSON.parse(notes)
  }
  notesObj.splice(index, 1)
  //localStorage.removeItem('notes')
  localStorage.setItem('notes', JSON.stringify(notesObj))
  showNotes()
}

let search = document.getElementById('searchTxt')
search.addEventListener('input', function () {
  let inputVal = search.value.toLowerCase()
  console.log('input event fired', inputVal)
  let noteCards = document.getElementsByClassName('noteCard') //noteCards is a collection but not an array
  /* console.log(noteCards) */
  Array.from(noteCards).forEach((element) => {
    //console.log(element)
    let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase()
    /*console.log(cardTxt, typeof cardTxt) //this is collection elements with "p" tag*/
    if (cardTxt.includes(inputVal)) {
      element.style.display = 'block'
    } else {
      element.style.display = 'none'
    }
  })
})
