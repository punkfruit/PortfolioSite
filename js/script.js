import { films } from "../data/films.js";
import { edits } from "../data/edits.js";
import { photography } from "../data/photography.js";

const filmsViewer = document.getElementById("films-viewer");
const editsViewer = document.getElementById("edits-viewer");
const photographyViewer = document.getElementById("photography-viewer");

// Create a mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav");
menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
});
// Close mobile menu when a link is clicked
nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });
});

console.log(filmsViewer);
console.log(editsViewer);
console.log(photographyViewer);

// Function to render videos for both films and edits pages 
function renderVideos(dataArray, container) {
    dataArray.forEach((item, index) => {
        item.id = index;

        const title = document.createElement("h2");
        const section = document.createElement("section");
        const frame = document.createElement("iframe");
        const date = document.createElement("h4");
        const description = document.createElement("p");
        
        section.classList.add("rendered-section");

        // content
        title.textContent = item.title;
        date.textContent = item.date;
        description.textContent = item.description;

        // iframe - handle both youtubeId and link formats
        frame.src = `https://www.youtube.com/embed/${item.youtubeId}`;
        
        frame.title = item.title;
        frame.allowFullscreen = true;
        frame.loading = "lazy";


        section.append( frame, title, date, description);
        container.appendChild(section);

        setTimeout(() => {
            section.classList.add("visible");
        }, index * 500);
    });
}

//Function to render photography Section
function renderPhotography(dataArray, container) {
    dataArray.forEach((item) => {

        item.images.forEach((image) => {

            const img = document.createElement("img");
            const div = document.createElement("div");

            img.src = image.src;
            img.alt = image.alt;
            img.loading = "lazy";
            img.classList.add("gallery-img")
            div.appendChild(img);

            container.appendChild(div);

           

            console.log(`Rendered image: ${image.alt}`);
        });
    });
}


// Call it for both datasets only if the container exists
if (photographyViewer) {
    renderPhotography(photography, photographyViewer);
}

if (editsViewer) {
    renderVideos(edits, editsViewer);
}

if (filmsViewer) {
    renderVideos(films, filmsViewer);
}

// Add lightbox functionality for photography section

const overlay = document.getElementById("lightbox-overlay");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("lightbox-close");

document.querySelectorAll(".gallery-img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    overlay.classList.remove("hidden");
  });
});

closeBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.add("hidden");
  }
});




console.log("Cohen Commit Test");



