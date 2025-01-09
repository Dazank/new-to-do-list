let task_input = document.querySelector('#task-input');
let task_form = document.querySelector('.add-task');
let task_list = document.querySelector('.tasks');
let task_container = document.querySelector('.task_wrapper');
let searchbar = document.querySelector('.searchbar');
let alltasks = task_list.children;
let taskupdateForm = document.querySelector('.updateform');
let taskupdateInput = document.querySelector('#update-task');
let taskupdateBackground = document.querySelector('.popup_background');
let closeButton = document.querySelector('.close-button')
let searchForm = document.querySelector('.searchform')
let body = document.querySelector('body')
let savedTasks = localStorage.getItem("storage")
let parsedTasks = savedTasks ? JSON.parse(savedTasks):[]







// Create a new task component if there is content in the input field
let add_task = ()=>{
    
    if (task_input.value.length){
task_list.innerHTML+= `<li class="task-container">
          
            <p>${task_input.value.trim()}</p>
           <div class="button_container">
            <button class="edit-button"></button>
            <button class="delete-button"></button>
            <button class="done-button"></button>
          </div>
          
        </li>`

      
        parsedTasks.push(task_input.value.trim())
        localStorage.setItem("storage", JSON.stringify( parsedTasks))
        task_form.reset()
        console.log( parsedTasks)
        
    }
}





    

//Sort through all the tasks, compare the text content of the first element to the value of the search bar, 
// if the text content does not include the value, hide that task by adding the hidden class
searchbar.addEventListener('keyup', (e)=>{
    e.stopPropagation()
    e.preventDefault()
    let searchValue = searchbar.value
   let  filtered = Array.from(alltasks)

   filtered.forEach((task)=>{
    if(!task.firstElementChild.textContent
        .toLowerCase().includes(searchValue.toLowerCase().trim())){
            task.classList.add('hidden')
        }
        else{
            task.classList.remove('hidden')
        }
   })

        
   })

   searchForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    e.stopPropagation()
   })



task_form.addEventListener('submit', (e) =>{
    e.preventDefault();
    e.stopPropagation();
   
    add_task();
    
})

//Using event delegation, depending on the event target, perform a different function
task_container.addEventListener('click', (e)=>{
e.stopPropagation();
if (e.target.classList.contains('delete-button')){
e.target.parentElement.parentElement.remove()


}

else if(e.target.classList.contains('edit-button')){
    taskupdateBackground.classList.add('popup_background-active')
    taskupdateBackground.classList.remove('popup_background')
    taskupdateInput.setAttribute('placeholder', `${e.target.parentElement.parentElement.firstElementChild.textContent}`)
    e.target.parentElement.parentElement.firstElementChild.classList.add('toUpdate')

   

}

else if(e.target.classList.contains('done-button')){

    
    e.target.parentElement.parentElement.firstElementChild.classList.add('done-task')

  

    }
    
    

})

console.log(searchbar.value)

closeButton.addEventListener('click', (e)=>{
    e.stopPropagation();
    taskupdateBackground.classList.remove('popup_background-active');
    taskupdateBackground.classList.add('popup_background');
})

//Work on selection criteria for update 
taskupdateForm.addEventListener('submit', (e)=>{
e.preventDefault()
e.stopPropagation()


let updateValue = taskupdateInput.value
let  filtered = Array.from(alltasks)

let placeholder = taskupdateInput.getAttribute('placeholder')
filtered.forEach((task)=>{
    
 if(task.firstElementChild.textContent
     .toLowerCase().includes(placeholder.toLowerCase().trim())&& updateValue.length && 
     task.firstElementChild.classList.contains('toUpdate')){
        task.firstElementChild.textContent = updateValue
       
     taskupdateBackground.classList.remove('popup_background-active')
     taskupdateBackground.classList.add('popup_background')
     task.firstElementChild.classList.remove('toUpdate')}}
   
)
let  updatedTasks = []
filtered.forEach((task)=>{
console.log(task.firstElementChild.innerText)
   updatedTasks.push(task.firstElementChild.textContent)
     console.log(updatedTasks)
     parsedTasks = updatedTasks
     console.log(parsedTasks)
 }
)
localStorage.setItem("storage", JSON.stringify(parsedTasks))
taskupdateForm.reset()
})

window.addEventListener('load', (e)=>{
    e.stopPropagation()
   
   let loadedPage = JSON.parse( localStorage.getItem("savedPage"))
   if(loadedPage === !null || !undefined){
    task_list.innerHTML = loadedPage}


   })

   window.addEventListener('unload', ()=>{
    if(task_list.innerHTML != null || undefined){
    let savedPage = task_list.innerHTML
    localStorage.setItem("savedPage", JSON.stringify(savedPage))}
    
    
    
    })

body.addEventListener('click',(e)=>{
    e.stopPropagation()
    console.log( parsedTasks)
   
})

