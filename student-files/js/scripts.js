const gallery = document.getElementById("gallery");

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
  const getPhone = results.phone;

  const person = {
    firstName: getFirstName,
    lastName: getLastName,
    email: getEmail,
    city: getCity,
    state: getState,
    picture: getPhoto,
    phone: getPhone,
  };

  return person;
}

async function fetchPersonsData(count) {
  const persons = [];

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
              <p class="modal-text">${person.phone}</p>
              <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
              <p class="modal-text">Birthday: 10/21/2015</p>
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
  console.log(persons);
}

fetchPersonsData(12);
