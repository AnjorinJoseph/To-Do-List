

var addBtn = document.querySelector
("#add-btn");
var newTaskInput = document.querySelector
("#wrapper input");
var tasksContainer = document.querySelector
("#tasks");
var error = document.getElementById
("error");
var countValue = document.querySelector(".count-value");

let taskCount = 0;

var displayCount = (taskCount) => {
    countValue.innerText = taskCount;
    saveData()
};

var addTask = () => {
    var taskName = newTaskInput.value.trim();
    error.style.display = "none"
    if(!taskName){
        setTimeout(() => {
            error.style.display = "block"
        }, 200);
        saveData()
        return;
    }

    var task = `<div class="task">
    <input type="checkbox" class="task-check">
    <span class="taskname">${taskName}</span>
    <button class="edit">
    <i class="fa fa-pencil" aria-hidden="true"></i>
    </button>
    <button class="delete">
    <i class="fa fa-trash" aria-hidden="true"></i>
     </button>
     </div>`;

     tasksContainer.insertAdjacentHTML
     ("beforeend", task);

     var deleteButtons = document.querySelectorAll(".delete");
     deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
            saveData()
        };
    });

    

    var editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
        let targetElement = e.target;
        if (!(e.target.className == "edit")) {
            targetElement = e.target.parentElement;
        }
        newTaskInput.value =targetElement.previousElementsibling?.innerText;
        targetElement.parentNode.remove();
        taskCount -= 1;
        displayCount(taskCount);
        saveData()
    };
    });
    var tasksCheck = document.querySelectorAll
    (".task-check");
    tasksCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            if(checkBox.checked) {
                taskCount -= 1;
            } else {
                taskCount += 1;
            }
            displayCount(taskCount);
            saveData()
            };
        });
        taskCount += 1;
        displayCount(taskCount);
        newTaskInput.value = "";
        saveData()
    };
       

    /* FUNCTION TO ADD TASK */

    addBtn.addEventListener("click", addTask);

    window.onload = () => {
        taskCount = 0;
        displayCount(taskCount);
        newTaskInput.value="";
        saveData()
    };

    //  FUNCTION TO SAVE DATA TO LOCAL STORAGE Start.

function saveData(){
    localStorage.setItem("data", tasks.innerHTML)
}

function showTask(){
    tasks.innerHTML = localStorage.getItem("data");
}
showTask();


    //  FUNCTION TO SAVE DATA TO LOCAL STORAGE End.







fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json())
.then(data => {
    users = data.map(user => {
    var card = userCardTemplate.content.cloneNode(true).children[0]
    var header = card.querySelector("[data-header]")
    var body = card.querySelector("[data-body]")
    header.textContent = user.name 
    body.textContent = user.email
    userCardContainer.append(card)
    return { name: user.name, email: user.email, element: card}
})
})

// Search Bar End


//Use JavaScript to handle the selected date and set a reminder.

document.getElementById('date-reminder').addEventListener('change', function() {
    // Get the selected date from the date picker
    const selectedDate = document.getElementById('date-reminder').value;

    // Create a Date object from the selected date
    const reminderDate = new Date(selectedDate);
    const timeDiff = reminderDate - new Date();

    if (timeDiff > 0) {
        // Set a timeout to notify the user when the time is reached
        setTimeout(function() {
            alert('Reminder: It\'s time!');
        }, timeDiff);
    } else {
        alert('Please select a future date and time for the reminder.');
    }
});

    // Set a reminder (you can customize this part based on your application)
    // setReminder(reminderDate);


function setReminder(date) {
    // Implement your reminder logic here (e.g., show a notification)
    alert('Reminder set for: ' + date.toDateString());
    saveData();
}


//This code listens for changes in the date picker and triggers the setReminder function with the selected date.



// Search Bar Start

document.addEventListener('DOMContentLoaded',function(){
    const searchBar = document.getElementById('search');
    var searchBox = document.getElementById('tasks');

    function updateTaskList(searchTerm){
        Array.from(searchBox.getElementsByTagName('div')).forEach(searchElement =>{
            const search = searchElement.textContent;
            if (search.toLowerCase().includes(searchTerm.toLowerCase())){
                searchElement.style.display = 'list-item';
            } else{
                searchElement.style.display = 'none';
            }
        });
    }

    searchBar.addEventListener('input', function (event){
        const searchTerm = event.target.value;
        updateTaskList(searchTerm);
    });


 Array.from(searchBox.getElementsByTagName('div')).forEach(searchElement =>{
    searchElement.className.add('task');
    saveData();
    
 });
});

// Search Bar Start End
