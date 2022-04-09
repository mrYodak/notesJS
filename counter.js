import { countActive, countArchive} from './script.js';

function colConst(className,array){
    let sumCol=`<div class="column"><div class="${className}"`;
    array.forEach((e)=>{sumCol+=`<p>`+e+`</p>`});
    sumCol+='</div></div>'
    return sumCol;
}

function refreshCounter(options){      
    const countEl = document.getElementById("sumTable"); 

    const sumTable = document.createElement("div");  
    sumTable.classList.add("sumTable");
    sumTable.setAttribute("id", "sumTable");

    let noteCount=countActive();
    let archCount=countArchive(); 

    let categoryList = colConst(`categoryList`,options); 
    let noteCountList = colConst(`noteCountList`,noteCount);
    let archCountList = colConst(`archCountList`,archCount);
    
    sumTable.innerHTML = `<div class="countTable" id="countTable">`+categoryList+noteCountList+archCountList+`</div>`
        
    countEl.replaceWith(sumTable);
};

export {refreshCounter};