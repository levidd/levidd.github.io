//Attach a event listenser to the submit button
// get each item in the form section
//make a card
// push the card in the cardshow section

// placeholder image if none supplied.
const placeholder_image =
  "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";

// add listener to submit event
document
  .querySelector("#destination_form")
  .addEventListener("submit", addNewDestinationCard);

// function to do when submit has happened
function addNewDestinationCard(event) {
  event.preventDefault(); // stop page from refreshing
  document.getElementById("cards_show").appendChild(createNewCard()); // make a card and place on page
  updateBanner();
}

// create html of card and update its inner contents
function createNewCard() {
  const card = document.createElement("div"); // outer card container
  card.setAttribute("class", "card card-position");

  const card_image = makeCardImage(); // image portion
  const card_body = makeCardBody(); // body portion (text)

  card.appendChild(card_image);
  card.appendChild(card_body);

  // get the form inputs
  let formElements = [
    document.getElementById("photo_url"),
    document.getElementById("destination_name"),
    document.getElementById("location"),
    document.getElementById("description"),
  ];

  if (formElements[0].value === "") {
    // check if image url was supplied.
    formElements[0].value = placeholder_image;
  }

  // update inner html portion of the card with details
  setCardDetails(card, ...formElements.map((item) => item.value));

  formElements.forEach((item) => (item.value = "")); // clear the input forms

  return card;
}

// this makes the image html portion of a card
function makeCardImage() {
  const card_image = document.createElement("img");
  card_image.setAttribute("class", "card-img-top");
  card_image.setAttribute("name", "card_image_url");
  card_image.setAttribute("alt", "Destination image supplied");
  return card_image;
}

// this makes the body html portion of a card
function makeCardBody() {
  const title = document.createElement("h4");
  title.setAttribute("class", "card-title");

  const location = document.createElement("p");
  location.setAttribute("class", "text-muted");

  const description = document.createElement("p");

  const cardbody = document.createElement("div");
  cardbody.setAttribute("class", "card-body");

  const buttons = document.createElement("div");
  buttons.setAttribute("class", "card-buttons");

  const edit_button = document.createElement("button");
  edit_button.setAttribute("class", "btn btn-warning");
  edit_button.innerText = "Edit";
  edit_button.addEventListener("click", (e) =>
    updateCard(e.target.parentElement.parentElement.parentElement)
  );

  const delete_button = document.createElement("button");
  delete_button.setAttribute("class", "btn btn-danger delete-button");
  delete_button.innerText = "Remove";
  delete_button.addEventListener("click", deleteCard);

  buttons.appendChild(edit_button);
  buttons.appendChild(delete_button);

  cardbody.appendChild(title);
  cardbody.appendChild(location);
  cardbody.appendChild(description);
  cardbody.appendChild(buttons);

  return cardbody;
}

// function for card to remove itself
function deleteCard(event) {
  let card = event.target.parentElement.parentElement.parentElement;
  card.remove();
  updateBanner();
}

// function for card to update its contents.
function updateCard(card) {
  const titleText = prompt("new title");
  const locationText = prompt("new location");
  let imageURL = prompt("new image URL");
  const descriptionText = prompt("new description");

  if (imageURL === "") {
    // no new image, use old one.
    imageURL = card.getElementsByTagName("img")[0].src;
  }
  setCardDetails(card, imageURL, titleText, locationText, descriptionText);
}

// set the inner html tags with the details.
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

function updateBanner() {
  // update the card banner
  const title = document.getElementById("title");
  const destination_cards = document.getElementById("destination-cards");
  if (destination_cards.lastElementChild.childElementCount > 0) {
    title.innerText = "Wishlist";
  } else {
    title.innerText = "Enter destination details";
  }
}
