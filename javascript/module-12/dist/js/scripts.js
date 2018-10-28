"use strict";

var form = document.querySelector('.cards-form');
var removeBtn = document.querySelector('.cards-list');
var items = [];

var renderPage = function renderPage() {
  if (localStorage.getItem('items')) {
    items = JSON.parse(localStorage.getItem('items'));
    var source = document.querySelector('#cards-items').innerHTML.trim();
    var container = document.querySelector('#cards');
    var template = Handlebars.compile(source);
    var markup = items.reduce(function (acc, item) {
      return acc + template(item);
    }, "");
    container.innerHTML = markup;
  }
};

var getUrl = function getUrl() {
  var dublicate = items.some(function (item) {
    return item.url === form.url.value;
  });

  if (!dublicate) {
    if (form.url.value !== '') {
      items.unshift({
        url: form.url.value
      });
      localStorage.setItem('items', JSON.stringify(items));
    }
  } else {
    alert('This url is exist!');
  }
};

var addUrl = function addUrl(e) {
  e.preventDefault();
  getUrl();
  renderPage();
  form.url.value = '';
};

var removeItem = function removeItem(e) {
  var target = e.target;
  if (target.tagName != "BUTTON") return;
  items = items.filter(function (item) {
    return item.url !== target.previousElementSibling.innerHTML;
  });
  localStorage.setItem('items', JSON.stringify(items));
  renderPage();
};

form.addEventListener("submit", addUrl);
removeBtn.addEventListener("click", removeItem);

window.onload = function () {
  renderPage();
};