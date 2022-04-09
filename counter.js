function catCounter(options,list){
    let counterArr=[];
    options.forEach((category)=>{
        let sum=0;
        list.forEach((note)=>{
            if(note.innerHTML==category) sum++;
        })
        counterArr[index]=sum;
    })
    return counterArr;
}

function refreshCounter(options){
    let noteList = document.querySelector("#noteList");
    let noteMatches = noteList.querySelectorAll(".category");
    let archList = document.querySelector("#archList");
    let archMatches = archList.querySelectorAll(".category");
    let noteCount=catCounter(options,noteMatches);
    let archCount=catCounter(options,archMatches);  
    let typeObj=new Object();

    
};

export {refreshCounter};