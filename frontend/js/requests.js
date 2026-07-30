const API_URL = "http://localhost:5000/api/requests";

const requestId = document.getElementById("requestId");
const patientName = document.getElementById("patient_name");
const hospital = document.getElementById("hospital");
const bloodGroup = document.getElementById("blood_group");
const unitsRequired = document.getElementById("units_required");
const status = document.getElementById("status");
const saveBtn = document.getElementById("saveBtn");
const requestTable = document.getElementById("requestTable");
const search = document.getElementById("search");

// Load Requests
async function loadRequests() {

    try {

        const response = await fetch(API_URL);
        const requests = await response.json();

        requestTable.innerHTML = "";

        requests.forEach(req => {

            let statusClass = "";

            if (req.status === "Approved") {
                statusClass = "approved";
            } else if (req.status === "Rejected") {
                statusClass = "rejected";
            } else {
                statusClass = "pending";
            }

            requestTable.innerHTML += `
                <tr>
                    <td>${req.id}</td>
                    <td>${req.patient_name}</td>
                    <td>${req.hospital}</td>
                    <td>${req.blood_group}</td>
                    <td>${req.units_required}</td>
                    <td class="${statusClass}">
                        ${req.status}
                    </td>
                    <td>${new Date(req.request_date).toLocaleDateString()}</td>
                    <td>
                        <button class="edit-btn"
                            onclick="editRequest(${req.id})">
                            Edit
                        </button>

                        <button class="delete-btn"
                            onclick="deleteRequest(${req.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

loadRequests();

// Save Request
saveBtn.addEventListener("click", async () => {

    const request = {

        patient_name: patientName.value,
        hospital: hospital.value,
        blood_group: bloodGroup.value,
        units_required: unitsRequired.value,
        status: status.value

    };

    try {

        let response;

        if (requestId.value === "") {

            response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(request)

            });

        } else {

            response = await fetch(`${API_URL}/${requestId.value}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(request)

            });

        }

        const data = await response.json();

        if (data.success) {

            alert(data.message);

            clearForm();

            loadRequests();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

});

// Edit Request
async function editRequest(id) {

    const response = await fetch(`${API_URL}/${id}`);

    const req = await response.json();

    requestId.value = req.id;
    patientName.value = req.patient_name;
    hospital.value = req.hospital;
    bloodGroup.value = req.blood_group;
    unitsRequired.value = req.units_required;
    status.value = req.status;

}

// Delete Request
async function deleteRequest(id) {

    if (!confirm("Delete this request?")) return;

    await fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    });

    loadRequests();

}

// Search
search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    const rows = requestTable.getElementsByTagName("tr");

    Array.from(rows).forEach(row => {

        row.style.display = row.innerText
            .toLowerCase()
            .includes(value)
            ? ""
            : "none";

    });

});

// Clear Form
function clearForm() {

    requestId.value = "";
    patientName.value = "";
    hospital.value = "";
    bloodGroup.value = "";
    unitsRequired.value = "";
    status.value = "Pending";

}