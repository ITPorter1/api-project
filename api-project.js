const searchBtn = document.getElementById('search-btn');
const collectionId = document.getElementById('album');
const mealDetailsContent = document.querySelector('.album-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
 searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://itunes.apple.com/search?term=kendrick+lamar&entity=album`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.results){
            data.results.forEach(album => {
                html += `
                    <div class = "album-item" data-id = "${album.collectionId}">
                        <div class = "album-img"> 
                            <img src = "${album.artworkUrl100}" alt = "food">
                        </div>
                        <div class = "album-name">
                            <h3>${album.collectionName}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            collectionId.classList.remove('notFound');
        } else{
            html = "ARTIST NOT FOUND";
            collectionId.classList.add('notFound');
        }

        collectionId.innerHTML = html;
    });
}


// get recipe of the meal
// function getMealRecipe(e){
//     e.preventDefault();
//     if(e.target.classList.contains('recipe-btn')){
//         let collectionId = e.target.parentElement.parentElement;
//         fetch(`https://itunes.apple.com/lookup?upc=${collectionId.dataset.id}`)
//         .then(response => response.json())
//         .then(data => mealRecipeModal(data.results));
//     }
// }

// // // create a modal
// function mealRecipeModal(album){
//     console.log(album);
//     album = album[0];
//     let html = `
//         <h2 class = "album-title">${album.collectionName}</h2>
//         <p class = "music-genre">${album.primaryGenreName}</p>
//         <div class = "recipe-instruct">
//             <h3>Instructions:</h3>
//             <p>${album.trackCount}</p>
//         </div>
//         <div class = "recipe-meal-img">
//             <img src = "${album.artworkUrl100}" alt = "">
//         </div>
//         <div class = "recipe-link">
//             <a href = "${collectionViewUrl}" target = "_blank">Watch Video</a>
//         </div>
//     `;
//     mealDetailsContent.innerHTML = html;
//     mealDetailsContent.parentElement.classList.add('showRecipe');
// }