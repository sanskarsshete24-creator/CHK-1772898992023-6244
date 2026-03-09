// ================= FIREBASE IMPORTS =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyCdkBv_HhWuIjqYIXnf1ifYpeN9ko75xUI",
  authDomain: "microintern-866dd.firebaseapp.com",
  projectId: "microintern-866dd",
  storageBucket: "microintern-866dd.firebasestorage.app",
  messagingSenderId: "547804412485",
  appId: "1:547804412485:web:2b4e21bd176d1af9c1c12c",
  measurementId: "G-B8HQZPBRJN"
};


// ================= INITIALIZE FIREBASE =================
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);



// ================= LOGIN FUNCTION =================
window.login = function () {

    let username = document.getElementById("username").value.trim();
    let role = document.getElementById("role").value;

    if (username === "") {
        alert("Please enter your name");
        return;
    }

    // Save user info in browser
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    // Redirect to main page
    window.location.href = "main.html";
};



// ================= SAVE USER TO FIREBASE =================
window.saveUserData = async function () {

    let username = localStorage.getItem("username");
    let role = localStorage.getItem("role");

    try {

        await addDoc(collection(db, "users"), {
            username: username,
            role: role,
            createdAt: new Date()
        });

        console.log("User saved to Firebase");

    } catch (error) {

        console.error("Error saving user:", error);

    }

};



// ================= SEARCH & FILTER =================
window.filterOpportunities = function () {

    let searchInput = document.getElementById("searchInput");
    let filterSelect = document.getElementById("filterSelect");

    if (!searchInput || !filterSelect) return;

    let searchValue = searchInput.value.toLowerCase();
    let filterValue = filterSelect.value;

    let cards = document.querySelectorAll(".opportunity-card");

    cards.forEach(card => {

        let text = card.innerText.toLowerCase();

        let matchesSearch = text.includes(searchValue);
        let matchesFilter = (filterValue === "all") || text.includes(filterValue.toLowerCase());

        if (matchesSearch && matchesFilter) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

};



// ================= ANIMATED COUNTERS =================
document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = +counter.getAttribute("data-target");

        let count = 0;

        const updateCounter = () => {

            const increment = target / 100;

            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }

        };

        updateCounter();

    });

});



// ================= SCROLL FADE-IN EFFECT =================
document.addEventListener("DOMContentLoaded", function () {

    const elements = document.querySelectorAll("section, .card");

    elements.forEach(el => {
        el.classList.add("fade-in");
    });

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, { threshold: 0.1 });

    elements.forEach(el => {
        observer.observe(el);
    });

});



// ================= SAVE SKILLS TO FIREBASE =================
window.saveSkills = async function () {

    let skills = document.getElementById("skillsInput").value;

    let username = localStorage.getItem("username");
    let role = localStorage.getItem("role");

    try {

        await addDoc(collection(db, "users"), {
            username: username,
            role: role,
            skills: skills,
            time: new Date()
        });

        alert("Skills saved to Firebase!");

    } catch (error) {

        console.error("Error:", error);
        alert("Error saving skills");

    }

};