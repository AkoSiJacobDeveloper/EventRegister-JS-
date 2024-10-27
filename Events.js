document.addEventListener("DOMContentLoaded", () => {
    const eventsTable = document.getElementById("eventsTable").getElementsByTagName("tbody")[0];
    const addEventBtn = document.getElementById("addEventBtn");

    function loadEvents() {
        const events = localStorage.getItem("events");
        return events ? JSON.parse(events) : [];
    }

    function saveEvents(events) {
        localStorage.setItem("events", JSON.stringify(events));
    }

    function renderEvents() {
        const events = loadEvents();
        eventsTable.innerHTML = "";

        events.forEach((event, index) => {
            const row = eventsTable.insertRow();
            row.insertCell(0).textContent = event.name;        
            row.insertCell(1).textContent = event.date;
            row.insertCell(2).textContent = event.location;
            row.insertCell(3).textContent = event.description;
            row.insertCell(4).textContent = event.organizer;

            const actionsCell = row.insertCell(5);
            const dropdown = document.createElement("div");
            dropdown.className = "dropdown";

            const dropdownButton = document.createElement("button");
            dropdownButton.className = "dropbtn";
            dropdownButton.textContent = "Actions";

            const dropdownContent = document.createElement("div");
            dropdownContent.className = "dropdown-content";

            const registerAction = document.createElement("a");
            registerAction.textContent = "Register";
            registerAction.onclick = () => registerEvent(index); // Call register directly
            dropdownContent.appendChild(registerAction);

            const updateAction = document.createElement("a");
            updateAction.textContent = "Update";
            updateAction.onclick = () => updateEvent(index);
            dropdownContent.appendChild(updateAction);

            const deleteAction = document.createElement("a");
            deleteAction.textContent = "Delete";
            deleteAction.onclick = () => deleteEvent(index);
            dropdownContent.appendChild(deleteAction);

            dropdown.appendChild(dropdownButton);
            dropdown.appendChild(dropdownContent);
            actionsCell.appendChild(dropdown);
        });
    }

    function registerEvent(index) {
        const events = loadEvents();
        const event = events[index];
        alert(`Registered for ${event.name}!`); // Alerting the user
        deleteEvent(index); // Remove the event after registering
    }

    function updateEvent(index) {
        const events = loadEvents();
        const name = prompt("Enter new event name:", events[index].name);
        const date = prompt("Enter new event date (YYYY-MM-DD):", events[index].date);
        const location = prompt("Enter new event location:", events[index].location);
        const description = prompt("Enter new event description:", events[index].description);
        const organizer = prompt("Enter new event organizer:", events[index].organizer);

        if (name && date && location && description && organizer) {
            events[index] = { name, date, location, description, organizer };
            saveEvents(events);
            renderEvents();
        } else {
            alert("All fields are required!");
        }
    }

    function deleteEvent(index) {
        let events = loadEvents();
        events.splice(index, 1); // Remove the event from the array
        saveEvents(events);
        renderEvents();
    }

    addEventBtn.addEventListener("click", () => {
        const name = prompt("Enter event name:");
        const date = prompt("Enter event date (YYYY-MM-DD):");
        const location = prompt("Enter event location:");
        const description = prompt("Enter event description:");
        const organizer = prompt("Enter event organizer:");

        if (name && date && location && description && organizer) {
            const events = loadEvents();
            events.push({ name, date, location, description, organizer }); 
            saveEvents(events);
            renderEvents();
        } else {
            alert("All fields are required!");
        }
    });

    renderEvents();
});
