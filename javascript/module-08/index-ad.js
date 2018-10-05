const galleryItems = [
  { preview: 'img/preview-1.jpeg', fullview: 'img/fullview-1.jpeg', alt: "alt text 1" },
  { preview: 'img/preview-2.jpeg', fullview: 'img/fullview-2.jpeg', alt: "alt text 2" },
  { preview: 'img/preview-3.jpeg', fullview: 'img/fullview-3.jpeg', alt: "alt text 3" },
  { preview: 'img/preview-4.jpeg', fullview: 'img/fullview-4.jpeg', alt: "alt text 4" },
  { preview: 'img/preview-5.jpeg', fullview: 'img/fullview-5.jpeg', alt: "alt text 5" },
  { preview: 'img/preview-6.jpeg', fullview: 'img/fullview-6.jpeg', alt: "alt text 6" },
  { preview: 'img/preview-7.jpeg', fullview: 'img/fullview-7.jpeg', alt: "alt text 6" },
];

class Gallery {
  constructor (obj) {
    this.items;
    this.parentNode;
    this.defaultActiveItem;

    if (obj) {
      Object.assign(this, obj)
    }
  }
  
  createFullviewItem() {
    const div = document.createElement("div");
    const image = document.createElement('img');

    image.setAttribute('src', this.items[this.defaultActiveItem - 1].fullview);
    image.setAttribute('alt', this.items[this.defaultActiveItem - 1].alt);
    div.classList.add("fullview");
    div.appendChild(image);

    // this.parentNode.appendChild(div);
    return div;
  }

  createPreviewItem(item) {
    const li = document.createElement("li");
    const image = document.createElement('img');
  
    image.setAttribute('src', item.preview);
    image.setAttribute('data-fullview', item.fullview);
    image.setAttribute('alt', item.alt);
    li.appendChild(image);
    
    return li;
  }
  
  createPreviewItems(items) {
    return items.map(element => {    
      return this.createPreviewItem(element);
    });
  }
  
  addItems() {
    const fullviewItem = this.createFullviewItem();
    const itemList = document.createElement("ul");
    itemList.classList.add("preview");

    this.createPreviewItems(this.items).forEach(element => {
      itemList.appendChild(element);
    });

    this.parentNode.appendChild(fullviewItem);
    this.parentNode.appendChild(itemList);
  }
  
  onClick(event) {
    const target = event.target;
    if (!target.hasAttribute("data-fullview")) return;
    
    this.setActiveItem(target);
    this.setPreviewImg(target);
  }

  setActiveItem(previewImg) {
    const activeItem = this.parentNode.querySelector("img.active");

    if (activeItem) {
      activeItem.classList.remove("active");
    }
    previewImg.classList.add("active");
  }

  setPreviewImg(previewImg) {
    const fullviewImg = this.parentNode.querySelector(".fullview img");
    const attr = previewImg.getAttribute("data-fullview");

    fullviewImg.setAttribute("src", attr);
  }
  
  init() {
    this.addItems();
    let activeImg = this.parentNode.querySelector(".preview");
    activeImg = activeImg.children[this.defaultActiveItem-1].querySelector("img");
    activeImg.classList.add("active");

    this.parentNode.addEventListener('click', e => this.onClick(e));
  }
};

const gallery = new Gallery({
  items: galleryItems,
  parentNode: document.querySelector('.image-gallery'),
  defaultActiveItem: 2
});

gallery.init();