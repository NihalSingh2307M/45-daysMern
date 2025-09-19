const API_URL = "http://localhost:5000/api";
let token = null;
const authSection = document.getElementById("authSection");
const userSection = document.getElementById("userSection");
const usernameSpan = document.getElementById("username");
const postsDiv = document.getElementById("posts");

// -------- REGISTER --------
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  alert(data.message || "Registered successfully!");
  if (res.status === 201) {
    // Optional: clear register form
    document.getElementById("regName").value = "";
    document.getElementById("regEmail").value = "";
    document.getElementById("regPassword").value = "";
  }
});

// -------- LOGIN --------
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    token = data.token;
    usernameSpan.textContent = data.user.username;
    authSection.classList.add("hidden");
    userSection.classList.remove("hidden");
    loadPosts();
  } else {
    alert(data.message || "Login failed");
  }
});

// -------- LOGOUT --------
document.getElementById("logoutBtn").addEventListener("click", () => {
  token = null;
  authSection.classList.remove("hidden");
  userSection.classList.add("hidden");
});

// -------- CREATE POST --------
document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;

  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  const data = await res.json();

  if (data._id) {
    alert("Post created!");
    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";
    loadPosts();
  } else {
    alert(data.message || "Error creating post");
  }
});

// -------- LOAD ALL POSTS --------
async function loadPosts() {
  const res = await fetch(`${API_URL}/posts`);
  const posts = await res.json();

  postsDiv.innerHTML = posts
    .map(
      (p) => `
      <div class="post">
        <h3>${p.title}</h3>
        <p>${p.content}</p>
        <small>by ${p.author?.username || "Unknown"}</small>
      </div>`
    )
    .join("");
}

// Initial load
loadPosts();
