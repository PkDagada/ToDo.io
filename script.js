// script.js

let projects = JSON.parse(localStorage.getItem('projects')) || []; // Load projects from localStorage or initialize empty array

// Function to save projects to localStorage
function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function addProject() {
    const projectName = document.getElementById('project-name').value;
    const assignedTo = document.getElementById('assigned-to').value;
    const taskGivenBy = document.getElementById('assigned-by').value; // Updated to match the form ID
    const assignDate = document.getElementById('assign-date').value;
    const dueDate = document.getElementById('due-date').value;

    const newProject = {
        id: Date.now(),
        name: projectName,
        assignedTo,
        taskGivenBy, // Corrected variable name
        assignDate,
        dueDate,
        status: 'In Progress',
        completedBy: null,
        subProjects: []
    };

    projects.push(newProject);
    saveProjects();
    renderProjects();
    document.getElementById('project-form').reset(); // Reset form fields
}

// Function to render projects in the table
function renderProjects() {
    const projectTableBody = document.getElementById('project-table').getElementsByTagName('tbody')[0];
    projectTableBody.innerHTML = ''; // Clear the table before re-rendering

    projects.forEach(project => {
        const row = projectTableBody.insertRow();
        row.innerHTML = `
            <td>${project.name}</td>
            <td>${project.assignedTo}</td>
            <td>${project.taskGivenBy}</td>
            <td>${project.assignDate}</td>
            <td>${project.dueDate}</td>
            <td>${project.status}</td>
            <td>
                <button onclick="markComplete(${project.id})">${project.status === 'In Progress' ? 'Mark Complete' : 'Edit'}</button>
                <button onclick="deleteTask(${project.id})">Delete Task</button>
                <button onclick="addSubProject(${project.id})">Add Sub-Project</button>
            </td>
        `;

        // Render sub-projects, if any
        if (project.subProjects.length > 0) {
            project.subProjects.forEach(subProject => {
                const subRow = projectTableBody.insertRow();
                subRow.innerHTML = `
                    <td style="padding-left: 20px;">- ${subProject.name}</td>
                    <td>${subProject.assignedTo}</td>
                    <td>${subProject.taskGivenBy}</td>
                    <td>${subProject.assignDate}</td>
                    <td>${subProject.dueDate}</td>
                    <td>${subProject.status}</td>
                    <td></td>
                `;
            });
        }
    });
}

// Function to mark a project as complete and change button to "Edit"
function markComplete(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        if (project.status === 'In Progress') {
            project.status = 'Completed';
            project.completedBy = prompt("Completed By:");
        } else {
            // Logic to edit the project (if needed)
            alert("Editing feature to be implemented here.");
        }
        saveProjects();
        renderProjects();
    }
}

// Function to delete a project
function deleteTask(projectId) {
    projects = projects.filter(project => project.id !== projectId);
    saveProjects();
    renderProjects();
}

// Function to add a sub-project
function addSubProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const subProjectName = prompt("Enter Sub-Project Name:");
        const subAssignedTo = prompt("Assigned To:");
        const subTaskGivenBy = prompt("Assigned By:");
        const subAssignDate = prompt("Assign Date:");
        const subDueDate = prompt("Due Date:");

        const newSubProject = {
            name: subProjectName,
            assignedTo: subAssignedTo,
            taskGivenBy: subTaskGivenBy,
            assignDate: subAssignDate,
            dueDate: subDueDate,
            status: 'In Progress'
        };

        project.subProjects.push(newSubProject);
        saveProjects();
        renderProjects();
    }
}

// Load and render projects on page load
window.onload = renderProjects;
