import {addNewNote} from './addNewNote.js';
import {refreshCounter} from './counter.js';
const addBtn = document.getElementById("add");
const options=[`Task`,`Random Thought`,`Idea`];
//Starting generator
const startingTypes=[options[0],...options,...options];
const startingText=["Something about 8/11/2001","Was it 6/12/1991 or 8/7/1234?","0+12/3=4","9*8-7=65","Bread","Some dates","What about 1-1-3333?"];
startingTypes.forEach((e,i)=>{
    addNewNote(startingText[i],e,options);
})

refreshCounter(options);

addBtn.addEventListener("click", () => {
    let reduceExample=options.reduce((a,b)=>{
        if (Math.random()>0.7){
            return b;
        }else return a;
    })
    addNewNote("Default Text",reduceExample,options);
    refreshCounter(options);
});
