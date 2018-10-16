const laptops = [
  {
    size: 13,
    color: 'white',
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 13,
    color: 'gray',
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 13,
    color: 'black',
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'white',
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'gray',
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'black',
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'white',
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'gray',
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'black',
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
];

let filteredLaptops = laptops.map(item => item);
const filter = { size: [], color: [], release_date: [] };
const filterBtn = document.querySelector(".form");
const source = document.querySelector("#laptops-items").innerHTML.trim();
const container = document.querySelector("#laptops-container");
const template = Handlebars.compile(source);

const loadPage = function() {
  const markup = filteredLaptops.reduce((acc, item) => acc + template(item), "");
  container.innerHTML = markup;
};

const clearPage = function() {
  filteredLaptops = laptops.map(item => item);
  loadPage()
};

window.onload = function() {
  loadPage()
};

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const getValue = function(name) {
  var select = filterBtn.elements[`${name}`];

  for (var i = 0; i < select.length; i++) {
    if(select[i].checked) {
      if (isNumber(select[i].value)) {
        filter[`${name}`].push(+select[i].value);    
      } else {
        filter[`${name}`].push(select[i].value);
      }
    }
  }
};

const fillFilter = function () {
  for (const key in filter) {
    if (filter.hasOwnProperty(key)) {
      if (filter[key].length > 0) {
        filter[key].splice(0, filter[key].length)
      }
      getValue(key);
    }
  }
};

const getItems = function () {
  filteredLaptops = laptops.map(item => item);

  for (const key in filter) {
    if (filter[key].length > 0) {
      filteredLaptops = filteredLaptops.filter(item => {
        if (filter[key].includes(item[key])) return item;
      })
    }
  }
};

const filterHandler = function(e) {
  e.preventDefault();
  fillFilter();
  getItems();
  loadPage();
}

const resetHandler = function () {
  clearPage();
}

filterBtn.addEventListener("submit", filterHandler);
filterBtn.addEventListener("reset", resetHandler);