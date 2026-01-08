function setChoice(btn) {
    const group = btn.parentElement;
    group.querySelectorAll('.btn-choice').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function addNewGuest() {
    const container = document.getElementById('list-container');
    const addedGuests = container.querySelectorAll('.new-guest').length;
    
    if(addedGuests >= 1) return;

    const div = document.createElement('div');
    div.className = 'guest-item new-guest';
    // Assign a unique ID for the plus one
    div.setAttribute('data-id', 'plus_one_' + Date.now()); 
    div.innerHTML = `
        <div style="display:flex; align-items:center; flex:1; gap:10px; width:100%;">
            <input type="text" class="name-input" placeholder="Companion's Full Name">
            <button style="background:none; border:none; color:#ef9a9a; cursor:pointer;" onclick="removeGuest(this)">✕</button>
        </div>
        <div class="choice-group">
            <button class="btn-choice yes" onclick="setChoice(this)">YES</button>
            <button class="btn-choice no" onclick="setChoice(this)">NO</button>
        </div>
    `;
    container.appendChild(div);
    document.getElementById('plus-one-area').style.display = 'none';
}

function removeGuest(btn) {
    btn.closest('.guest-item').remove();
    document.getElementById('plus-one-area').style.display = 'block';
}

// New Submission Handler
function submitRSVP() {
    const guests = document.querySelectorAll('.guest-item');
    const responses = [];

    guests.forEach(guest => {
        const id = guest.getAttribute('data-id');
        
        // Get Name: Check if it's in a span or an input field
        let name = "";
        const nameSpan = guest.querySelector('.guest-name');
        const nameInput = guest.querySelector('.name-input');
        
        if (nameSpan) name = nameSpan.textContent;
        else if (nameInput) name = nameInput.value || "Unnamed Companion";

        // Get Choice
        const yesBtn = guest.querySelector('.btn-choice.yes');
        const noBtn = guest.querySelector('.btn-choice.no');
        
        let status = "No Response";
        if (yesBtn.classList.contains('active')) status = "Attending";
        if (noBtn.classList.contains('active')) status = "Not Attending";

        responses.push({
            id: id,
            guest_name: name,
            attendance: status
        });
    });

    console.log("--- RSVP Submission Received ---");
    console.table(responses); // Shows a nice table in the console
    alert("Thank you! Your response has been logged in the console.");
}