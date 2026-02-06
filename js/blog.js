const blogSection = document.querySelector("#blog-posts");
const themes = ["dark-coffee", "light-coffee"];
const postForm = document.querySelector("#post-editor form");
const maxLength = 50;

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
  let author;
  if (localStorage.getItem("name")) {
    author = localStorage.getItem("name")
  } else {
    alert("Enter your name in the dashboard first")
    return
  }

  const blogPost = {
    title: titleInput.value,
    author: author,
    publishedAt: today,
    content: contentInput.value,
  };
  titleInput.value = ''
  contentInput.value = ''
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

  postTitle.appendChild(titleNode);
  postAuthor.appendChild(authorNode);
  postDate.appendChild(dateNode);
  postInfo.append(postAuthor, postDate);

  const isExpandable = content.length > maxLength;
  const fullText = content;
  const shortText = isExpandable
    ? content.substring(0, maxLength) + "..."
    : content;
  const contentNode = document.createTextNode(shortText);
  postContent.appendChild(contentNode);

  if (isExpandable) {
    const toggleBtn = document.createElement("span");
    toggleBtn.textContent = "Read More";
    toggleBtn.className = "toggle-post";

    toggleBtn.addEventListener("click", (e) => {
      const expanded = postContent.classList.toggle("expanded");
      toggleBtn.textContent = expanded ? "Read Less" : "Read More";
      contentNode.textContent = expanded ? fullText : shortText;
    });
    newPost.append(postTitle, postInfo, postContent, toggleBtn);
  } else {
    newPost.append(postTitle, postInfo, postContent);
  }

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
