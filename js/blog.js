const blogSection = document.querySelector("#blog-posts");
const themes = ["dark-coffee", "light-coffee"];
const postForm = document.querySelector("#post-editor form");

if (!JSON.parse(localStorage.getItem("posts"))) {
  const blogPosts = [
    {
      title: "The morning habit",
      author: "Grizzle Mocha",
      content: "Every day starts better when I taste my delicious coffee.",
      publishedAt: "2026-02-05",
    },
    {
      title: "My creativity is way better with coffee",
      author: "Jane Latte",
      content: "A cup of coffee fuels my thoughts and sparks new ideas.",
      publishedAt: "2026-02-05",
    },
    {
      title: "Coffee and Calm",
      author: "Alex Brew",
      content:
        "A quiet cup in the morning makes the chaos of the day feel manageable.",
      publishedAt: "2026-02-06",
    },
    {
      title: "My Visit to the New Cafe",
      author: "Lara Bean",
      content:
        "A new cafe opened downtown, and I was lucky to be one of the first to try it.",
      publishedAt: "2026-02-06",
    },
  ];
  localStorage.setItem("posts", JSON.stringify(blogPosts));
}

function submitPost() {
  const titleInput = document.querySelector("#post-editor form input");
  const contentInput = document.querySelector("#post-editor form textarea");
  const today = new Date().toISOString().split("T")[0];
  const blogPost = {
    title: titleInput.value,
    author: window.name,
    publishedAt: today,
    content: contentInput.value,
  };

  const blogPosts = JSON.parse(localStorage.getItem("posts"));
  blogPosts.push(blogPost);
  localStorage.setItem("posts", JSON.stringify(blogPosts));
  createNewPost(blogPost);
}

function createNewPost({ title, author, publishedAt, content }) {
  const newPost = document.createElement("div");
  newPost.className = `blog-post ${themes[themeIndex]}`;

  if (themeIndex === 0) {
    themeIndex++;
  } else {
    themeIndex = 0;
  }

  const postTitle = document.createElement("h2");
  const postAuthor = document.createElement("h6");
  const postDate = document.createElement("h6");
  const postInfo = document.createElement("div");
  const postContent = document.createElement("p");

  postContent.className = "post-content";
  postInfo.className = "post-info";

  const titleNode = document.createTextNode(title);
  const authorNode = document.createTextNode(author);
  const dateNode = document.createTextNode(publishedAt);
  const contentNode = document.createTextNode(content);

  postTitle.appendChild(titleNode);
  postAuthor.appendChild(authorNode);
  postDate.appendChild(dateNode);
  postInfo.append(postAuthor, postDate);
  postContent.appendChild(contentNode);

  newPost.append(postTitle, postInfo, postContent);

  blogSection.appendChild(newPost);
}

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitPost();
});
let themeIndex = 0;

for (const blogPost of JSON.parse(localStorage.getItem("posts"))) {
  createNewPost(blogPost);
}
