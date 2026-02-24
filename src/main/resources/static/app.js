// -------- UUID Cookie Setup Functions --------
function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days*24*60*60*1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// --------------Function to delete jobs -----------
function deleteJob(id, button) {

    const clientId = getCookie("clientId");

    fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
            "X-Client-Id": clientId
        }
    })
        .then(response => {
            if (!response.ok) throw new Error("Delete failed");

            const row = button.closest("tr");
            row.remove();
        })
        .catch(err => {
            alert(err.message);
        });
}

// Ensure clientId cookie exists
let clientId = getCookie('clientId');
if (!clientId) {
    clientId = crypto.randomUUID(); // generates a UUID
    setCookie('clientId', clientId, 365); // valid for 1 year
}




document.getElementById('submitBtn').addEventListener('click', function() {
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const location = document.getElementById('location').value.trim();
    const company = document.getElementById('company').value.trim();
    const salary = parseFloat(document.getElementById('salary').value);
    const desiredSalary = parseFloat(document.getElementById('desiredSalary').value);
    const status = document.getElementById('status').value.trim();

    // Build the request payload
    const requestData = {
        jobTitle,
        location,
        company,
        salary,
        desiredSalary,
        status
    };

    // Send POST request to Spring Boot API
    fetch('/api/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Client-Id': clientId
        },
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (!response.ok) throw new Error("Request failed: " + response.status);
            return response.json();
        })
        .then(data => {
            document.getElementById('result').innerHTML = `
            <strong>Saved Jobs:</strong><br>
            ID: ${data.id}<br>
            Client ID: ${data.clientId}<br>
            Job Title: ${data.jobTitle}<br>
            Location: ${data.location}<br>
            Job Salary: $${data.salary.toLocaleString()}<br>
            Desired Salary: $${data.desiredSalary.toLocaleString()}<br>
            Status: ${data.status}<br>
            Salary Score: ${data.score.toFixed(2)}
        `;
        })
        .catch(err => {
            document.getElementById('result').innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
        });
});

// View all jobs for a client
document.getElementById('viewBtn').addEventListener('click', function() {

    const clientId = getCookie("clientId");
    console.log("Client ID from cookie:", clientId); // <-- debug log

    if (!clientId) {
        document.getElementById('allJobs').innerHTML =
            "<span style='color:red;'>No client ID found.</span>";
        return;
    }

    fetch(`/api/jobs?clientId=${clientId}`)
        .then(response => {
            if (!response.ok) throw new Error("Request failed: " + response.status);
            return response.json();
        })
        .then(data => {
            if (!data.length) {
                document.getElementById('allJobs').innerHTML = "No jobs found.";
                return;
            }

            // Create table structure
            let html = `
                <table border="1" id="jobTable">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Company</th>
                            <th>Location</th>
                            <th>Salary</th>
                            <th>Desired</th>
                            <th>Status</th>
                            <th>Match</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(job => {
                html += `
                    <tr>
                        <td>${job.jobTitle}</td>
                        <td>${job.company ?? 'N/A'}</td>
                        <td>${job.location}</td>
                        <td>$${job.salary.toLocaleString()}</td>
                        <td>$${job.desiredSalary.toLocaleString()}</td>
                        <td>${job.status}</td>
                        <td>${Math.round(job.score * 100)}%</td>
                        <td>
                            <button onclick="deleteJob(${job.id}, this)">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });

            html += `
                    </tbody>
                </table>
            `;

            document.getElementById('allJobs').innerHTML = html;
        })
        .catch(err => {
            document.getElementById('allJobs').innerHTML =
                `<span style="color:red;">${err.message}</span>`;
        });
});