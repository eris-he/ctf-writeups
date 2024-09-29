const base_url  = "https://target-jwt.chals.io";

textContent = {
    currentFunds: '1000000',
    winningUser: 'John Abernathy',
    pendingPayout: '334',
    payoutAccount: '12347878412323478979123431347893478'
};


// Initialize the content on page load
document.getElementById('currentFunds').textContent = "Current Funds: $" + textContent.currentFunds;
document.getElementById('winningUser').textContent = "Winning User: " + textContent.winningUser;
document.getElementById('pendingPayout').textContent = "Payout Amount: " + textContent.pendingPayout;
document.getElementById('payoutAccount').textContent = textContent.payoutAccount;


// Function to update content from server response
function updateContent(content) {
    textContent.currentFunds = content.currentFunds;
    textContent.winningUser = content.winningUser;
    textContent.pendingPayout = content.pendingPayout;
    textContent.payoutAccount = content.payoutAccount; //this needs to be a hidden form field
    document.getElementById('currentFunds').textContent = "Current Funds: $" + textContent.currentFunds;
    document.getElementById('winningUser').textContent = "Winning User: " + textContent.winningUser;
    document.getElementById('pendingPayout').textContent = "Payout Amount: $" + textContent.pendingPayout;
    document.getElementById('payoutAccount').textContent = textContent.payoutAccount;
}


// Function to send a POST request to approve payout
function approvePayout() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', base_url + '/api/v1/approve', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJQYXlvdXQgQXBwIiwibmFtZSI6ImFkbWluIiwiZW50aXRsZW1lbnRzIjoiQURNSU4tVVNFUi1QUk9EIn0.MSKbQJWjxULLDjLiGXUtO5KQjtmHPXqESvzkXq1DvtU'); //replace with auth token
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            const content = JSON.parse(this.responseText); //gotta parse the content of the response
            content.currentFunds = content.currentFunds - content.pendingPayout
            updateContent(content)
            showPopupMessage("Approved", 10000); //puts the content of the response in the popup window, after converting to a string
        } else if (this.readyState === XMLHttpRequest.DONE) {
            const content = JSON.parse(this.responseText); //gotta parse the content of the response
            showPopupMessage(content.error, 10000); // error popup message
        }
    }
    xhr.send(JSON.stringify({"currentFunds": textContent.currentFunds, "winningUser": textContent.winningUser, "pendingPayout": textContent.pendingPayout, "payoutAccount": textContent.payoutAccount}));
}



function denyPayout() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', base_url + '/api/v1/deny', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJQYXlvdXQgQXBwIiwibmFtZSI6ImFkbWluIiwiZW50aXRsZW1lbnRzIjoiQURNSU4tVVNFUi1QUk9EIn0.MSKbQJWjxULLDjLiGXUtO5KQjtmHPXqESvzkXq1DvtU'); //replace with auth token
    console.log("okay i got here");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            const content = JSON.parse(this.responseText); //gotta parse the content of the response
            updateContent(content);
            showPopupMessage("Denied", 10000); 
        } else if (this.readyState === XMLHttpRequest.DONE) {
            const content = JSON.parse(this.responseText); //gotta parse the content of the response
            showPopupMessage(content.error, 10000); // error popup message
        }
    }
    xhr.send(JSON.stringify({"currentFunds": textContent.currentFunds }));
}

/*
** remove before deployment**
function testFunction() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', base_url + '/api/v1/test', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'bearer xxxx'); //replace with bearer with the fin entitlement
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            xhr.send(JSON.stringify({operation: 'decline'}));
            showPopupMessage(JSON.stringify(content), 10000); //puts the content of the response in the popup window, after converting to a string
        } else if (this.readyState === XMLHttpRequest.DONE) {
            showPopupMessage("Application Issue", 1000); // 20 seconds?? 
        }
    };
    xhr.send(JSON.stringify({operation: 'decline'}));
}
*/

// Function to toggle the dropdown menu
function toggleDropdownMenu(event) {
    event.target.nextElementSibling.classList.toggle('show');
}

const denyPayoutButton = document.getElementById("deny-payout-button");
denyPayoutButton.addEventListener("click", denyPayout);

const approvePayoutButton = document.getElementById("approve-payout-button");
approvePayoutButton.addEventListener("click", approvePayout);


function showPopupMessage(message, duration = 2000) {
    const popupMessage = document.getElementById("popup-message");
    popupMessage.textContent = message;
    popupMessage.style.display = "block";
    setTimeout(() => {
        popupMessage.style.display = "none";
    }, duration);
}


// Attach click event listeners to the admin dropdown button and the payout buttons
document.querySelector('.dropbtn').addEventListener('click', toggleDropdownMenu);
document.querySelector('.grey-button').addEventListener('click', denyPayoutButton);
document.querySelector('.blue-button').addEventListener('click', approvePayoutButton);
