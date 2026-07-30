const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        localStorage.removeItem("token");

        window.location.href = "login.html";

    });

}