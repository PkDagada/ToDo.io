// Load projects from localStorage
const projects = JSON.parse(localStorage.getItem('projects')) || [];

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
        `;

        // Render sub-projects, if any
        if (project.subProjects.length > 0) {
            project.subProjects.forEach(subProject => {
                const subRow = completedTasksTableBody.insertRow();
                subRow.innerHTML = `
                    <td style="padding-left: 20px;">- ${subProject.name}</td>
                    <td>${subProject.assignedTo}</td>
                    <td>${subProject.taskGivenBy}</td>
                    <td>${subProject.assignDate}</td>
                    <td>${subProject.dueDate}</td>
                    <td>${subProject.status}</td>
                `;
            });
        }
    });
}

// Load and render completed tasks on page load
window.onload = renderCompletedTasks;
