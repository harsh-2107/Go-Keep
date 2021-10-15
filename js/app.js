showNotes();
showPinnedNotes();
showArchiveNotes();
showTrashNotes();

// Add a note
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
});

// Search notes in any page
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
    if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
  })
})

// Show notes in different tabs
function showNotes() {
  let notes = localStorage.getItem("notes");
  let pinnedNotes = localStorage.getItem("Pinned Notes");
  pinnedNotesObj = JSON.parse(pinnedNotes);
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  let l = notesObj.length;
  notesObj.reverse().forEach(function (element) {
    l--
    html += `
            <div class="noteCard my-2 mx-2 card" id="note-card">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text" style="max-height: 263px; overflow-y: hidden;"> ${element.text}</p>
                        <button id="${l}" onclick="noteToTrash(this.id)" class="btn btn-warning" id="delete" style="outline: none; box-shadow: none; color: #fff; border-radius: 30px;">
                        <img src="img/trash.png" style="width: 16px; filter: invert(100%); margin-right: 0px; margin-bottom: 4px;">
                        </button>
                        <button id="${l}" onclick="editNote(this.id)" class="btn btn-warning" id="edit" style="outline: none; box-shadow: none; color: #fff; border-radius: 30px;">
                        <img src="img/edit.png" style="width: 16px; filter: invert(100%); margin-right: -2px; margin-bottom: 4px;">
                        </button>
                        <button id="${l}" onclick="pinNote(this.id)" class="btn btn-warning" id="pin" style="outline: none; box-shadow: none; color: #fff; border-radius: 30px;">
                        <img src="img/pin.png" style="width: 15px; filter: invert(100%); margin-right: 1px; margin-bottom: 4px; transform: rotate(315deg);">
                        </button>
                        <button id="${l}" onclick="noteToArchive(this.id)" class="btn btn-warning" id="pin" style="outline: none; box-shadow: none; color: #fff; border-radius: 30px;">
                        <img src="img/archive.png" style="width: 16px; filter: invert(100%); margin-right: 2px; margin-bottom: 4px;">
                        </button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    if (pinnedNotesObj == 0 || pinnedNotes == null) {
      notesElm.innerHTML = `<div class="empty" style="width: 100%; height: 70vh; display: flex; justify-content: center; align-items: center;
        flex-direction: column;">
        <img src="img/idea.png" style="width: 100px; filter: invert(70%); margin-bottom: 1vh;">
        <h3 style="color: #80868b;
        cursor: default;
        font-family: 'Google Sans',Roboto,Arial,sans-serif;
        font-size: 1.375rem;
        font-weight: 400;
        letter-spacing: 0;
        line-height: 1.75rem;">Notes you add appear here</h3>
    </div>`;
    }
  }
}

function showPinnedNotes() {
  let pinnedNotes = localStorage.getItem("Pinned Notes");
  if (pinnedNotes == null) {
    pinnedNotesObj = [];
  } else {
    pinnedNotesObj = JSON.parse(pinnedNotes);
  }
  let html = "";
  let l = pinnedNotesObj.length;
  pinnedNotesObj.reverse().forEach(function (element) {
    console.log(element.title, element.text);
    l--
    html += `
            <div class="noteCard my-2 mx-2 card" id="note-card">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text" style="max-height: 263px; overflow-y: hidden;"> ${element.text}</p>
                        <button id="${l}"onclick="pinToTrash(this.id)" class="btn btn-warning" id="delete" style="outline: none; box-shadow: none; color: #fff; border-radius: 30px;">
                        <img src="img/trash.png" style="width: 15px; filter: invert(100%); margin-right: 0px; margin-bottom: 4px;">
                        </button>
                        <button id="${l}" onclick="editPinnedNote(this.id)" class="btn btn-warning" id="edit" style="outline: none; box-shadow: none; color: #fff; border-radius: 30px;">
                        <img src="img/edit.png" style="width: 15px; filter: invert(100%); margin-right: -2px; margin-bottom: 4px;">
                        </button>
                        <button id="${l}"onclick="unpinNote(this.id)" class="btn btn-warning" id="pin" style="outline: none; box-shadow: none; color: #fff; border-radius: 30px;">
                        <img src="img/pin.png" style="width: 15px; padding-right: 0px; filter: invert(100%); margin-right: 1px; margin-bottom: 4px; transform: rotate(315deg);">
                        </button>
                        <button id="${l}"onclick="pinToArchive(this.id)" class="btn btn-warning" id="pin" style="outline: none; box-shadow: none; color: #fff; border-radius: 30px;">
                        <img src="img/archive.png" style="width: 15px; filter: invert(100%); margin-right: 2px; margin-bottom: 4px;">
                        </button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("pin-notes");
  if (pinnedNotesObj.length != 0) {
    document.getElementById("heading").style.display = "";
    document.getElementById("heading1").style.display = "";
    notesElm.innerHTML = html;
  }
  else {
    document.getElementById("heading").style.display = "none";
    document.getElementById("heading1").style.display = "none";
  }
}

function showArchiveNotes() {
  let archiveNotes = localStorage.getItem("Archive Notes");
  if (archiveNotes == null) {
    archiveNotesObj = [];
  } else {
    archiveNotesObj = JSON.parse(archiveNotes);
  }
  let html = "";
  let l = archiveNotesObj.length;
  archiveNotesObj.reverse().forEach(function (element) {
    l--
    html += `
            <div class="noteCard my-2 mx-2 card" id="note-card">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text" style="max-height: 263px; overflow-y: hidden;"> ${element.text}</p>
                        <button id="${l}"onclick="archiveToTrash(this.id)" class="btn btn-warning" id="delete" style="outline: none; box-shadow: none; color: #fff; border-radius: 30px;">
                        <img src="img/trash.png" style="width: 15px; filter: invert(100%); margin-right: 0px; margin-bottom: 4px;">
                        </button>
                        <button id="${l}" onclick="editArchivedNote(this.id)" class="btn btn-warning" id="edit" style="outline: none; box-shadow: none; color: #fff; border-radius: 30px;">
                        <img src="img/edit.png" style="width: 15px; filter: invert(100%); margin-right: -2px; margin-bottom: 4px;">
                        </button>
                        <button id="${l}"onclick="archiveToNote(this.id)" class="btn btn-warning" id="pin" style="outline: none; box-shadow: none; color: #fff; border-radius: 30px;">
                        <img src="img/archive.png" style="width: 15px; filter: invert(100%); margin-right: 2px; margin-bottom: 4px;">
                        </button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("archive-notes");
  if (archiveNotesObj.length != 0) {
    notesElm.innerHTML = html;
  }
  else {
    notesElm.innerHTML = `<div class="empty" style="width: 100%; height: 70vh; display: flex; justify-content: center; align-items: center;
        flex-direction: column;">
        <img src="img/folder (2).png" style="width: 100px; filter: invert(70%); margin-bottom: 1vh;">
        <h3 style="color: #80868b;
        cursor: default;
        font-family: 'Google Sans',Roboto,Arial,sans-serif;
        font-size: 1.375rem;
        font-weight: 400;
        letter-spacing: 0;
        line-height: 1.75rem;">Archived Notes appear here</h3>
    </div>`;
  }
}

function showTrashNotes() {
  let trashNotes = localStorage.getItem("Trash Notes");
  if (trashNotes == null) {
    trashNotesObj = [];
  } else {
    trashNotesObj = JSON.parse(trashNotes);
  }
  let html = "";
  let l = trashNotesObj.length;
  trashNotesObj.reverse().forEach(function (element) {
    l--
    html += `
            <div class="noteCard my-2 mx-2 card" id="note-card">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text" style="max-height: 263px; overflow-y: hidden;"> ${element.text}</p>
                        <button id="${l}"onclick="DeleteFromTrash(this.id)" class="btn btn-warning" id="delete" style="outline: none; box-shadow: none; color: #fff; border-radius: 30px;">
                        <img src="img/trash.png" style="width: 15px; filter: invert(100%); margin-right: 0px; margin-bottom: 4px;">
                        </button>
                        <button id="${l}"onclick="restoreNote(this.id)" class="btn btn-warning" id="pin" style="outline: none; box-shadow: none; color: #fff; border-radius: 30px;">
                        <img src="img/restore.png" style="width: 15px; filter: invert(100%); margin-right: 2px; margin-bottom: 4px; transform: rotate(60deg);">
                        </button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("trash-notes");
  if (trashNotesObj.length != 0) {
    notesElm.innerHTML = html;
  }
  else {
    notesElm.innerHTML = `<div class="empty" style="width: 100%; height: 70vh; display: flex; justify-content: center; align-items: center;
        flex-direction: column;">
        <img src="img/trash-big.png" style="width: 100px; filter: invert(70%); margin-bottom: 1vh;">
        <h3 style="color: #80868b;
        cursor: default;
        font-family: 'Google Sans',Roboto,Arial,sans-serif;
        font-size: 1.375rem;
        font-weight: 400;
        letter-spacing: 0;
        line-height: 1.75rem;">Deleted Notes appear here</h3>
    </div>`;
  }
}

// Pin/Unpin notes
function pinNote(index) {
  let pinnedNotes = localStorage.getItem("Pinned Notes");
  let notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  if (pinnedNotes == null) {
    pinnedNotesObj = [];
  } else {
    pinnedNotesObj = JSON.parse(pinnedNotes);
  }
  let mypinnedObj = {
    title: notesObj.at(index).title,
    text: notesObj.at(index).text
  }
  pinnedNotesObj.push(mypinnedObj);
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("Pinned Notes", JSON.stringify(pinnedNotesObj));
  showNotes();
  showPinnedNotes();
  window.location.reload();
}

function unpinNote(index) {
  let pinnedNotes = localStorage.getItem("Pinned Notes");
  let notes = localStorage.getItem("notes");
  pinnedNotesObj = JSON.parse(pinnedNotes);
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: pinnedNotesObj.at(index).title,
    text: pinnedNotesObj.at(index).text
  }
  notesObj.push(myObj);
  pinnedNotesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("Pinned Notes", JSON.stringify(pinnedNotesObj));
  showNotes();
  showPinnedNotes();
  window.location.reload();
}

// Move notes to Archive
function noteToArchive(index) {
  let archiveNotes = localStorage.getItem("Archive Notes");
  let notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  if (archiveNotes == null) {
    archiveNotesObj = [];
  } else {
    archiveNotesObj = JSON.parse(archiveNotes);
  }
  let myarchiveObj = {
    title: notesObj.at(index).title,
    text: notesObj.at(index).text
  }
  archiveNotesObj.push(myarchiveObj);
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("Archive Notes", JSON.stringify(archiveNotesObj));
  window.location.reload();
  showNotes();
  showArchiveNotes();
}

function pinToArchive(index) {
  let archiveNotes = localStorage.getItem("Archive Notes");
  let pinnedNotes = localStorage.getItem("Pinned Notes");
  pinnedNotesObj = JSON.parse(pinnedNotes);
  if (archiveNotes == null) {
    archiveNotesObj = [];
  } else {
    archiveNotesObj = JSON.parse(archiveNotes);
  }
  let myarchiveObj = {
    title: pinnedNotesObj.at(index).title,
    text: pinnedNotesObj.at(index).text
  }
  archiveNotesObj.push(myarchiveObj);
  pinnedNotesObj.splice(index, 1);
  localStorage.setItem("Pinned Notes", JSON.stringify(pinnedNotesObj));
  localStorage.setItem("Archive Notes", JSON.stringify(archiveNotesObj));
  window.location.reload();
  showPinnedNotes();
  showArchiveNotes();
}

// Restore archived notes
function archiveToNote(index) {
  let archiveNotes = localStorage.getItem("Archive Notes");
  let notes = localStorage.getItem("notes");
  archiveNotesObj = JSON.parse(archiveNotes);
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: archiveNotesObj.at(index).title,
    text: archiveNotesObj.at(index).text
  }
  notesObj.push(myObj);
  archiveNotesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("Archive Notes", JSON.stringify(archiveNotesObj));
  showNotes();
  showArchiveNotes();
  // window.location.reload();
}

// Move notes to trash
function noteToTrash(index) {
  let notes = localStorage.getItem("notes");
  let trashNotes = localStorage.getItem("Trash Notes");
  notesObj = JSON.parse(notes);
  if (trashNotes == null) {
    trashNotesObj = [];
  } else {
    trashNotesObj = JSON.parse(trashNotes);
  }
  let mytrashObj = { title: notesObj.at(index).title, text: notesObj.at(index).text };
  trashNotesObj.push(mytrashObj);
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("Trash Notes", JSON.stringify(trashNotesObj));
  showNotes();
  showTrashNotes();
}

function pinToTrash(index) {
  let pinnedNotes = localStorage.getItem("Pinned Notes");
  let trashNotes = localStorage.getItem("Trash Notes");
  pinnedNotesObj = JSON.parse(pinnedNotes);
  if (trashNotes == null) {
    trashNotesObj = [];
  } else {
    trashNotesObj = JSON.parse(trashNotes);
  }
  let mytrashObj = { title: pinnedNotesObj.at(index).title, text: pinnedNotesObj.at(index).text };
  trashNotesObj.push(mytrashObj);
  pinnedNotesObj.splice(index, 1);
  localStorage.setItem("Pinned Notes", JSON.stringify(pinnedNotesObj));
  localStorage.setItem("Trash Notes", JSON.stringify(trashNotesObj));
  showPinnedNotes();
  showTrashNotes();
  window.location.reload();
}

function archiveToTrash(index) {
  let archiveNotes = localStorage.getItem("Archive Notes");
  let trashNotes = localStorage.getItem("Trash Notes");
  archiveNotesObj = JSON.parse(archiveNotes);
  if (trashNotes == null) {
    trashNotesObj = [];
  } else {
    trashNotesObj = JSON.parse(trashNotes);
  }
  let mytrashObj = { title: archiveNotesObj.at(index).title, text: archiveNotesObj.at(index).text };
  trashNotesObj.push(mytrashObj);
  archiveNotesObj.splice(index, 1);
  localStorage.setItem("Archive Notes", JSON.stringify(archiveNotesObj));
  localStorage.setItem("Trash Notes", JSON.stringify(trashNotesObj));
  showArchiveNotes();
  showTrashNotes();
}

// Permanently delete from Trash
function DeleteFromTrash(index) {
  let trashNotes = localStorage.getItem("Trash Notes");
  trashNotesObj = JSON.parse(trashNotes);
  trashNotesObj.splice(index, 1);
  localStorage.setItem("Trash Notes", JSON.stringify(trashNotesObj));
  showTrashNotes();
}

// Restore deleted notes
function restoreNote(index) {
  let trashNotes = localStorage.getItem("Trash Notes");
  let notes = localStorage.getItem("notes");
  trashNotesObj = JSON.parse(trashNotes);
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: trashNotesObj.at(index).title,
    text: trashNotesObj.at(index).text
  }
  notesObj.push(myObj);
  trashNotesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("Trash Notes", JSON.stringify(trashNotesObj));
  showNotes();
  showTrashNotes();
}

// Edit notes in different tabs
function editNote(index) {
  let notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  let archiveNotes = localStorage.getItem("Archive Notes");
  archiveNotesObj = JSON.parse(archiveNotes);
  let pinnedNotes = localStorage.getItem("Pinned notes");
  pinnedNotesObj = JSON.parse(pinnedNotes);
  let editForm = document.getElementById("edit-note-container");
  let editTitle = document.getElementById("edit-note-title-input");
  let editTxt = document.getElementById("edit-note-text-input");
  let save = document.getElementById("save");
  let close = document.getElementById("close");

  editForm.style.display = "flex";
  editTitle.value = notesObj.at(index).title;
  editTxt.value = notesObj.at(index).text;

  save.addEventListener("click", function () {
    editForm.style.display = "none";
    let myObj = {
      title: editTitle.value, text: editTxt.value
    };
    notesObj.splice(index, 1, myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    editTitle.value = "";
    editTxt.value = "";
  });

  close.addEventListener("click", function () {
    editForm.style.display = "none";
    editTitle.value = "";
    editTxt.value = "";
  });

}

function editPinnedNote(index) {
  let pinnedNotes = localStorage.getItem("Pinned Notes");
  pinnedNotesObj = JSON.parse(pinnedNotes);
  let editForm = document.getElementById("edit-note-container");
  let editTitle = document.getElementById("edit-note-title-input");
  let editTxt = document.getElementById("edit-note-text-input");
  let save = document.getElementById("save");
  let close = document.getElementById("close");

  editForm.style.display = "flex";
  editTitle.value = pinnedNotesObj.at(index).title;
  editTxt.value = pinnedNotesObj.at(index).text;

  save.addEventListener("click", function () {
    editForm.style.display = "none";
    let Title = editTitle.value;
    let Text = editTxt.value;
    let mypinnedObj = {title: Title, text: Text};
    pinnedNotesObj.splice(index, 1, mypinnedObj);
    localStorage.setItem("Pinned Notes", JSON.stringify(pinnedNotesObj));
    showPinnedNotes();
    editTitle.value = "";
    editTxt.value = "";
  });

  close.addEventListener("click", function () {
    editForm.style.display = "none";
    editTitle.value = "";
    editTxt.value = "";
  });
}

function editArchivedNote(index) {
  let archiveNotes = localStorage.getItem("Archive Notes");
  archiveNotesObj = JSON.parse(archiveNotes);
  let editForm = document.getElementById("edit-note-container");
  let editTitle = document.getElementById("edit-note-title-input");
  let editTxt = document.getElementById("edit-note-text-input");
  let save = document.getElementById("save");
  let close = document.getElementById("close");

  editForm.style.display = "flex";
  editTitle.value = archiveNotesObj.at(index).title;
  editTxt.value = archiveNotesObj.at(index).text;

  save.addEventListener("click", function () {
    editForm.style.display = "none";
    let myarchiveObj = {
      title: editTitle.value, text: editTxt.value
    };
    archiveNotesObj.splice(index, 1, myarchiveObj);
    localStorage.setItem("Archive Notes", JSON.stringify(archiveNotesObj));
    showArchiveNotes();
    editTitle.value = "";
    editTxt.value = "";
  });

  close.addEventListener("click", function () {
    editForm.style.display = "none";
    editTitle.value = "";
    editTxt.value = "";
  });
}