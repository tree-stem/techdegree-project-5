// Created a DOM element to append each user element
const gallery = document.getElementById("gallery");

// Created a function that makes a promise to return the users information
async function getPersonData() {
  const response = await fetch("https://randomuser.me/api/").then((response) =>
    response.json()
  );

  const results = response.results[0];
  const getFirstName = results.name["first"];
  const getLastName = results.name["last"];
  const getEmail = results.email;
  const getCity = results.location["city"];
  const getState = results.location["state"];
  const getPhoto = results.picture["large"];
  const getCell = results.cell;
  const getDOB = results.dob["date"];
  const getStreet = results.location["street"];
  const getNat = results.nat;
  const getPostcode = results.location["postcode"];

  const person = {
    firstName: getFirstName,
    lastName: getLastName,
    email: getEmail,
    city: getCity,
    state: getState,
    picture: getPhoto,
    cell: getCell,
    dob: getDOB,
    street: getStreet,
    nat: getNat,
    postcode: getPostcode,
  };

  return person;
}

// Created a function that collects user data and displays it in html through interpolation
async function fetchPersonsData(count) {
  const persons = [];

  // Loops through each user created and makes a promise to fetch information
  for (let i = 1; i <= count; i++) {
    const data = await getPersonData();
    persons.push(data);
  }

  persons.map((person) => {
    const html = `
      <div class="card">
        <div class="card-img-container">
          <img class="card-img" src="${person.picture}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${person.firstName} ${person.lastName}</h3>
          <p class="card-text">${person.email}</p>
          <p class="card-text cap">${person.city}, ${person.state}</p>
        </div>
      </div>
      `;

    gallery.insertAdjacentHTML("beforeend", html);

    const card = gallery.querySelector(".card:last-child");

    card.addEventListener("click", () => {
      const modal = document.createElement("div");

      const modalHTML = `
        <div class="modal-container">
          <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
              <img class="modal-img" src="${person.picture}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${person.firstName} ${person.lastName}</h3>
              <p class="modal-text">${person.email}</p>
              <p class="modal-text cap">${person.city}</p>
              <hr>
              <p class="modal-text">${person.cell}</p>
              <p class="modal-text">${person.street["number"]} ${person.street["name"]}, ${person.state}, ${person.nat} ${person.postcode}</p>
              <p class="modal-text">Birthday: ${person.dob.slice(8, 10)}/${person.dob.slice(5, 7)}/${person.dob.slice(0, 4)}</p>
            </div>
        </div>`;

      modal.insertAdjacentHTML("beforeend", modalHTML);
      gallery.appendChild(modal);

      const closeButton = document.getElementById("modal-close-btn");

      closeButton.addEventListener("click", (event) => {
        gallery.removeChild(modal);
      });
    });
  });
}

// Calls function to generate desired user count 
fetchPersonsData(12);
