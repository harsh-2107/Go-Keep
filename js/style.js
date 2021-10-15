let body = document.getElementById("addTxt");
let editNoteTextArea = document.getElementById("edit-note-text-input");

body.addEventListener("keydown", element => {
    body.style.height = `45px`;
    let scHeight = element.target.scrollHeight;
    body.style.height = `${scHeight}px`;
});

editNoteTextArea.addEventListener("keydown", element => {
    editNoteTextArea.style.height = `auto`;
    let scHeight = element.target.scrollHeight;
    editNoteTextArea.style.height = `${scHeight}px`;
});

editNoteTextArea.addEventListener("mouseover", element => {
    editNoteTextArea.style.height = `auto`;
    let scHeight = element.target.scrollHeight;
    editNoteTextArea.style.height = `${scHeight}px`;
});

document.getElementById('clearBtn').addEventListener("click", function () {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    addTxt.value = "";
    addTitle.value = "";
});

body.addEventListener("click", function () {
    document.getElementById("addTitle").style.display = "block";
    document.getElementById("btn-container").style.display = "flex";
    body.style.borderTopLeftRadius = "0px";
    body.style.borderTopRightRadius = "0px";
});

document.getElementById("addBtn").addEventListener("click", function () {
    document.getElementById("addTitle").style.display = "none";
    document.getElementById("btn-container").style.display = "none";
    body.style.borderTopLeftRadius = "10px";
    body.style.borderTopRightRadius = "10px";
});

document.getElementById("clearBtn").addEventListener("click", function () {
    document.getElementById("addTitle").style.display = "none";
    document.getElementById("btn-container").style.display = "none";
    body.style.borderTopLeftRadius = "10px";
    body.style.borderTopRightRadius = "10px";
});

function hamburger() {
    if (op1.style.display == "none") {
        openMenu();
    }
    else {
        closeMenu();
    }
}

function openMenu() {
    let op1 = document.getElementById("op1");
    let op2 = document.getElementById("op2");
    let op3 = document.getElementById("op3");
    let listelem1 = document.getElementById("list-elem1");
    let listelem2 = document.getElementById("list-elem2");
    let listelem3 = document.getElementById("list-elem3");
    let img1 = document.getElementById("img1");
    let img2 = document.getElementById("img2");
    let img3 = document.getElementById("img3");
    let menu = document.getElementById("menu");

    op1.style.display = "";
    op2.style.display = "";
    op3.style.display = "";
    listelem1.style.paddingRight = "150px";
    listelem2.style.paddingRight = "150px";
    listelem3.style.paddingRight = "150px";



    listelem1.style.borderTopRightRadius = "30px";
    listelem1.style.borderBottomRightRadius = "30px";
    listelem1.style.borderTopLeftRadius = "0px";
    listelem1.style.borderBottomLeftRadius = "0px";

    listelem2.style.borderTopRightRadius = "30px";
    listelem2.style.borderBottomRightRadius = "30px";
    listelem2.style.borderTopLeftRadius = "0px";
    listelem2.style.borderBottomLeftRadius = "0px";

    listelem3.style.borderTopRightRadius = "30px";
    listelem3.style.borderBottomRightRadius = "30px";
    listelem3.style.borderTopLeftRadius = "0px";
    listelem3.style.borderBottomLeftRadius = "0px";


    img1.style.marginRight = "25px";
    img2.style.marginRight = "25px";
    img3.style.marginRight = "25px";
    img1.style.marginLeft = "28px";
    img2.style.marginLeft = "28px";
    img3.style.marginLeft = "28px";
    menu.style.left = "0px";
    menu.style.boxShadow = "10px 0 5px -2px rgb(224 224 224)";
}

function closeMenu() {
    let op1 = document.getElementById("op1");
    let op2 = document.getElementById("op2");
    let op3 = document.getElementById("op3");
    let listelem1 = document.getElementById("list-elem1");
    let listelem2 = document.getElementById("list-elem2");
    let listelem3 = document.getElementById("list-elem3");
    let img1 = document.getElementById("img1");
    let img2 = document.getElementById("img2");
    let img3 = document.getElementById("img3");
    let menu = document.getElementById("menu");

    op1.style.display = "none";
    op2.style.display = "none";
    op3.style.display = "none";
    listelem1.style.paddingRight = "0px";
    listelem2.style.paddingRight = "0px";
    listelem3.style.paddingRight = "0px";
    listelem1.style.borderRadius = "50px";
    listelem2.style.borderRadius = "50px";
    listelem3.style.borderRadius = "50px";
    img1.style.marginRight = "13px";
    img2.style.marginRight = "13px";
    img3.style.marginRight = "13px";
    img1.style.marginLeft = "13px";
    img2.style.marginLeft = "13px";
    img3.style.marginLeft = "13px";
    menu.style.left = "16px";
    menu.style.boxShadow = "none";
}

function clickOne() {
    let listelem1 = document.getElementById("list-elem1");
    let listelem2 = document.getElementById("list-elem2");
    let listelem3 = document.getElementById("list-elem3");

    listelem1.classList.add("active");
    listelem2.classList.remove("active");
    listelem3.classList.remove("active");

    document.getElementById("section-notes").style.display = "block";
    document.getElementById("section-archive").style.display = "none";
    document.getElementById("section-trash").style.display = "none";
}

function clickTwo() {
    let listelem1 = document.getElementById("list-elem1");
    let listelem2 = document.getElementById("list-elem2");
    let listelem3 = document.getElementById("list-elem3");

    listelem1.classList.remove("active");
    listelem2.classList.add("active");
    listelem3.classList.remove("active");

    document.getElementById("section-notes").style.display = "none";
    document.getElementById("section-archive").style.display = "block";
    document.getElementById("section-trash").style.display = "none";
}

function clickThree() {
    let listelem1 = document.getElementById("list-elem1");
    let listelem2 = document.getElementById("list-elem2");
    let listelem3 = document.getElementById("list-elem3");

    listelem1.classList.remove("active");
    listelem2.classList.remove("active");
    listelem3.classList.add("active");

    document.getElementById("section-notes").style.display = "none";
    document.getElementById("section-archive").style.display = "none";
    document.getElementById("section-trash").style.display = "block";
}