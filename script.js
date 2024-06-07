// GETTING EACH OF MY ELEMENTS

const noteParagraph = document.querySelector(".note-paragraph");
const addBtn = document.querySelector(".add-btn");
const submitBtn = document.querySelector(".submit-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const content = document.getElementById("content");


// DISPLAYING MY POPUP
addBtn.addEventListener("click", function(){
    popUp.classList.add("show-popup")
});


// REMOVING MY POPUP
cancelBtn.addEventListener("click", function(){
    popUp.classList.remove("show-popup")
});


// DISPLAYING MY NOTES
// FIRSTLY I HAVE TO CREATE MY NOTE USING A FUNCTION
const popUp = document.querySelector(".popup");
function createNote(){
    const noteText = document.getElementById('content').value;
    if(noteText.trim() !== ""){
        const note ={
            id: new Date().getTime(),
            text:noteText
        };

        const existingNotes = JSON.parse(localStorage.getItem('userNotes')) || [];
        existingNotes.push(note);
        localStorage.setItem('userNotes', JSON.stringify(existingNotes));
        document.getElementById('content').value = '';

        popUp.classList.remove("show-popup");
        displayNotes();
    }
}


// THEN I HAVE TO DISPLAY THE NOTE THAT HAS BEEN CRAETED WITH THE ABOVE FUNCTION
const notes = document.querySelector(".notes");
function displayNotes(){
    notes.innerHTML = "";

    const mynotes = JSON.parse(localStorage.getItem('userNotes')) || [];
    mynotes.forEach(mynote => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<p class="title">${mynote.text}</p>
        <div class="btn-container">
            <button type="button" id="delete-btn" onclick="deleteNote(${mynote.id})">
                <i class="fa-solid fa-trash"></i> 
            </button>
            <button type="button" id="edit-btn" onclick="editNote(${mynote.id})">
                <i class="fa-solid fa-pen"></i>
            </button>
        </div>`;
        notes.appendChild(listItem)
    });
}


// TO EDIT MY NOTES
// function editNote(noteId){
//     const mynotes = JSON.parse(localStorage.getItem('userNotes')) || [];
//     const noteToEdit = mynotes.find(mynote => mynote.id == noteId);
//     const noteText = noteToEdit? noteToEdit.text: '';
//     const editPopup = document.querySelector(".edit-popup")
//     const editingPopup = document.createElement("div");

//     editingPopup.innerHTML =`
//     <div id="editing-container" data-note-id="${noteId}">
//         <button type="button" class="cancel-btn" id="cancel-edit" onclick="closeEdit()"><i class="fa-solid fa-times"></i></button>
//         <div class="input-container">
//         <h1>Edit Note</h1>
//             <textarea id="note-text">${noteText}</textarea>
//             <button type="submit" class="submit-btn" onclick="updateNote()">Done</button>
//         </div>
//     </div>
//     `;
//     editPopup.appendChild(editingPopup)
// }


// ´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´

// TO EDIT MY NOTES
function editNote(noteId) {
    const mynotes = JSON.parse(localStorage.getItem('userNotes')) || [];
    const noteToEdit = mynotes.find(mynote => mynote.id == noteId);
    const noteText = noteToEdit ? noteToEdit.text : '';
    let editingPopup = document.querySelector(".edit-popup #editing-container");

    // If editing popup already exists, update its content
    if (editingPopup) {
        editingPopup.querySelector("#note-text").value = noteText;
        editingPopup.setAttribute('data-note-id', noteId);
    } else {
        editingPopup = document.createElement("div");
        editingPopup.innerHTML = `
            <div id="editing-container" data-note-id="${noteId}">
                <button type="button" class="cancel-btn" id="cancel-edit" onclick="closeEdit()"><i class="fa-solid fa-times"></i></button>
                <div class="input-container">
                    <h1>Edit Note</h1>
                    <textarea id="note-text">${noteText}</textarea>
                    <button type="submit" class="submit-btn" onclick="updateNote()">Done</button>
                </div>
            </div>
        `;
        const editPopup = document.querySelector(".edit-popup");
        editPopup.appendChild(editingPopup);
    }
}

// ´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´

// TO CLOSE MY EDIT BUTTON
function closeEdit(){
    const editingPopup = document.getElementById("editing-container");
    if(editingPopup){
        editingPopup.parentElement.remove()
    }
}


// TO REPLACE PREVIOUS CONTENT WITH THE EDITED CONTENT 
function updateNote(){
    const noteText = document.getElementById('note-text').value.trim();
    const editingPopup = document.getElementById('editing-container');

    if (noteText !== ''){
        const noteId = editingPopup.getAttribute('data-note-id');
        let mynotes = JSON.parse(localStorage.getItem('userNotes')) || [];
        
        const updatedNotes = mynotes.map(mynote =>{
            if(mynote.id == noteId){
                return{id: mynote.id, text:noteText};
            }
            return mynote
        })

        localStorage.setItem('userNotes', JSON.stringify(updatedNotes));

        editingPopup.parentElement.remove()

        displayNotes();
    }
}


// TO DELETE MY NOTES
function deleteNote(noteId){
    let mynotes = JSON.parse(localStorage.getItem('userNotes')) || [];
    mynotes = mynotes.filter(mynote => mynote.id !== noteId);

    localStorage.setItem('userNotes', JSON.stringify(mynotes));
    displayNotes();
}
// displayNotes();




window.addEventListener('load', function(){
    displayNotes();
});











