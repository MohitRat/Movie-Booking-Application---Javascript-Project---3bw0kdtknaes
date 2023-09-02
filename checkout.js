 function getData(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
const movieTitle = getData('data1');
const moviePrice = getData('data2');
console.log(movieTitle)
console.log(moviePrice)
document.querySelector('#convenience-fee').innerText = ((+moviePrice*1.75)/100).toFixed(2);
document.querySelector('#subtotal').innerText = +moviePrice + +((+moviePrice*1.75)/100).toFixed(2);
document.querySelector('#movie-name').innerText = movieTitle
document.querySelector('#ticket-cost').innerText = moviePrice
document.querySelector('#num-tickets').addEventListener('keyup',(event)=>{
    let tickets = event.target.value;
    let totalPrice = moviePrice*tickets;
    console.log(typeof totalPrice)
    document.querySelector('#convenience-fee').innerText = ((+totalPrice*1.75)/100).toFixed(2);
    document.querySelector('#subtotal').innerText = +totalPrice + +((+totalPrice*1.75)/100).toFixed(2);
})