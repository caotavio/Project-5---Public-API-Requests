/*
Uses the fetch api to request the data from the server.
The query string in the url is for determining the 12 cards and for faster
loading purpuses since it only fetches the selected data.
*/
fetch('https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob&noinfo&nat=us,br,gb,ie')
// Returns the raw data in json format
  .then(response => response.json())
// Calls the funcions created after the data loads
  .then(data => {
    createEmployeeCards(data.results);
    openClickedModal(data.results);
  });

// Creates random employee cards from the api data and append the cards to the dom
function createEmployeeCards(allData) {
  $.each(allData, (index, data) => {
    const employeeCard = `<div class="card">
                            <div class="card-img-container">
                                <img class="card-img" src="${data.picture.large}" alt="profile picture">
                            </div>
                            <div class="card-info-container">
                                <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                                <p class="card-text">${data.email}</p>
                                <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
                            </div>
                          </div>`;
    $('#gallery').append(employeeCard);
  });
}

// Creates a modal window and displays it
function createModalWindow(employee, displayedCards) { //the 2nd parameter represents the 12 random cards from the previous function
  const employeeModal = `<div class="modal-container">
                            <div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${employee.name.first}</h3>
                                    <p class="modal-text">${employee.email}</p>
                                    <p class="modal-text cap">${employee.location.city}</p>
                                    <hr>
                                    <p class="modal-text">${employee.cell}</p>
                                    <p class="modal-text cap">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                                    <p class="modal-text">Birthday: ${formatDate(employee.dob.date)}</p>
                                </div>
                            </div>
                         </div>`;
    $('body').append(employeeModal);
    closeModal();
}

// Opens the modal window created with the previous function, corresponding to any of the clicked cards
function openClickedModal(displayedCards) {
  const allCards = $('.card');
  for (let i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener('click', () => {
      let clickedCard = displayedCards[i];
      createModalWindow(clickedCard, displayedCards);
    });
  }
}

// closes the modal window by removing the container when the close button is clicked
function closeModal() {
  const closeButton = $('#modal-close-btn');
  const activeModal = $('.modal-container');
  closeButton.on('click', () => {
    activeModal.remove();
  });
}

// formats the given date form the api to standart U.S. date... MM/DD/YYYY
function formatDate(dob) {
  let date = new Date(dob);
  return date.toLocaleDateString('en-US');
}
