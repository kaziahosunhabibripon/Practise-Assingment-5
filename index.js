const searchFoodItem = async() => {
    const searchMeal = document.getElementById("search-meal").value;
   
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayFoods(data.meals);   
        document.getElementById("search-meal").value= '';   
    }
    catch(error){
        displayError("Sorry the food item you are looking is not available!"); 
        
    } 
   
       
}

const displayFoods = foods => {
    const errorTag = document.getElementById("display-error");
    errorTag.innerHTML = '';
    const foodContainer = document.getElementById("food-container");
    foodContainer.innerHTML = '';
    foods.forEach(food => {
        const foodDiv = document.createElement("div");
        foodDiv.className = 'row';
        foodDiv.innerHTML = `
            <div onclick = "getFoodDetails('${food.idMeal}')" class ="" id="Hide-div">
                <img  class="img-fluid" src="${food.strMealThumb}" alt="food-image">
                <h4 class='text-center'>${food.strMeal}</h4>
            </div>
        `
        foodContainer.appendChild(foodDiv);
    })

}
const getFoodDetails = async (foodItem) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        displaySingleFoodItem(data.meals[0]);  
              
    }
    catch(error){
        displayError("Sorry the food item you are looking is not available"); 
        
    }
    
}
const displaySingleFoodItem = food => {
    const singleFoodDiv = document.getElementById("single-FoodItem");
    singleFoodDiv.innerHTML = '';
    singleFoodDiv.className = 'col';
    singleFoodDiv.innerHTML = `
        <div id="hideSingleMillsDetails">
            <img class="img-fluid" src="${food.strMealThumb}" alt="meal-image">
            <h4 class='text-center'>${food.strMeal}</h4>
            <h3 class='text-center'>Ingredients</h3> 
            <ul class='text-center' id="ing-list">
                
            </ul>
        </div>
        `
        for(let i=1; i<21; i++){
            const ingredients = `strIngredient${i}`;
            const li = document.createElement("li");
            li.innerText = food[ingredients];
            document.getElementById("ing-list").appendChild(li);
        }
        document.getElementById("display-error").value= ''; 
    }
const displayError = error=> {
    const errorTag = document.getElementById("display-error");
    errorTag.innerHTML= error;    
    document.getElementById("single-FoodItem").innerHTML = '';
}

