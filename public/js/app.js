console.log("Client Side JS file is loaded");
// function myFunction() {
//   console.log("Seach button");
//   const userInput = console.log(document.getElementById("search-data").value);
// }

// fetch("http://localhost:3000/weather_tt?address=!").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.address);
//       console.log(data.forecast);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const searchData = document.querySelector("input");
const messageOne = document.querySelector("#para1");
const messageTwo = document.querySelector("#para2");

// window.onload = function(){
//     document.getElementById("search-button").style.display;
// }

// window.onload = function(){
//     document.getElementById("loading-button").style.display = 'none';
// }

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchData.value;
  fetch(`http://localhost:3000/weather_tt?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          messageTwo.textContent = "";
        } else {
          messageOne.textContent = data.address;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
