// Created a DOM element to append each user element
const gallery = document.getElementById("gallery");

// Created a function that makes a promise to return the users information
async function getPersonsData(count) {
  const response = await fetch(
    `https://randomuser.me/api/?results=${count}`
  ).then((response) => response.json());

  console.log(response.results);
  return response.results;
}

// Created a function that collects user data and displays it in html through interpolation
async function displayPersonsData(count) {
  const persons = await getPersonsData(count);
  persons.map((person) => {
    const html = `
      <div class="card">
        <div class="card-img-container">
          <img class="card-img" src="${person.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
          <p class="card-text">${person.email}</p>
          <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>
      </div>
      `;

    gallery.insertAdjacentHTML("beforeend", html);

    const card = gallery.querySelector(".card:last-child");

    card.addEventListener("click", () => {
      const modal = document.createElement("div");
      const birthday = person.dob.date;
      console.log(birthday);
      const birthdayDisplay = `
      ${birthday.slice(5, 7)}/${birthday.slice(8, 10)}/${birthday.slice(0, 4)}
      `;

      const modalHTML = `
        <div class="modal-container">
          <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
              <img class="modal-img" src="${person.picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
              <p class="modal-text">${person.email}</p>
              <p class="modal-text cap">${person.location.city}</p>
              <hr>
              <p class="modal-text">${person.cell}</p>
              <p class="modal-text">${person.location.street["number"]} ${person.location.street["name"]}, ${person.location.state}, ${person.nat} ${person.location.postcode}</p>
              <p class="modal-text">Birthday: ${birthdayDisplay}</p>
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

// Calls function to generate and display users using a desired count
displayPersonsData(12);
