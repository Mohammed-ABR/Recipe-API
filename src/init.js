// ==========================
// 🌐 API Section
// ==========================
const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

// Fetch meals from API
const fetchRecipe = async (query) => {
  try {
    const response = await fetch(`${API_URL}${query}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

// ==========================
// 🧱 DOM Section
// ==========================
const mealsContainer = document.getElementById("mealsContainer");

// Render meals to the DOM
const renderMeals = (meals) => {
  mealsContainer.innerHTML = ""; // Clear previous results

  if (meals.length === 0) {
    mealsContainer.innerHTML = `<p>No meals found. Try another word.</p>`;
    return;
  }

  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal");
    mealDiv.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h3>${meal.strMeal}</h3>
    `;
    mealsContainer.appendChild(mealDiv);
  });
};

// ==========================
// ⚡ Events Section
// ==========================
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Handle search click
const handleSearch = async () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    const meals = await fetchRecipe(query);
    renderMeals(meals);
  }
};

// Handle "Enter" key in input
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

searchBtn.addEventListener("click", handleSearch);
