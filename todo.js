const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Function to add a task to the task list
function addTask() {
    // Get the task input and reminder time input values
    const taskInput = document.getElementById('task');
    const reminderTimeInput = document.getElementById('reminder-time');

    // Retrieve values entered by the user
    const task = taskInput.value.trim();
    const reminderTime = reminderTimeInput.value;

    // Check if the task input is not empty
    if (task === '') {
        alert('Please enter a task');
        return;
    }

    // Create a new list item (li) to represent the task
    const listItem = document.createElement('li');
    listItem.className = 'bg-gray-200 p-2 rounded-lg mb-2 shadow-md flex justify-between items-center';

    // Create a span to hold the task text
    const taskText = document.createElement('span');
    taskText.textContent = `${task}`;

    // Add the task text to the list item
    listItem.appendChild(taskText);

    // If the reminder time is set, display it
    if (reminderTime) {
        const reminderSpan = document.createElement('span');
        reminderSpan.textContent = ` (Reminder: ${new Date(reminderTime).toLocaleString()})`;
        reminderSpan.className = 'text-gray-500 ml-2';
        listItem.appendChild(reminderSpan);

        // Set up a reminder alert when the time arrives
        const reminderTimeInMs = new Date(reminderTime).getTime();
        const currentTimeInMs = new Date().getTime();
        const timeDifference = reminderTimeInMs - currentTimeInMs;

        if (timeDifference > 0) {
            setTimeout(() => {
                alert(`Reminder: ${task}`);
            }, timeDifference);
        }
    }

    // Create a delete button to remove the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'bg-red-500 text-white px-2 py-1 rounded ml-4';
    deleteButton.onclick = function () {
        listItem.remove(); // Remove the list item when the button is clicked
    };

    // Add the delete button to the list item
    listItem.appendChild(deleteButton);

    // Add the list item to the task list
    const taskList = document.getElementById('task-list');
    taskList.appendChild(listItem);

    // Clear the input fields after adding the task
    taskInput.value = '';
    reminderTimeInput.value = '';
}
