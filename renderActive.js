import { changeNote, removeNoteActive, archiveNoteActive} from './script.js';

const noteEl = document.getElementById("noteList");
const dateCheck = /(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/g;

export function renderActive(textArr, catTypeArr, dateArr, options) {
    try {
        noteEl.innerHTML = ``;
        textArr.forEach((text, i) => {
            let catType = catTypeArr[i];
            let date=dateArr[i];
            let optionsCode = ``;
            let text3 = text.match(dateCheck);
            let dateMentioned = "";
            if (text3 != null) dateMentioned = text3.toString();
            options.forEach(element => optionsCode += `<option value="` + element + `">` + element + `</option>`);
            const note = document.createElement("div");
            note.classList.add("note"); 
            note.setAttribute("id", i);

            note.innerHTML = `
            <div class="tools"> 
                <div class="column">               
                <div class="category ${catType ? "" : "hidden"}"></div>                
                <select class="categoryIn ${catType ? "hidden" : ""}">
                <option disabled>Category</option>`+ optionsCode + `
                </select>
                </div>
                <div class="column">
                <div class ="date">${date}</div>
                </div>
                <div class="columnBig">
                <div class="content ${text ? "" : "hidden"}"></div>
                <input class="contentIn ${text ? "hidden" : ""}"></input> 
                </div>  
                <div class="column">
                <div class="contentDate ${dateMentioned}"></div> 
                </div>                         
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"}"><i class="fas fa-trash-alt"></i></button>
                <button class="toArchive"${true ? "" : "hidden"}><i class="fas fa-box"></i></button>
            </div>    
    `;

            const editBtn = note.querySelector(".edit");
            const deleteBtn = note.querySelector(".delete");
            const archiveBtn = note.querySelector(".toArchive");
            const content = note.querySelector(".content");
            const contentDate = note.querySelector(".contentDate");
            const contentIn = note.querySelector(".contentIn");
            const category = note.querySelector(".category");
            const categoryIn = note.querySelector(".categoryIn");

            contentIn.value = text;
            content.innerHTML = text;
            contentDate.innerHTML = dateMentioned;
            categoryIn.value = catType;
            category.innerHTML = catType;

            editBtn.addEventListener("click", () => {                
                content.classList.toggle("hidden");
                contentIn.classList.toggle("hidden");
                category.classList.toggle("hidden");
                categoryIn.classList.toggle("hidden");
                archiveBtn.classList.toggle("hidden"); 
                if (!content.classList.contains("hidden")){
                changeNote(content.innerHTML, category.innerHTML, note.id);
                }   
            });

            deleteBtn.addEventListener("click", () => {
                removeNoteActive(note.id);
            });

            archiveBtn.addEventListener("click", () => {
                archiveNoteActive(note.id);
            });

            contentIn.addEventListener("input", (e) => {
                const { value } = e.target;
                const dates = value.match(dateCheck);
                content.innerHTML = value;
                if (dates != null) {
                    contentDate.innerHTML = dates.toString();
                }
            });

            categoryIn.addEventListener("input", (e) => {
                const { value } = e.target;
                category.innerHTML = value;
            });

            noteEl.appendChild(note);
        });   
    } catch (e) {
        console.log('Error while rendering notes: ' + e);
    }
}
