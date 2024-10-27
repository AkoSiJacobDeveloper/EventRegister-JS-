const flipContainer = document.querySelector('.flip-container');

function toggleFlip() {
    flipContainer.classList.toggle('flipped');
}

// Logout Functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.href = "Index.html";
})


function signup() {
    const newEmail = document.getElementById('new-email').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!newEmail || !newPassword || !confirmPassword) {
        alert("Please fill in all fields!");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const user = { email: newEmail, password: newPassword };
    localStorage.setItem(newEmail, JSON.stringify(user));
    alert("Account created successfully!");

    toggleFlip();

    window.location.href = "Home.html";
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Please fill in all fields!");
        return;
    }

    const storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser && storedUser.password === password) {
        alert("Login successful!");
        window.location.href = "Home.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
}

// Highlight current page in the navigation
document.addEventListener("DOMContentLoaded", function() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.href.includes(currentLocation)) {
            link.classList.add('active');
        }
    });
});
