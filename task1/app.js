let allProducts = [];
let currentProducts = [];
const root = document.querySelector("#root");

// create the header
function createHeader() {
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  h1.textContent = "Shoe Store"; // web name

  // Style the header
  header.style.marginLeft = "30px";
  header.style.width = "100%";
  header.style.position = "relative";

  // Style the h1
  h1.style.fontSize = "48px";
  h1.style.color = "#2D3E50";
  h1.style.fontWeight = "bold";
  h1.style.fontFamily = "'Poppins', sans-serif";
  h1.style.textTransform = "uppercase";
  h1.style.letterSpacing = "4px";
  h1.style.textShadow = "3px 3px 5px rgba(0, 0, 0, 0.1)";

  // Style  the h2
  const h2 = document.createElement("h2");
  h2.textContent = "The Best Footwear for Every Occasion";
  h2.style.fontSize = "22px";
  h2.style.color = "#2D3E50";
  h2.style.fontWeight = "300";
  h2.style.fontFamily = "'Poppins', sans-serif";
  h2.style.marginTop = "10px";
  h2.style.textTransform = "capitalize";
  h2.style.letterSpacing = "2px";

  h1.appendChild(h2);
  header.appendChild(h1);
  root.appendChild(header);
}

// Function to style the root and body
function applyGlobalStyles() {
  document.body.style.margin = 0;
  document.body.style.fontFamily = "Arial, sans-serif";
  document.body.style.backgroundColor = "#f4f4f4";

  root.style.display = "flex";
  root.style.flexWrap = "wrap";
  root.style.gap = "20px";
  root.style.justifyContent = "center";
  // root.style.padding = "20px";
}

// Create the search bar
function createSearchBar(products) {
  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.textAlign = "center";
  // container.style.margin = "20px 0";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search for a product by name...";
  searchInput.style.padding = "10px";
  searchInput.style.width = "60%";
  searchInput.style.fontSize = "16px";
  searchInput.style.marginRight = "10px";
  searchInput.style.borderRadius = "10px";
  // Search Button
  const searchButton = document.createElement("button");
  searchButton.textContent = "Search";
  searchButton.style.padding = "10px 20px";
  searchButton.style.fontSize = "16px";
  searchButton.style.backgroundColor = "#ff6f61";
  searchButton.style.color = "#fff";
  searchButton.style.border = "none";
  searchButton.style.borderRadius = "5px";
  searchButton.style.cursor = "pointer";
  searchButton.style.marginRight = "10px";

  // Add search functionality
  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    currentProducts = products.filter(
      (product) => product.title.toLowerCase() === searchTerm
    );

    if (currentProducts.length > 0) {
      renderCards(currentProducts);
    } else {
      alert("No product found with the given name.");
    }
  });

  container.appendChild(searchInput);
  container.appendChild(searchButton);

  root.appendChild(container);
}

