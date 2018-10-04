const galleryItems = [
  { preview: 'img/preview-1.jpeg', fullview: 'img/fullview-1.jpeg', alt: "alt text 1" },
  { preview: 'img/preview-2.jpeg', fullview: 'img/fullview-2.jpeg', alt: "alt text 2" },
  { preview: 'img/preview-3.jpeg', fullview: 'img/fullview-3.jpeg', alt: "alt text 3" },
  { preview: 'img/preview-4.jpeg', fullview: 'img/fullview-4.jpeg', alt: "alt text 4" },
  { preview: 'img/preview-5.jpeg', fullview: 'img/fullview-5.jpeg', alt: "alt text 5" },
  { preview: 'img/preview-6.jpeg', fullview: 'img/fullview-6.jpeg', alt: "alt text 6" },
  { preview: 'img/preview-7.jpeg', fullview: 'img/fullview-7.jpeg', alt: "alt text 6" },
];

const createItem = function(item) {
  const li = document.createElement("li");
  const image = document.createElement('img');

  image.setAttribute('src', item.preview);
  image.setAttribute('data-fullview', item.fullview);
  image.setAttribute('alt', item.alt);
  li.setAttribute('tab-index', 1);
  li.appendChild(image);
  
  return li;
};

const createItems = function (items) {
  return items.map(element => {    
    return createItem(element);
  });
}

const addItems = function () {
  const gallery = document.querySelector(".image-gallery");
  const itemList = document.createElement("ul");
  itemList.classList.add("preview");

  createItems(galleryItems).forEach(element => {
    itemList.appendChild(element);
  });

  const firstImg = itemList.firstElementChild.querySelector("img");
  firstImg.classList.add("active");

  gallery.appendChild(itemList);
}

addItems();

const gallery = document.querySelector(".js-image-gallery");

gallery.addEventListener("click", handleNavClick);

function handleNavClick(event) {
  event.preventDefault();
  const target = event.target;
  if (!target.hasAttribute("data-fullview")) return;
  
  setActiveItem(target);
  setPreviewImg(target);
}

function setActiveItem(previewImg) {
  const activeItem = gallery.querySelector("img.active");
  if (activeItem) {
    activeItem.classList.remove("active");
  }
  previewImg.classList.add("active");
}

function setPreviewImg(previewImg) {
  const fullviewImg = gallery.querySelector(".fullview img");
  const attr = previewImg.getAttribute("data-fullview");

  fullviewImg.setAttribute("src", attr);
}