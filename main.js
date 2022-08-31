
// loading data from api or server
const loadDrinks = async() => {
    const url = await `https://www.thecocktaildb.com/api/json/v1/1/search.php?s`;
    const res = await fetch(url);
    const data = await res.json();
    displayDrinks(data.drinks);
}

// display the data to the UI
const displayDrinks = (drinks) => {
    const drinkContainer = document.getElementById("drink-container");
    drinks.map(drink => {
        console.log(drink);
        const drinkDiv = document.createElement("div");
        drinkDiv.classList.add("col");
        drinkDiv.innerHTML = `
        <div class="card">
            <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${drink.strDrink}</h5>
                    <p class="card-text"> ${drink.strInstructions.slice(0, 40)} </p>
            </div>
        </div>
        `;
        drinkContainer.appendChild(drinkDiv);
    })
}

loadDrinks()