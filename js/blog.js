const blogSection = document.querySelector("#blog-posts");
const themes = ["dark-coffee", "light-coffee"];
const postForm = document.querySelector("#post-editor form");
const blogPosts = [
  {
    title: "Coffee Break",
    author: "Grizzle",
    content: "There is something magical ",
    publishedAt: "2026-02-05",
  },
  {
    title: "How Coffee Affects Productivity",
    author: "Jane Doe",
    content: "I like my coffee so much",
    publishedAt: "2026-02-05",
  },
];

function submitPost() {
  const titleInput = document.querySelector("#post-editor form input");
  const contentInput = document.querySelector("#post-editor form textarea");
  const today = new Date().toISOString().split("T")[0];

  const title = titleInput.value;
  const content = contentInput.value;
  const author = window.name

  createNewPost(title, author, today, content);
}

function createNewPost(title, author, publishedAt, content) {
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
  const postInfo = document.createElement("div")
  const postContent = document.createElement("p");

  postContent.className = "post-content"
  postInfo.className = "post-info"

  const titleNode = document.createTextNode(title);
  const authorNode = document.createTextNode(author);
  const dateNode = document.createTextNode(publishedAt);
  const contentNode = document.createTextNode(content);

  postTitle.appendChild(titleNode);
  postAuthor.appendChild(authorNode);
  postDate.appendChild(dateNode);
  postInfo.append(postAuthor, postDate)
  postContent.appendChild(contentNode);

  newPost.append(postTitle, postInfo, postContent);

  blogSection.appendChild(newPost);
}

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitPost();
});
let themeIndex = 0;

for (const blogPost of blogPosts) {
  createNewPost(
    blogPost.title,
    blogPost.author,
    blogPost.publishedAt,
    blogPost.content,
  );
}
