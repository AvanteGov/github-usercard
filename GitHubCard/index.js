/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

// let porfiledata = axios.get("https://api.github.com/users/AvanteGov")

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/




/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the 
          following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/


  
  let parentContainer = document.querySelector('.cards');
  
  const cardConstructor = (objectParam) => {

    // creates parent container and adding the class 
    let container = document.createElement('div');
    container.classList.add('card');

    // creates img and adds attribute then appends to parent container 
    let img = document.createElement('img');
    img.src = objectParam.avatar_url;
    container.appendChild(img);

    // creates card container and adds class
    let infoContainer = document.createElement('div');
    infoContainer.classList.add('card-info');
    container.appendChild(infoContainer);

    // creates username paragraph, modifies content, adds class, appends to child container
    let username = document.createElement('h3');
    username.textContent = objectParam.login;
    username.classList.add("username");
    infoContainer.appendChild(username);
    
    // creating the profile header and the modiying, and adding class, and appending to info container
    let name = document.createElement('p');
    name.textContent = objectParam.name;
    name.classList.add('name');
    infoContainer.appendChild(name);
    
    // creates location paragraph, modifies content, appends to info container. 
    let location = document.createElement('p');
    location.textContent = `Location: ${objectParam.location}`;
    infoContainer.appendChild(location);

    // creates paragraph for user profile and link
    let profile = document.createElement('p');
    profile.textContent = "Profile: ";
    let profileLink = document.createElement('a');
    profileLink.href = objectParam.html_url;
    profile.textContent = "AvanteGov";

    // appends the link to the profile 
    profile.appendChild(profileLink);
    infoContainer.appendChild(profile);

    // creates follwers paragraph and interpolates 
    let followers = document.createElement('p');
    followers.textContent = `Followers: ${objectParam.followers}`;
    infoContainer.appendChild(followers);

    // creates following and interpolates 
    let following = document.createElement('p');
    following.textContent = `Following: ${objectParam.following}`;
    infoContainer.appendChild(following);

    let bio = document.createElement('p');
    bio.textContent = `Bio: ${objectParam.bio}`;
    infoContainer.appendChild(bio);

    return container;
  }

axios.get("https://api.github.com/users/avantegov")
.then((response) => {
  parentContainer.appendChild(cardConstructor(response.data));
  })
.catch((err) => { console.log("big error") })

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

const followersArray = ["tetondan", "dustinmyers", "justsml", "luishrd", "bigknell"];

// for (i = 0; i < followersArray.length; i++) {
//   axios.get(`https://api.github.com/users/${followersArray[i]}`)
//   console.log(`https://api.github.com/users/${followersArray[i]}`)
//     .then((response) => {
//       parentContainer.appendChild(cardConstructor(response.data));
//     })
//     .catch((err) => {console.log("you got big error there, Tex.")})
// }

followersArray.forEach((user) => {
  axios.get(`https://api.github.com/users/${user}`)
    .then((response) =>{
      parentContainer.appendChild(cardConstructor(response.data));
    })
    .catch((err) => {console.log("You got a big error there, Tex")})
})

let avanteFollowers = [];

axios.get("https://api.github.com/users/avantegov/followers")
  .then((response) => {
    response.forEach((follower) => {
      parentContainer.appendChild(cardConstructor(follower.data));
    })
  })
  .catch((err) => {console.log("you got the biggest error yet.")});