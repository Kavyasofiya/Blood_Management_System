const API_URL = "http://localhost:5000/api/blood-stock";

const stockId = document.getElementById("stockId");
const bloodGroup = document.getElementById("blood_group");
const units = document.getElementById("units");
const expiryDate = document.getElementById("expiry_date");
const saveBtn = document.getElementById("saveBtn");
const stockTable = document.getElementById("stockTable");
const search = document.getElementById("search");

if (!stockTable) {
    console.error("stockTable element not found.");
} else {
    loadStock();
}

async function loadStock() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load blood stock");
        }

        const stocks = await response.json();

        stockTable.innerHTML = "";

        stocks.forEach(stock => {

            const row = `
                <tr>
                    <td>${stock.id}</td>
                    <td>${stock.blood_group}</td>
                    <td>${stock.units}</td>
                    <td>${stock.expiry_date ? stock.expiry_date.substring(0,10) : ""}</td>
                    <td>
                        <button onclick="editStock(${stock.id})">Edit</button>
                        <button onclick="deleteStock(${stock.id})">Delete</button>
                    </td>
                </tr>
            `;

            stockTable.insertAdjacentHTML("beforeend", row);

        });

    } catch (err) {
        console.error(err);
        alert("Unable to load blood stock.");
    }
}

if (saveBtn) {
    saveBtn.addEventListener("click", saveStock);
}

async function saveStock() {

    if (!bloodGroup.value || !units.value || !expiryDate.value) {
        alert("Please fill all fields.");
        return;
    }

    const stock = {
        blood_group: bloodGroup.value,
        units: units.value,
        expiry_date: expiryDate.value
    };

    try {

        let response;

        if (stockId.value === "") {

            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(stock)
            });

        } else {

            response = await fetch(`${API_URL}/${stockId.value}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(stock)
            });

        }

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Operation failed");
            return;
        }

        alert(data.message);

        clearForm();

        loadStock();

    } catch (err) {
        console.error(err);
        alert("Server Error");
    }

}

async function editStock(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        const stock = await response.json();

        stockId.value = stock.id;
        bloodGroup.value = stock.blood_group;
        units.value = stock.units;
        expiryDate.value = stock.expiry_date
            ? stock.expiry_date.substring(0,10)
            : "";

    } catch (err) {
        console.error(err);
    }

}

async function deleteStock(id) {

    if (!confirm("Delete this blood stock?")) return;

    try {

        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        loadStock();

    } catch (err) {
        console.error(err);
    }

}

if (search) {
    search.addEventListener("keyup", () => {

        const value = search.value.toLowerCase();

        Array.from(stockTable.rows).forEach(row => {

            row.style.display = row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";

        });

    });
}

function clearForm() {

    stockId.value = "";
    bloodGroup.value = "";
    units.value = "";
    expiryDate.value = "";

}