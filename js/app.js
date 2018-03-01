//llamamos a traer nuestros elementos del HTML
const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

//Agregamos el evento al submit
form.addEventListener('submit', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

//funcion que contiene la API KEY
function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b94f1606546b4aceb4324f41b0b56c7d`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
  console.log(articleRequest);
}

//funcion por si hay error en el request
function handleError() {
  console.log('se ha presentado un error');
}

//funcion para agregar 5 noticias
function addNews() {
  const data = JSON.parse(this.responseText);
  console.log(data);//Logueo la data para ver que si esta OK
  for (var i = 1; i <= 5; i++) {
    const article = data.response.docs[i];//response simplifica la data
    const title = article.headline.main;
    const snippet = article.snippet;
    let li = document.createElement('li');
    li.className = 'articleClass'
    li.innerText = snippet;

    responseContainer.appendChild(li);//Contenedor de las noticias
  }
}
