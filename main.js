
// loading data from api or server
const loadDrinks = async (searchText) => {
    const url = await `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDrinks(data.drinks);
}

// display the data to the UI
const displayDrinks = (drinks) => {
    const drinkContainer = document.getElementById("drink-container");
    drinkContainer.textContent = "";
    // show not found message
    const notFound = document.getElementById("not-found");
   if(drinks === null){
       loadingSpinner(false)
       notFound.classList.remove("d-none");
       notFound.innerHTML = `<h2 class="text-danger">Error 404. Item not found.</h2>`
        return;
    }else{
       loadingSpinner(false)
       notFound.classList.add("d-none");
    }
    drinks.map(drink => {
        const drinkDiv = document.createElement("div");
        drinkDiv.classList.add("col");
        drinkDiv.innerHTML = `
        <div class="card p-4">
            <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title">${drink.strDrink}</h5>
                <p class="card-text"> ${drink.strInstructions.slice(0, 30)}... </p>
                <button onclick="loadDetails(${drink.idDrink})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#drinkDetails">Show Details</button>
            </div>
        </div>
        `;
        drinkContainer.appendChild(drinkDiv);
    })
}

// function to load Drink details by taking dynamic url;
const loadDetails = async(id) => {
    const url = await `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showDrinkDetails(data.drinks[0]);
}



// show Drinks Details on the Modal;
const showDrinkDetails = (drink) => {
    console.log(drink);
    const title = document.getElementById("drinkDetailTitle");
    title.innerText = "Name: " + drink.strDrink;
    const image = document.getElementById("drink-img");
    image.src = drink.strDrinkThumb;
    const category = document.getElementById("category")
    category.innerText = "Category: " + drink.strCategory;
    const date = document.getElementById("date");
    date.innerText = "Modified at: " + drink.dateModified;
    const alcohol = document.getElementById("alcohol");
    alcohol.innerText = "Drink is " + drink.strAlcoholic;
    const creative = document.getElementById("creative");
    creative.innerText = "Is this creative? Ans: " + drink.strCreativeCommonsConfirmed;
}

// loader or spinner
const loadingSpinner = (isLoading) => {
    const loader = document.getElementById("loader");
    if (isLoading) {
        loader.classList.remove("d-none");
    }else{
        loader.classList.add("d-none");
    }
}

// get search text as value 
const searchValue = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadDrinks(searchText);
}
// search functionality
document.getElementById("search-btn").addEventListener("click", () => {
    searchValue();
    loadingSpinner(true)
})

// get the saerch result pressing Enter key instead of pressing search button
document.getElementById("search-field").addEventListener("keyup", (getEvent) => {
    if (getEvent.key === "Enter") {
        searchValue();
        loadingSpinner(true);
    }
})
loadDrinks("");