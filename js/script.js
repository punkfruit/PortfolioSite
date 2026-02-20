import { films } from "../data/films.js";
import { edits } from "../data/edits.js";

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
    });
}

// Call it for both datasets only if the container exists
if (editsViewer) {
    renderVideos(edits, editsViewer);
    revealSections();
}
if (filmsViewer) {
    renderVideos(films, filmsViewer);
    revealSections();
}

function revealSections() {
    console.log("Revealing sections...");
    const sections = document.querySelectorAll(".rendered-section");

    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add("visible");
        }, index * 500); // Stagger the animation by 500ms for each section
    });
}

renderVideos();



