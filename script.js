import {addNewNote} from './addNewNote.js';
import {refreshCounter} from './counter.js';
const addBtn = document.getElementById("add");
const options=[`Task`,`Random Thought`,`Idea`];

refreshCounter(options);

addBtn.addEventListener("click", () => {
    addNewNote("Default","Task",options);
    refreshCounter(options);
});
