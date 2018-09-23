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

const image = document.querySelector(".post__image");
const title = document.querySelector(".post__title");
const text = document.querySelector(".post__text");
const link = document.querySelector(".button");
const postList = document.querySelector(".post-list");

const createPostCard = function(post) {
  image.setAttribute('src', post.img);
  link.setAttribute('href', post.link);
  title.textContent = post.title;  
  text.textContent = post.text;
  
  return postList.innerHTML;
};

const createCards = function (posts) {
  return posts.map(element => {
    return createPostCard(element);
  });
}

const addCards = function () {
  const postCards = createCards(posts);
  postList.innerHTML = '';

  postCards.forEach(element => {
    postList.innerHTML += element;
  });
}

addCards()