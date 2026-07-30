const API_URL = "http://localhost:5000/api/dashboard";

// Dashboard Cards
const totalDonors = document.getElementById("totalDonors");
const bloodUnits = document.getElementById("bloodUnits");
const totalRequests = document.getElementById("totalRequests");
const totalHospitals = document.getElementById("totalHospitals");

// ==========================
// Load Dashboard Statistics
// ==========================

async function loadDashboard() {

    try {

        const response = await fetch(API_URL);
        const data = await response.json();

        totalDonors.innerHTML = "👥 " + data.donors;
        bloodUnits.innerHTML = "❤️ " + data.bloodUnits;
        totalRequests.innerHTML = "📄 " + data.requests;
        totalHospitals.innerHTML = "🏥 " + data.hospitals;

    } catch (error) {

        console.error(error);

    }

}

loadDashboard();


// ==========================
// Live Date & Time
// ==========================

function updateClock() {

    const now = new Date();

    document.getElementById("currentDate").innerHTML =
        now.toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    document.getElementById("currentTime").innerHTML =
        now.toLocaleTimeString();

}

updateClock();

setInterval(updateClock,1000);


// ==========================
// Blood Group Pie Chart
// ==========================

new Chart(

document.getElementById("bloodGroupChart"),

{

type:"pie",

data:{

labels:[
"A+","A-",
"B+","B-",
"AB+","AB-",
"O+","O-"
],

datasets:[{

label:"Blood Groups",

data:[
25,
10,
18,
8,
12,
6,
30,
15
],

backgroundColor:[

"#ff6384",
"#36a2eb",
"#ffcd56",
"#4bc0c0",
"#9966ff",
"#ff9f40",
"#66bb6a",
"#ef5350"

]

}]

}

}

);


// ==========================
// Blood Stock Bar Chart
// ==========================

new Chart(

document.getElementById("bloodStockChart"),

{

type:"bar",

data:{

labels:[
"A+",
"A-",
"B+",
"B-",
"AB+",
"AB-",
"O+",
"O-"
],

datasets:[{

label:"Units",

data:[
25,
10,
18,
8,
12,
6,
30,
15
]

}]

},

options:{

responsive:true,

plugins:{

legend:{
display:false
}

}

}

}

);


// ==========================
// Low Stock Alert
// ==========================

const lowStock = document.getElementById("lowStockList");

lowStock.innerHTML = `

<p>🟡 AB- : 6 Units</p>

<p>🔴 B- : 8 Units</p>

`;


// ==========================
// Recent Requests
// ==========================

const recentTable = document.getElementById("recentRequestTable");

recentTable.innerHTML = `

<tr>

<td>Rahul</td>

<td>O+</td>

<td>Pending</td>

</tr>

<tr>

<td>Priya</td>

<td>A+</td>

<td>Approved</td>

</tr>

<tr>

<td>Ramesh</td>

<td>AB+</td>

<td>Pending</td>

</tr>

`;