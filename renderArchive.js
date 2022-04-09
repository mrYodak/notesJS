import { restoreNoteArchived, removeNoteArch} from './script.js';

const archiveEl = document.getElementById("archList");
const dateCheck = /(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/g;

export function renderArchive(textArr, catTypeArr, dateArr, options) {
    try {
        archiveEl.innerHTML = ``;
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
                <div class="category">${catType}</div>
                </div>
                <div class="column">
                <div class ="date">${date}</div>
                </div>
                <div class="columnBig">
                <div class="content">${text}</div>
                </div>  
                <div class="column">
                <div class="contentDate">${dateMentioned}</div> 
                </div>
                <button class="delete"}"><i class="fas fa-trash-alt"></i></button>                
                <button class="restore"><i class="fas fa-box-open"></i></button>
            </div>    
    `;

            const deleteBtn = note.querySelector(".delete");
            const restoreBtn = note.querySelector(".restore");            

            deleteBtn.addEventListener("click", () => {
                removeNoteArch(note.id);
            });            

            restoreBtn.addEventListener("click", () => {
                restoreNoteArchived(note.id);
            });

            archiveEl.appendChild(note);
        });   
    } catch (e) {
        console.log('Error while rendering archive: ' + e);
    }
}

