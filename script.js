import { renderActive } from './renderActive.js';
import { renderArchive } from './renderArchive.js';
import { refreshCounter } from './counter.js';

const addBtn = document.getElementById("add");
const options = [`Task`, `Random Thought`, `Idea`];
//Starting arrays
let typeArrActive = [options[0], ...options, ...options];
let textArrActive = ["Something about 8/11/2001", "Was it 6/12/1991 or 8/7/1234?", "0+12/3=4", "9*8-7=65", "Bread", "Some dates", "What about 1-1-3333?"];
let dateArrActive = ["9/3/1939", "1/1/989", "4/5/6789", "a/b/cdef", "DATE", "6", "Yesterday"];
let typeArrArch = [options[0]];
let textArrArch = ["What about 1-1-3333?"];
let dateArrArch = ["September 3"];

addBtn.addEventListener("click", () => {
    addNote();
    countActive();
});

renderActive(textArrActive, typeArrActive, dateArrActive, options);
renderArchive(textArrArch, typeArrArch, dateArrArch, options);
refreshCounter(options);

function addNote() {
    const today = new Date();
    const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    typeArrActive.push(options[Math.floor(Math.random() * options.length)]);
    textArrActive.push("Default");
    dateArrActive.push(date);
    renderActive(textArrActive, typeArrActive, dateArrActive, options);
    refreshCounter(options);
}

export function changeNote(newText, newType, i) {
    typeArrActive[i] = newType;
    textArrActive[i] = newText;
    renderActive(textArrActive, typeArrActive, dateArrActive, options);
    refreshCounter(options);
}

export function removeNoteActive(i) {
    typeArrActive.splice(i, 1);
    textArrActive.splice(i, 1);
    dateArrActive.splice(i, 1);
    renderActive(textArrActive, typeArrActive, dateArrActive, options);
    refreshCounter(options);
}

export function archiveNoteActive(i) {
    typeArrArch.push(typeArrActive.splice(i, 1)[0]);
    textArrArch.push(textArrActive.splice(i, 1)[0]);
    dateArrArch.push(dateArrActive.splice(i, 1)[0]);
    renderActive(textArrActive, typeArrActive, dateArrActive, options);
    renderArchive(textArrArch, typeArrArch, dateArrArch, options);
    refreshCounter(options);
}

export function restoreNoteArchived(i) {
    typeArrActive.push(typeArrArch.splice(i, 1)[0]);
    textArrActive.push(textArrArch.splice(i, 1)[0]);
    dateArrActive.push(dateArrArch.splice(i, 1)[0]);
    renderActive(textArrActive, typeArrActive, dateArrActive, options);
    renderArchive(textArrArch, typeArrArch, dateArrArch, options);
    refreshCounter(options);
}

export function removeNoteArch(i) {
    typeArrArch.splice(i, 1);
    textArrArch.splice(i, 1);
    dateArrArch.splice(i, 1);
    renderArchive(textArrArch, typeArrArch, dateArrArch, options);
    refreshCounter(options);
}

export function countActive() {
    let typeCountArr = [];
    options.forEach((e, i) => {
        typeCountArr[i] = typeArrActive.filter(category => category.includes(e)).length;
    });
    return typeCountArr;
}

export function countArchive() {
    let typeCountArr = [];
    options.forEach((e, i) => {
        typeCountArr[i] = typeArrArch.filter(category => category.includes(e)).length;
    });
    return typeCountArr;
}
