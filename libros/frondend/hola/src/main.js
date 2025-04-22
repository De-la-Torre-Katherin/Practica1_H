
let pingButton = document.querySelector("#pingButton");

pingButton.addEventListener('click',getPing)
function getPing() {
  const url=' http://localhost:3000/ping'
  fetch(url).then((response)=>{
    console.log(response)
  })
}
