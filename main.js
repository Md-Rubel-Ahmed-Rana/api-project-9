const loadDrinks = async() => {
    const url = await `https://www.thecocktaildb.com/api/json/v1/1/search.php?s`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.drinks);
}

loadDrinks()