const API_URL = "http://localhost:5000/api/auth/login";

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (data.success) {

            localStorage.setItem("token", data.token);

            localStorage.setItem("user", data.name || email);

            window.location.href = "dashboard.html";

        } else {

            message.style.color = "red";
            message.innerHTML = data.message;

        }

    } catch (error) {

        console.error(error);

        message.style.color = "red";
        message.innerHTML = "Server Error";

    }

});