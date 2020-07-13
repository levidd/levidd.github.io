//Attach a event listenser to the submit button
// get each item in the form section
//make a card
// push the card in the cardshow section

document
  .querySelector("#destination_form")
  .addEventListener("submit", addNewDestinationCard);

function addNewDestinationCard(event) {
  event.preventDefault();
  document.getElementById("cards_show").appendChild(createNewCard());
}

function createNewCard() {
  const card = document.createElement("div");
  card.setAttribute("class", "card");

  const card_image = makeCardImage();
  const card_body = makeCardBody();

  card.appendChild(card_image);
  card.appendChild(card_body);

  let formElements = [
    document.getElementById("photo_url"),
    document.getElementById("destination_name"),
    document.getElementById("location"),
    document.getElementById("description"),
  ];

  setCardDetails(card, ...formElements.map((item) => item.value));

  formElements.forEach((item) => (item.value = "")); // clear the input forms

  return card;
}

function makeCardImage() {
  const card_image = document.createElement("img");
  card_image.setAttribute("class", "card-img-top");
  card_image.setAttribute("name", "card_image_url");
  card_image.setAttribute("alt", "Destination image supplied");
  return card_image;
}

function makeCardBody() {
  const title = document.createElement("h4");
  title.setAttribute("class", "card-title");

  const location = document.createElement("p");
  location.setAttribute("class", "text-muted");

  const description = document.createElement("p");

  const cardbody = document.createElement("div");
  cardbody.setAttribute("class", "card-body");

  const edit_button = document.createElement("button");
  edit_button.setAttribute("class", "btn btn-warning");
  edit_button.innerText = "Edit";
  edit_button.addEventListener("click", (e) =>
    updateCard(e.target.parentElement.parentElement)
  );

  const delete_button = document.createElement("button");
  delete_button.setAttribute("class", "btn btn-danger");
  delete_button.innerText = "Delete";
  delete_button.addEventListener("click", deleteCard);

  cardbody.appendChild(title);
  cardbody.appendChild(location);
  cardbody.appendChild(description);
  cardbody.appendChild(edit_button);
  cardbody.appendChild(delete_button);

  return cardbody;
}

function deleteCard(event) {
  let card = event.target.parentElement.parentElement;
  card.remove();
}

function updateCard(card) {
  const titleText = prompt("new title");
  const locationText = prompt("new location");
  const imageURL = prompt("new image URL");
  const descriptionText = prompt("new description");
  setCardDetails(card, imageURL, titleText, locationText, descriptionText);
}

function setCardDetails(
  card,
  imageURL,
  titleText,
  locationText,
  descriptionText
) {
  card.getElementsByTagName("img")[0].setAttribute("src", imageURL);
  card.getElementsByTagName("h4")[0].innerText = titleText;
  card.getElementsByTagName("p")[0].innerText = locationText;
  card.getElementsByTagName("p")[1].innerText = descriptionText;
}
