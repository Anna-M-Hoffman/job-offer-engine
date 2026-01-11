// Generate or get persistent client ID
let clientId = localStorage.getItem("clientId");
if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem("clientId", clientId);
}

const form = document.getElementById("jobOfferForm");
const tableBody = document.querySelector("#offersTable tbody");

// Submit form via fetch
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const offer = {
        jobTitle: document.getElementById("jobTitle").value,
        location: document.getElementById("location").value,
        offerSalary: parseFloat(document.getElementById("offerSalary").value),
        salaryWeight: parseFloat(document.getElementById("salaryWeight").value),
        locationWeight: parseFloat(document.getElementById("locationWeight").value),
        growthWeight: parseFloat(document.getElementById("growthWeight").value)
    };

    const response = await fetch("/api/job-offers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Client-Id": clientId
        },
        body: JSON.stringify(offer)
    });

    const savedOffer = await response.json();
    addOfferToTable(savedOffer);
    form.reset();
});

// Fetch and display existing offers
async function loadOffers() {
    const response = await fetch("/api/job-offers", {
        headers: { "X-Client-Id": clientId }
    });
    const offers = await response.json();
    offers.forEach(addOfferToTable);
}

function addOfferToTable(offer) {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = offer.jobTitle;
    row.insertCell(1).textContent = offer.location;
    row.insertCell(2).textContent = offer.offerSalary;
    row.insertCell(3).textContent = offer.score.toFixed(2);
}

// Load offers on page load
loadOffers();
