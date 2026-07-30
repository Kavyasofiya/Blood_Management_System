const API_URL = "http://localhost:5000/api/hospitals";

const hospitalId = document.getElementById("hospitalId");
const hospitalName = document.getElementById("hospital_name");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const contactPerson = document.getElementById("contact_person");

const saveBtn = document.getElementById("saveBtn");
const hospitalTable = document.getElementById("hospitalTable");
const search = document.getElementById("search");

// ==========================
// Load Hospitals
// ==========================

async function loadHospitals() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load hospitals");
        }

        const hospitals = await response.json();

        hospitalTable.innerHTML = "";

        hospitals.forEach(hospital => {

            hospitalTable.innerHTML += `
                <tr>
                    <td>${hospital.id}</td>
                    <td>${hospital.hospital_name}</td>
                    <td>${hospital.phone || ""}</td>
                    <td>${hospital.email || ""}</td>
                    <td>${hospital.contact_person || ""}</td>
                    <td>
                        <button class="edit-btn"
                            onclick="editHospital(${hospital.id})">
                            Edit
                        </button>

                        <button class="delete-btn"
                            onclick="deleteHospital(${hospital.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        hospitalTable.innerHTML = `
            <tr>
                <td colspan="6">Unable to load hospitals.</td>
            </tr>
        `;

    }

}

loadHospitals();


// ==========================
// Save / Update Hospital
// ==========================

saveBtn.addEventListener("click", async () => {

    const hospital = {

        hospital_name: hospitalName.value.trim(),
        address: address.value.trim(),
        phone: phone.value.trim(),
        email: email.value.trim() || null,
        contact_person: contactPerson.value.trim() || null

    };

    if (
        hospital.hospital_name === "" ||
        hospital.address === "" ||
        hospital.phone === ""
    ) {
        alert("Please fill all required fields.");
        return;
    }

    try {

        let response;

        if (hospitalId.value === "") {

            response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(hospital)

            });

        } else {

            response = await fetch(`${API_URL}/${hospitalId.value}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(hospital)

            });

        }

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert(data.message);

        clearForm();

        loadHospitals();

    } catch (error) {

        console.error(error);
        alert("Unable to connect to server.");

    }

});


// ==========================
// Edit Hospital
// ==========================

async function editHospital(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        const hospital = await response.json();

        hospitalId.value = hospital.id;
        hospitalName.value = hospital.hospital_name;
        address.value = hospital.address;
        phone.value = hospital.phone;
        email.value = hospital.email || "";
        contactPerson.value = hospital.contact_person || "";

    } catch (error) {

        console.error(error);

    }

}


// ==========================
// Delete Hospital
// ==========================

async function deleteHospital(id) {

    if (!confirm("Delete this hospital?")) return;

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        loadHospitals();

    } catch (error) {

        console.error(error);

    }

}


// ==========================
// Search
// ==========================

search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    const rows = hospitalTable.getElementsByTagName("tr");

    Array.from(rows).forEach(row => {

        row.style.display =
            row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";

    });

});


// ==========================
// Clear Form
// ==========================

function clearForm() {

    hospitalId.value = "";
    hospitalName.value = "";
    address.value = "";
    phone.value = "";
    email.value = "";
    contactPerson.value = "";

}