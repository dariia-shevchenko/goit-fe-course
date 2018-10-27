const form = document.querySelector('.cards-form');
const removeBtn = document.querySelector('.cards-list');
let items = [];

const renderPage = () => {
  if (localStorage.getItem('items')) {
    items = JSON.parse(localStorage.getItem('items'));
    const source = document.querySelector('#cards-items').innerHTML.trim();
    const container = document.querySelector('#cards');
    const template = Handlebars.compile(source);
    const markup = items.reduce((acc, item) => acc + template(item), "");
    container.innerHTML = markup;
  }
}

const getUrl = () => {
  const dublicate = items.some(item => item.url === form.url.value);

  if (!dublicate) {
    if (form.url.value !== '') {
      items.unshift({
        url: form.url.value
      });    
      localStorage.setItem('items', JSON.stringify(items));
      }
  } else {
    alert('This url is exist!')
  }
};

const addUrl = (e) => {
  e.preventDefault();
  getUrl();
  renderPage();
  form.url.value = '';
}

const removeItem = (e) => {
  const target = e.target;
  if (target.tagName != "BUTTON") return;
  items = items.filter(item => item.url !== target.previousElementSibling.innerHTML);
  localStorage.setItem('items', JSON.stringify(items));
  renderPage();
}

form.addEventListener("submit", addUrl);
removeBtn.addEventListener("click", removeItem);

window.onload = function() {
  renderPage()
};