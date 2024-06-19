const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");


function updateMessage(){
    const textlength = tasks.children.length;
    messageSpan.textContent = `You have ${textlength} pending tasks`;
}
updateMessage();

addForm.addEventListener("submit", event =>{
    event.preventDefault();
    const value = addForm.task.value.trim();

    if(value.length){
        tasks.innerHTML += `<li>
                                <span>${value}</span>
                                <i class="bi bi-trash-fill delete"></i>
                            </li>`
        addForm.reset();
        updateMessage();
    }
});

tasks.addEventListener("click", event => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        updateMessage();
    }
    
});

clearAll.addEventListener("click", event => {
    const taskitem = tasks.querySelectorAll("li");
    taskitem.forEach(item => {
        item.remove();
    });
    updateMessage();
});

function filtertask(term){
    Array.from(tasks.children)
    .filter(task => {
        return !task.textContent.toLowerCase().includes(term);
    })
    .forEach(task => {
        task.classList.add("hide");
    })

    Array.from(tasks.children)
    .filter(task => {
        return task.textContent.toLowerCase().includes(term);
    })
    .forEach(task => {
        task.classList.remove("hide");
    })
}

searchForm.addEventListener("keyup", event => {
    const term = searchForm.task.value.trim().toLowerCase();
    filtertask(term)
});

searchForm.addEventListener("click", event => {
    if(event.target.classList.contains("reset")){
        searchForm.reset();
        const term = searchForm.task.value.trim();
        filtertask(term)
    }
})