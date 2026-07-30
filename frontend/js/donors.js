console.log("✅ donors.js loaded");
const API_URL = "http://localhost:5000/api/donors";

const donorId = document.getElementById("donorId");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const bloodGroupInput = document.getElementById("blood_group");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const lastDonationInput = document.getElementById("last_donation");

const saveBtn = document.getElementById("saveBtn");
const donorTable = document.getElementById("donorTable");
const searchInput = document.getElementById("search");

// ======================
// Load Donors
// ======================
async function loadDonors() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load donors");
        }

        const donors = await response.json();

        donorTable.innerHTML = "";

        donors.forEach(donor => {

            donorTable.innerHTML += `
                <tr>
                    <td>${donor.id}</td>
                    <td>${donor.name}</td>
                    <td>${donor.age}</td>
                    <td>${donor.blood_group}</td>
                    <td>${donor.phone}</td>
                    <td>
                        <button class="edit-btn" onclick="editDonor(${donor.id})">
                            Edit
                        </button>

                        <button class="delete-btn" onclick="deleteDonor(${donor.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {

        console.error(error);
        donorTable.innerHTML = `
            <tr>
                <td colspan="6">Unable to load donors.</td>
            </tr>
        `;

    }

}

loadDonors();


// ======================
// Add / Update Donor
// ======================

saveBtn.addEventListener("click", async () => {

    const donor = {

    name: nameInput.value.trim(),
    age: ageInput.value,
    gender: genderInput.value,
    blood_group: bloodGroupInput.value,
    phone: phoneInput.value.trim(),
    address: addressInput.value.trim(),
    last_donation: lastDonationInput.value || null

};

    if (
        donor.name === "" ||
        donor.age === "" ||
        donor.gender === "" ||
        donor.blood_group === "" ||
        donor.phone === "" ||
        donor.address === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    try {

        let response;

        if (donorId.value === "") {

            response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(donor)

            });

        } else {

            response = await fetch(`${API_URL}/${donorId.value}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(donor)

            });

        }

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert(data.message);

        clearForm();

        await loadDonors();

    } catch (error) {

        console.error(error);
        alert("Unable to connect to server.");

    }

});


// ======================
// Edit Donor
// ======================

async function editDonor(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        const donor = await response.json();

        donorId.value = donor.id;
        nameInput.value = donor.name;
        ageInput.value = donor.age;
        genderInput.value = donor.gender;
        bloodGroupInput.value = donor.blood_group;
        phoneInput.value = donor.phone;
        addressInput.value = donor.address;

        lastDonationInput.value =
            donor.last_donation
                ? donor.last_donation.substring(0, 10)
                : "";

    } catch (error) {

        console.error(error);

    }

}


// ======================
// Delete Donor
// ======================

async function deleteDonor(id) {

    if (!confirm("Delete this donor?")) return;

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        loadDonors();

    } catch (error) {

        console.error(error);

    }

}


// ======================
// Search
// ======================

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const rows = donorTable.getElementsByTagName("tr");

    Array.from(rows).forEach(row => {

        row.style.display = row.innerText
            .toLowerCase()
            .includes(value)
            ? ""
            : "none";

    });

});


// ======================
// Clear Form
// ======================

function clearForm() {

    donorId.value = "";
    nameInput.value = "";
    ageInput.value = "";
    genderInput.value = "";
    bloodGroupInput.value = "";
    phoneInput.value = "";
    addressInput.value = "";
    lastDonationInput.value = "";

}