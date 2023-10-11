document.addEventListener("DOMContentLoaded", function () {

const blogList = document.getElementById("blogList");
const blogForm = document.getElementById("blogForm");

const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const imageInput = document.getElementById("imageInput");

const formSubmit = document.getElementById("formSubmit");
const postId = document.querySelector("#postId");

let posts = [];

function displayBlogPosts() {
  blogList.innerHTML = "";

  posts.forEach((post, index) => {
    const postCard = document.createElement("div");
    postCard.className = "card col-sm-6 col-md-6 col-xs-12 col-lg-4";

    const postCardBody = document.createElement("div");
    postCardBody.className = "card-body";

    const postTitle = document.createElement("h5");
    postTitle.className = "card-title";
    postTitle.textContent = post.title;

    const postContent = document.createElement("p");
    postContent.className = "card-text";
    postContent.textContent =
      post.content.length > 100
        ? post.content.substring(0, 100) + "..."
        : post.content;

    const figureTag = document.createElement("figure");
    const imageElement = document.createElement("img");

    if (post.image) {
      imageElement.src = post.image;
      imageElement.alt = post.title;
      imageElement.className = "card-img-top img-fluid rounded d-block";
    }

    const readMoreLink = document.createElement("button");

    readMoreLink.textContent = "Read More";
    readMoreLink.className = "btn btn-primary";
    readMoreLink.setAttribute("type", "button");
    readMoreLink.setAttribute("data-bs-toggle", "modal");
    readMoreLink.setAttribute("data-bs-target", "#exampleModal");
    readMoreLink.addEventListener("click", () => showFullPost(post));

    const editButton = document.createElement("button");
    editButton.className = "btn btn-primary";
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => editPost(post));

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deletePost(post));

    const buttonContainer = document.createElement("div");
    buttonContainer.className =
      "d-grid gap-2 d-md-flex justify-content-md-end mt-3";

    figureTag.appendChild(imageElement);
    buttonContainer.append(editButton, deleteButton);

    postCardBody.appendChild(postTitle);
    postCardBody.appendChild(postContent);
    postCardBody.appendChild(readMoreLink);
    postCardBody.appendChild(buttonContainer);

    postCard.append(figureTag, postCardBody);

    blogList.appendChild(postCard);
  });
}

function showFullPost(post) {
  document.getElementById("exampleModalLabel").textContent = post.title;
  document.getElementById("modalContent").textContent = post.content;
  document.getElementById("modalImage").src = post.image;
  document.getElementById("modalImage").alt = post.title;
}

function editPost(post) {
  titleInput.setAttribute("value", post.title);
  contentInput.textContent = post.content;
  imageInput.files[0] = post.image;
  formSubmit.textContent = "save";

  postId.textContent = post.id;
}

function deletePost(post) {
  posts = posts.filter((p) => p.id !== post.id);
  displayBlogPosts();
}

displayBlogPosts();

blogForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (titleInput.value && contentInput.value) {
    if (postId.textContent === "") {
      const newPost = {
        id: Math.ceil(Math.random() * 1000),
        title: titleInput.value,
        content: contentInput.value,
        image: imageInput.files[0]
          ? URL.createObjectURL(imageInput.files[0])
          : "https://placehold.co/200x200",
      };

      posts.push(newPost);
      displayBlogPosts();
      blogForm.reset();
    } else {
      const objIndex = posts.findIndex(
        (obj) => obj.id === Number(postId.textContent)
      );

      if (objIndex === -1) return;

      const updatedObj = {
        ...posts[objIndex],
        title: titleInput.value,
        content: contentInput.value,
        image: imageInput.files[0]
          ? URL.createObjectURL(imageInput.files[0])
          : "https://placehold.co/200x200",
      };

      posts = [
        ...posts.slice(0, objIndex),
        updatedObj,
        ...posts.slice(objIndex + 1),
      ];

      displayBlogPosts();
      postId.textContent = "";

      formSubmit.textContent = "Create Post";
      titleInput.setAttribute("value", "");
      contentInput.textContent = "";

      blogForm.reset();
    }
  }
});
});
