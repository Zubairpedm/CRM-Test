document.addEventListener('DOMContentLoaded', () => {
    const contacts = [];
    const leads = [];
    const tasks = [];

    // --- Tab Switching Logic ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // --- Helper Functions to Render Lists ---
    function renderContacts() {
        const contactList = document.getElementById('contactList');
        contactList.innerHTML = ''; // Clear current list

        contacts.forEach((contact, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div>
                    <strong>${contact.name}</strong><br>
                    <span>Email: ${contact.email || 'N/A'}</span><br>
                    <span>Phone: ${contact.phone || 'N/A'}</span>
                </div>
                <button data-index="${index}" data-type="contact">Delete</button>
            `;
            contactList.appendChild(listItem);
        });
    }

    function renderLeads() {
        const leadList = document.getElementById('leadList');
        leadList.innerHTML = ''; // Clear current list

        leads.forEach((lead, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div>
                    <strong>${lead.name}</strong><br>
                    <span>Email: ${lead.email || 'N/A'}</span><br>
                    <span class="lead-status-${lead.status.toLowerCase()}">Status: ${lead.status}</span>
                </div>
                <button data-index="${index}" data-type="lead">Delete</button>
            `;
            leadList.appendChild(listItem);
        });
    }

    function renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Clear current list

        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div>
                    <strong>${task.description}</strong><br>
                    <span>Due: ${task.dueDate || 'N/A'}</span>
                </div>
                <button data-index="${index}" data-type="task">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    // --- Add Form Submissions ---
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;

        if (name) {
            contacts.push({ name, email, phone });
            renderContacts();
            e.target.reset(); // Clear form
        }
    });

    document.getElementById('leadForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('leadName').value;
        const email = document.getElementById('leadEmail').value;
        const status = document.getElementById('leadStatus').value;

        if (name) {
            leads.push({ name, email, status });
            renderLeads();
            e.target.reset(); // Clear form
        }
    });

    document.getElementById('taskForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('taskDescription').value;
        const dueDate = document.getElementById('taskDueDate').value;

        if (description) {
            tasks.push({ description, dueDate });
            renderTasks();
            e.target.reset(); // Clear form
        }
    });

    // --- Delete Functionality (Delegation) ---
    document.body.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.dataset.index !== undefined) {
            const index = parseInt(e.target.dataset.index);
            const type = e.target.dataset.type;

            if (type === 'contact') {
                contacts.splice(index, 1);
                renderContacts();
            } else if (type === 'lead') {
                leads.splice(index, 1);
                renderLeads();
            } else if (type === 'task') {
                tasks.splice(index, 1);
                renderTasks();
            }
        }
    });

    // Initial render when page loads
    renderContacts();
    renderLeads();
    renderTasks();
});
