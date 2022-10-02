
let allData = [];
let newData = [];
let allLinks = document.querySelectorAll("ul li a");
let oneRecipe = {};
let myDiv = document.getElementById("dish");

// get recipes from api

async function getRecipe(recipe){

    let data = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${recipe}`);
    let Fdata = await data.json();
    allData = Fdata.recipes;
    newData = allData.slice(0,20);
    
    display()
}

// display recipes

function display(){

    let rowContainer = ``;

    for(let i =0 ; i < newData.length; i++){

        rowContainer += `
        <div class="col-md-3">
                <div class="recp-item ">
                    <img data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getOneRecipe('${newData[i].recipe_id}');" src="${newData[i].image_url}" height="200" class="w-100" alt="">
                    <h4 class="text-center custom">${newData[i].title}</h4>
                </div>
            </div>
        `
    }

    document.getElementById("row-content").innerHTML = rowContainer;

}


// change diffrent recipes

for(let i =0; i < allLinks.length; i++){

    allLinks[i].addEventListener("click" , function(e){

        getRecipe(e.target.innerHTML);
    })
}

// start display recipe for each dish

async function getOneRecipe(id){

    

    let data = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    let Fdata = await data.json();
    recipeData = Fdata.recipe;
    oneRecipe = recipeData;

    displayOneRecipe();
    
}

// display dish recipe in modal

function displayOneRecipe(){

    let lists =``;

    for(let i =0; i < oneRecipe.ingredients.length; i++){

        lists += `<li>${oneRecipe.ingredients[i]}</li>`
    }

    let dishRecipe =``;

    dishRecipe += `
    <div class="w-100 overflow-hidden bg-light" >
    <img src="${oneRecipe.image_url}" class="w-100" alt="">
    <h4 class="text-center text-capitalize">${oneRecipe.title}</h4>
    <ol>${lists}</ol>
</div>
    `
myDiv.innerHTML = dishRecipe;
}


getRecipe("pizza");


