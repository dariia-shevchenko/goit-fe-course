const posts = [
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-1.com'
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-2.com'
  },
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-3.com'
  }
];

const createPostCard = function(post) {
  const item = document.createElement("div");
  const image = document.createElement('img');
  const title = document.createElement('h2');
  const text = document.createElement('p');
  const link = document.createElement('a');

  item.classList.add("post");
  image.classList.add("post__image");
  title.classList.add("post-title");
  text.classList.add("post-text");
  link.classList.add("button");

  image.setAttribute('src', post.img);
  link.setAttribute('href', post.link);
  title.textContent = post.title;  
  text.textContent = post.text;

  item.appendChild(image);
  item.appendChild(title);
  item.appendChild(text);
  item.appendChild(link);
  
  return item;
};

const createCards = function (posts) {
  return posts.map(element => {    
    return createPostCard(element);
  });
}

const addCards = function () {
  const body = document.querySelector("body");
  const postList = document.createElement("div");
  postList.classList.add("post-list");

  createCards(posts).forEach(element => {
    postList.appendChild(element);
  });

  body.prepend(postList);
}

addCards();