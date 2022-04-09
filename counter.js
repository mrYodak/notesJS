function catCounter(options,list){   
    let counterArr=[];
    options.forEach((category,i)=>{
        let sum=0;        
        list.forEach((note)=>{            
            if(note.innerHTML.includes(category)) sum++;
        })   
        counterArr[i]=sum;
    })
    return counterArr;
}

function colConst(className,array){
    let sumCol=`<div class="column"><div class="${className}"`;
    array.forEach((e)=>{sumCol+=`<p>`+e+`</p>`});
    sumCol+='</div></div>'
    return sumCol;
}

function refreshCounter(options){
    const sumTable = document.createElement("div");    
    const countEl = document.getElementById("sumTable");
    let noteList = document.querySelector("#noteList");
    let archList = document.querySelector("#archList");
    let categoryList = colConst(`categoryList`,options);
    sumTable.classList.add("sumTable");
    sumTable.setAttribute("id", "sumTable");

    let noteMatches = noteList.querySelectorAll(".category");    
    let archMatches = archList.querySelectorAll(".category");
    let noteCount=catCounter(options,noteMatches);
    let archCount=catCounter(options,archMatches);   
    let noteCountList = colConst(`noteCountList`,noteCount);
    let archCountList = colConst(`archCountList`,archCount);
    
    
    sumTable.innerHTML = `<div class="countTable" id="countTable">`+categoryList+noteCountList+archCountList+`</div>`
        
    countEl.replaceWith(sumTable);
};

export {refreshCounter};