//  Function for filter Product.
function filterProcucts(products) {
  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.textAlign = "center";
  container.style.margin = "20px 0";

  const allProductsButton = createFilterButton("All Products", () => {
    renderCards(allProducts); // Restore all products
  });

  function filterButtons(category) {
    return createFilterButton(category, () => {
      console.log(category);
      currentProducts = products.filter((product) => product.title === category);
      renderCards(currentProducts);
    });
  }
  const category1Button = filterButtons("Nike");
  const category2Button = filterButtons("Adidas");
  const category3Button = filterButtons("Puma");

  const sortDropdown = document.createElement("select");
  sortDropdown.style.padding = "10px";
  sortDropdown.style.fontSize = "16px";
  sortDropdown.style.marginLeft = "10px";
  sortDropdown.style.borderRadius = "5px";
  sortDropdown.style.color = "#2D3E50";
  sortDropdown.style.borderColor = "#2D3E50";
  sortDropdown.style.fontWeight = "bold";

  // Add options to the dropdown
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Sort By...";
  defaultOption.value = "";
  sortDropdown.appendChild(defaultOption);

  const priceGroup = document.createElement("optgroup");
  priceGroup.label = "Sort by Price";

  const lowToHighOption = document.createElement("option");
  lowToHighOption.textContent = "Low to High";
  lowToHighOption.value = "priceLowToHigh";
  priceGroup.appendChild(lowToHighOption);

  const highToLowOption = document.createElement("option");
  highToLowOption.textContent = "High to Low";
  highToLowOption.value = "priceHighToLow";
  priceGroup.appendChild(highToLowOption);

  sortDropdown.appendChild(priceGroup);

  const alphaGroup = document.createElement("optgroup");
  alphaGroup.label = "Sort by Alphabet";

  const aToZOption = document.createElement("option");
  aToZOption.textContent = "A-Z";
  aToZOption.value = "alphaAToZ";
  alphaGroup.appendChild(aToZOption);

  const zToAOption = document.createElement("option");
  zToAOption.textContent = "Z-A";
  zToAOption.value = "alphaZToA";
  alphaGroup.appendChild(zToAOption);

  sortDropdown.appendChild(alphaGroup);

  sortDropdown.addEventListener("change", () => {
    const selectedValue = sortDropdown.value;
    let sortedProducts = [];

    if (selectedValue === "priceLowToHigh") {
      sortedProducts = [...currentProducts].sort((a, b) => a.price - b.price);
    } else if (selectedValue === "priceHighToLow") {
      sortedProducts = [...currentProducts].sort((a, b) => b.price - a.price);
    } else if (selectedValue === "alphaAToZ") {
      sortedProducts = [...currentProducts].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (selectedValue === "alphaZToA") {
      sortedProducts = [...currentProducts].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    if (sortedProducts.length > 0) {
      renderCards(sortedProducts);
    }
  });

  container.appendChild(allProductsButton);
  container.appendChild(category1Button);
  container.appendChild(category2Button);
  container.appendChild(category3Button);
  container.appendChild(sortDropdown);
  container.appendChild(sortDropdown);

  root.appendChild(container);
}
// Helper function to create filter buttons
function createFilterButton(label, onClick) {
  const button = document.createElement("button");
  button.textContent = label;
  button.style.padding = "10px 20px";
  button.style.fontSize = "16px";
  button.style.backgroundColor = "#2D3E50";
  button.style.color = "#fff";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.margin = "0 5px";
  button.style.transition = "background-color 0.3s";

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#1A2739";
  });

  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "#2D3E50";
  });

  button.addEventListener("click", onClick);

  return button;
}
// Function to create a card
function createCard(item) {
  const card = document.createElement("div");
  card.className = "card";

  // Style the card
  card.style.backgroundColor = "#fff";
  card.style.borderRadius = "8px";
  card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  card.style.overflow = "hidden";
  card.style.width = "18%";
  card.style.minWidth = "250px";

  // Create and style elements
  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.title;
  img.style.width = "100%";
  img.style.height = "200px";
  img.style.objectFit = "cover";

  const title = document.createElement("h2");
  title.textContent = `${item.title}`;
  title.style.fontWeight = "bold";
  title.style.fontFamily = "'Poppins', sans-serif";
  title.style.textTransform = "uppercase";
  title.style.letterSpacing = "4px";
  title.style.textShadow = "3px 3px 5px rgba(0, 0, 0, 0.1)";
  title.style.fontSize = "18px";
  title.style.margin = "15px";
  title.style.color = "#333";

  const price = document.createElement("div");
  price.textContent = ` $ ${item.price}`;
  price.style.fontWeight = "bold";
  price.style.fontSize = "16px";
  price.style.margin = "15px";
  price.style.color = "#ff6f61";

  const quantity = document.createElement("div");
  quantity.style.fontWeight = "bold";
  quantity.style.fontSize = "14px";
  quantity.style.margin = "15px";
  quantity.style.color = item.quantity > 0 ? "#28a745" : "#dc3545";
  quantity.textContent =
    item.quantity > 0 ? `Qty: ${item.quantity}` : "Out of Stock";

  const addToCartButton = createAddToCartButton();
  const { descriptionToggle, description } = createDescriptionToggle(
    item.description
  );

  // Append elements to card
  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(quantity);
  card.appendChild(addToCartButton);
  card.appendChild(descriptionToggle);
  card.appendChild(description);

  return card;
}

// Function to create "Add to Cart" button
function createAddToCartButton() {
  const button = document.createElement("button");
  button.textContent = "Add to Cart";
  button.style.backgroundColor = "#ff6f61";
  button.style.color = "#fff";
  button.style.border = "none";
  button.style.padding = "10px 20px";
  button.style.margin = "10px 15px";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.fontSize = "14px";
  button.style.transition = "background-color 0.3s";

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#e55a4e";
  });
  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "#ff6f61";
  });

  return button;
}

// Function to create description toggle
function createDescriptionToggle(descriptionText) {
  const descriptionToggle = document.createElement("button");
  descriptionToggle.textContent = "DES ▼";
  descriptionToggle.style.backgroundColor = "#f4f4f4";
  descriptionToggle.style.color = "#ff6f61";
  descriptionToggle.style.border = "none";
  descriptionToggle.style.padding = "5px 10px";
  descriptionToggle.style.margin = "15px";
  descriptionToggle.style.borderRadius = "5px";
  descriptionToggle.style.cursor = "pointer";
  descriptionToggle.style.fontSize = "14px";

  const description = document.createElement("div");
  description.textContent = descriptionText;
  description.style.display = "none";
  description.style.margin = "0 15px 15px";
  description.style.color = "#666";
  description.style.fontSize = "14px";

  descriptionToggle.addEventListener("click", () => {
    if (description.style.display === "none") {
      description.style.display = "block";
      descriptionToggle.textContent = "DES ▲";
    } else {
      description.style.display = "none";
      descriptionToggle.textContent = "DES ▼";
    }
  });

  return { descriptionToggle, description };
}

// Function to render cards

function renderCards(products) {
  // Clear existing cards
  root.innerHTML = "";
  createHeader();
  applyGlobalStyles();
  createSearchBar(allProducts); // Pass all products for search functionality
  filterProcucts(allProducts); // Pass all products for filtering

  products.forEach((item) => {
    const card = createCard(item);
    root.appendChild(card);
  });
}

function fetchData() {
  fetch("data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      allProducts = data.products; 
      currentProducts = [...allProducts];// Store all products in a global variable
      renderCards(currentProducts); // Render all products
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function init() {
  fetchData();
}

init();
