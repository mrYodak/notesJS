import {refreshCounter} from './counter.js';

export function addNewNote(text,text2,options) {    
    try{
    const noteEl = document.getElementById("noteList");
    const archiveEl = document.getElementById("archList");
    const dateCheck =/(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/g;  
    let optionsCode=``;  
    let text3="";  
    options.forEach(element => optionsCode+=`<option value="`+element+`">`+element+`</option>`);
    const note = document.createElement("div");
    note.classList.add("note");
    const today = new Date();
    const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();

    note.innerHTML = `
            <div class="tools"> 
                <div class="column">               
                <div class="category ${text2 ? "" : "hidden"}"></div>                
                <select class="categoryIn ${text2 ? "hidden" : ""}">
                <option disabled>Category</option>`+optionsCode+`
                </select>
                </div>
                <div class="column">
                <div class ="date"><p> ${date} </p></div>
                </div>
                <div class="columnBig">
                <div class="content ${text ? "" : "hidden"}"></div>
                <input class="contentIn ${text ? "hidden" : ""}"></input> 
                </div>  
                <div class="column">
                <div class="contentDate ${text3}"></div> 
                </div>                         
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"}"><i class="fas fa-trash-alt"></i></button>
                <button class="toArchive"${true ? "" : "hidden"}><i class="fas fa-box"></i></button>
                <button class="restore ${true ? "hidden" : ""}"><i class="fas fa-box-open"></i></button>
            </div>    
    `;

    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");
    const archiveBtn = note.querySelector(".toArchive");
    const restoreBtn = note.querySelector(".restore");
    const content = note.querySelector(".content");
    const contentDate = note.querySelector(".contentDate");
    const contentIn = note.querySelector(".contentIn");
    const category = note.querySelector(".category");
    const categoryIn = note.querySelector(".categoryIn");

    contentIn.value = text;
    content.innerHTML = marked(text);
    contentDate.innerHTML = marked(text3);
    categoryIn.value = text2;
    category.innerHTML = marked(text2);

    editBtn.addEventListener("click", () => {
        content.classList.toggle("hidden");
        contentIn.classList.toggle("hidden");
        category.classList.toggle("hidden");
        categoryIn.classList.toggle("hidden");
        archiveBtn.classList.toggle("hidden");
        refreshCounter(options);
    });

    deleteBtn.addEventListener("click", () => {
        note.remove();
        refreshCounter(options);
    });

    archiveBtn.addEventListener("click", () => {
        editBtn.classList.toggle("hidden");
        archiveBtn.classList.toggle("hidden");
        restoreBtn.classList.toggle("hidden");
        archiveEl.appendChild(note);
        refreshCounter(options);
    });

    restoreBtn.addEventListener("click", () => {
        editBtn.classList.toggle("hidden");
        archiveBtn.classList.toggle("hidden");
        restoreBtn.classList.toggle("hidden");
        noteEl.appendChild(note);
        refreshCounter(options);
    });

    contentIn.addEventListener("input", (e) => {
        const { value } = e.target;
        const dates=value.match(dateCheck);
        content.innerHTML = marked(value);
        if (dates!=null){
        contentDate.innerHTML = marked(dates.toString());
        }
    });

    categoryIn.addEventListener("input", (e) => {
        const { value } = e.target;
        category.innerHTML = marked(value);
    });

    noteEl.appendChild(note); 
} catch(e){
    console.log('Error while creating a note: '+ e);
}
}

