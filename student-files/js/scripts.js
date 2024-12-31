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

  const person = {
    firstName: getFirstName,
    lastName: getLastName,
    email: getEmail,
    city: getCity,
    state: getState,
    picture: getPhoto,
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
  });
  console.log(persons);
}

fetchPersonsData(12);
