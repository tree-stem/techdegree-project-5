// Created a DOM element to append each user element
const gallery = document.getElementById("gallery");

// Created a function that makes a promise to return the users information
async function getPersonsData(count) {
  const response = await fetch(
    `https://randomuser.me/api/?results=${count}&nat=us`
  ).then((response) => response.json());

  return response.results;
}

// Created a function that collects user data and displays it in html through interpolation
async function displayPersonsData(count) {
  const userNames = [];
  console.log(userNames);
  const users = await getPersonsData(count);

  users.map((user) => {
    const html = `
      <div class="card">
        <div class="card-img-container">
          <img class="card-img" src="${user.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
      </div>
      `;

    gallery.insertAdjacentHTML("beforeend", html);

    const card = gallery.querySelector(".card:last-child");

    card.addEventListener("click", () => {
      const modal = document.createElement("div");
      const birthday = user.dob.date;
      const birthdayDisplay = `
      ${birthday.slice(5, 7)}/${birthday.slice(8, 10)}/${birthday.slice(0, 4)}
      `;

      const modalHTML = `
        <div class="modal-container">
          <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
              <img class="modal-img" src="${user.picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
              <p class="modal-text">${user.email}</p>
              <p class="modal-text cap">${user.location.city}</p>
              <hr>
              <p class="modal-text">${user.cell}</p>
              <p class="modal-text">${user.location.street["number"]} ${user.location.street["name"]}, ${user.location.state}, ${user.nat} ${user.location.postcode}</p>
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
    const userFullName = `${user.name["first"]} ${user.name["last"]}`;
    userNames.push(userFullName);
  });
  const namesLowerCase = userNames.map((name) => {
    return name.toLowerCase();
  });
  handleSearch(namesLowerCase, userNames, users);
}

const searchInput = document.getElementById("search-input");

function handleSearch(namesLowerCase, userNames, users) {
  searchInput.addEventListener("input", () => {
    const searchedName = searchInput.value.toLowerCase();

    const filteredUsers = users.filter((user, index) =>
      namesLowerCase[index].includes(searchedName)
    );

    gallery.innerHTML = "";

    filteredUsers.forEach((user) => {
      const html = `
        <div class="card">
          <div class="card-img-container">
            <img class="card-img" src="${user.picture.large}" alt="profile picture">
          </div>
          <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
          </div>
        </div>
      `;

      gallery.insertAdjacentHTML("beforeend", html);

      const card = gallery.querySelector(".card:last-child");

      card.addEventListener("click", () => {
        const modal = document.createElement("div");
        const birthday = user.dob.date;
        const birthdayDisplay = `
      ${birthday.slice(5, 7)}/${birthday.slice(8, 10)}/${birthday.slice(0, 4)}
      `;

        const modalHTML = `
        <div class="modal-container">
          <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
              <img class="modal-img" src="${user.picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
              <p class="modal-text">${user.email}</p>
              <p class="modal-text cap">${user.location.city}</p>
              <hr>
              <p class="modal-text">${user.cell}</p>
              <p class="modal-text">${user.location.street["number"]} ${user.location.street["name"]}, ${user.location.state}, ${user.nat} ${user.location.postcode}</p>
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
  });
}

// Calls function to generate and display users using a desired count
displayPersonsData(12);
