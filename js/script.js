import { films } from "../data/films.js";
import { edits } from "../data/edits.js";
import { photography } from "../data/photography.js";
import { models } from "../data/3Dmodels.js";
import { post } from "../data/bio.js";

const filmsViewer = document.getElementById("films-viewer");
const editsViewer = document.getElementById("edits-viewer");
const photographyViewer = document.getElementById("photography-viewer");
const modelsViewer = document.getElementById("models-viewer");
const postViewer = document.getElementById("postViewer");

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

// Render YouTube videos (films/edits)
function renderVideos(dataArray, container) {
  dataArray.forEach((item, index) => {
    const section = document.createElement("section");
    const frame = document.createElement("iframe");
    const title = document.createElement("h2");
    const date = document.createElement("h4");
    const description = document.createElement("p");

    section.classList.add("rendered-section");

    title.textContent = item.title;
    title.classList.add("title-header");
    date.textContent = item.date;
    description.textContent = item.description;

    frame.src = `https://www.youtube.com/embed/${item.youtubeId}`;
    frame.title = item.title;
    frame.allowFullscreen = true;
    frame.loading = "lazy";
    frame.frameBorder = "0";

    section.append(frame, title, date, description);
    container.appendChild(section);

    setTimeout(() => section.classList.add("visible"), index * 500);
  });
}

// Render photography
function renderPhotography(dataArray, container) {
  dataArray.forEach((item) => {
    item.images.forEach((image) => {
      const img = document.createElement("img");
      const div = document.createElement("div");

      img.src = image.src;
      img.alt = image.alt;
      img.loading = "lazy";
      img.classList.add("lightbox-img");

      div.appendChild(img);
      container.appendChild(div);
    });
  });
}

// Render mixed embeds (YouTube + Sketchfab)
function renderEmbeds(dataArray, container) {
  dataArray.forEach((item, index) => {
    const section = document.createElement("section");
    const frame = document.createElement("iframe");
    const title = document.createElement("h2");
    const date = document.createElement("h4");
    const description = document.createElement("p");

    section.classList.add("rendered-section");

    title.textContent = item.title;
    title.classList.add("title-header");
    date.textContent = item.date ?? "";
    description.textContent = item.description ?? "";

    if (item.type === "sketchfab") {
      frame.src = `https://sketchfab.com/models/${item.id}/embed`;
      frame.allow = "autoplay; fullscreen; xr-spatial-tracking";
      frame.classList.add("sketchfab-frame");
    } else {
      frame.src = `https://www.youtube.com/embed/${item.id}`;
      frame.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.classList.add("youtube-frame");
    }

    frame.title = item.title;
    frame.allowFullscreen = true;
    frame.loading = "lazy";
    frame.frameBorder = "0";

    section.append(frame, title, date, description);
    container.appendChild(section);

    setTimeout(() => section.classList.add("visible"), index * 200);
  });
}

// Create and Render Bio posts

function renderPosts(dataArray, container) {
  dataArray.forEach((item, index) => {

    // Create section wrapper
    const section = document.createElement("section");
    section.classList.add("post");

    // ===== TEXT CONTENT =====
    const textDiv = document.createElement("div");
    textDiv.classList.add("post-text");

    const title = document.createElement("h2");
    const date = document.createElement("h3");
    const postText = document.createElement("p");

    title.textContent = item.title;
    date.textContent = item.date;
    postText.innerHTML = item.postText;

    textDiv.append(title, date, postText);

    // ===== TAGS (SAFE VERSION) =====
    const tagList = document.createElement("ul");

    (item.tags || []).forEach(tag => {
      const li = document.createElement("li");
      li.textContent = tag;
      tagList.appendChild(li);
    });

    textDiv.appendChild(tagList);

    // ===== IMAGES =====
    const photoDiv = document.createElement("div");
    photoDiv.classList.add("post-images");
    

    (item.images || []).slice(0, 3).forEach(({ src, alt, caption }) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      img.src = src;
      img.alt = alt;
      img.classList.add("post-image");
      img.classList.add("lightbox-img");
      figcaption.textContent = caption;

      figure.append(img, figcaption);
      photoDiv.appendChild(figure);
    });

    // ===== ASSEMBLE SECTION =====
    section.append(textDiv, photoDiv);
    container.appendChild(section);

    // ===== STAGGERED REVEAL =====
    setTimeout(() => section.classList.add("visible"), index * 200);
  });
}

// Only render if the container exists on the current page
if (photographyViewer) renderPhotography(photography, photographyViewer);
if (editsViewer) renderVideos(edits, editsViewer);
if (filmsViewer) renderVideos(films, filmsViewer);
if (modelsViewer) renderEmbeds(models, modelsViewer);
if (postViewer) renderPosts(post, postViewer);

// Lightbox only if those elements exist
const overlay = document.getElementById("lightbox-overlay");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("lightbox-close");

if (overlay && lightboxImg && closeBtn) {
  document.querySelectorAll(".lightbox-img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      overlay.classList.remove("hidden");
    });
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.add("hidden");
  });
}

console.log("Script loaded successfully");