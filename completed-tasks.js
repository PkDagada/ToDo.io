// Load projects from localStorage
let projects = JSON.parse(localStorage.getItem('projects')) || [];

// Function to save projects to localStorage
function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Function to render completed projects
function renderCompletedTasks() {
    const completedTasksTableBody = document.getElementById('completed-tasks-table').getElementsByTagName('tbody')[0];
    completedTasksTableBody.innerHTML = ''; // Clear the table before re-rendering

    // Filter for completed projects
    const completedProjects = projects.filter(project => project.status === 'Completed');

    completedProjects.forEach(project => {
        const row = completedTasksTableBody.insertRow();
        row.innerHTML = `
            <td>${project.name}</td>
            <td>${project.assignedTo}</td>
            <td>${project.taskGivenBy}</td>
            <td>${project.assignDate}</td>
            <td>${project.dueDate}</td>
            <td>${project.completedBy}</td>
            <td>
                <button onclick="deleteTask(${project.id})">Delete Task</button>
            </td>
        `;

        // Render sub-projects with "Mark Complete" and "Delete" buttons
        project.subProjects.forEach((subProject, index) => {
            const subRow = completedTasksTableBody.insertRow();
            subRow.innerHTML = `
                <td style="padding-left: 20px;">- ${subProject.name}</td>
                <td>${subProject.assignedTo}</td>
                <td>${subProject.taskGivenBy}</td>
                <td>${subProject.assignDate}</td>
                <td>${subProject.dueDate}</td>
                <td>${subProject.status}</td>
                <td>
                    <button onclick="markSubProjectComplete(${project.id}, ${index})">
                        ${subProject.status === 'In Progress' ? 'Mark Complete' : 'Edit'}
                    </button>
                    <button onclick="deleteSubProject(${project.id}, ${index})">Delete</button>
                </td>
            `;
        });
    });
}

// Function to mark a sub-project as complete
function markSubProjectComplete(projectId, subProjectIndex) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const subProject = project.subProjects[subProjectIndex];
        if (subProject && subProject.status === 'In Progress') {
            subProject.status = 'Completed';
            subProject.completedBy = prompt("Completed By:");
            saveProjects();
            renderCompletedTasks();
        }
    }
}

// Function to delete a sub-project
function deleteSubProject(projectId, subProjectIndex) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        project.subProjects.splice(subProjectIndex, 1);
        saveProjects();
        renderCompletedTasks();
    }
}

// Function to delete a main project
function deleteTask(projectId) {
    projects = projects.filter(project => project.id !== projectId);
    saveProjects();
    renderCompletedTasks();
}

// Function to add a sub-project (with cancel option)
function addSubProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const subProjectName = prompt("Enter Sub-Project Name:");
        if (!subProjectName) return; // If canceled, exit function

        const subAssignedTo = prompt("Assigned To:");
        if (!subAssignedTo) return; // If canceled, exit function

        const subTaskGivenBy = prompt("Task Given By:");
        if (!subTaskGivenBy) return; // If canceled, exit function

        const subAssignDate = prompt("Assign Date:");
        if (!subAssignDate) return; // If canceled, exit function

        const subDueDate = prompt("Due Date:");
        if (!subDueDate) return; // If canceled, exit function

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
        renderCompletedTasks();
    }
}

// Load and render completed tasks on page load
window.onload = renderCompletedTasks;
