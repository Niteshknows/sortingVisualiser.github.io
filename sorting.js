
//swap based on heights
function swap(ele1,ele2){
    let temp=ele1.style.height;
    ele1.style.height = ele2.style.height;
    ele2.style.height = temp;
}

//disable sorting btns when sorting is already happening
function disableSortingBtn(){
    const bubbleSortBtn  =  document.querySelector(".bubbleSort");
    bubbleSortBtn.classList.add("disableMe");
    document.querySelector(".insertionSort").classList.add("disableMe");
    document.querySelector(".mergeSort").classList.add("disableMe");
    document.querySelector(".quickSort").classList.add("disableMe");
    document.querySelector(".selectionSort").classList.add("disableMe");
    document.querySelector(".sortBtn").classList.add("disableMe");
}

// to enable sorting btns after sorting done
function enableSortingBtn(){
    document.querySelector(".bubbleSort").classList.remove("disableMe")
    document.querySelector(".insertionSort").classList.remove("disableMe");
    document.querySelector(".mergeSort").classList.remove("disableMe");
    document.querySelector(".quickSort").classList.remove("disableMe");
    document.querySelector(".selectionSort").classList.remove("disableMe");
    document.querySelector(".sortBtn").classList.remove("disableMe");
}
// to disable size slider during sorting is already in progress
function disableSizeSlider(){
    document.querySelector("#arr_sz").disabled = true;
}
//to enable size slider again after sorting
function enableSizeSlider(){
    document.querySelector("#arr_sz").disabled = false;
}

//to disable new array btn
function disableNewArrayBtn(){
    document.querySelector(".newArray").disabled = true;
}

// Enables newArray buttons used in conjunction with disable
function enableNewArrayBtn(){
    document.querySelector(".newArray").disabled = false;
}

//used in async function so that we can see animations if sorting, takes input in millisec, 1000ms = 1s

function waitforme(milisec){
  return new Promise(resolve =>{
      setTimeout(() => {
         resolve('') 
      }, milisec);
  })
}

//deciding size of array using slider value
let arraySize = document.querySelector('#arr_sz');

//eventListener to change number of bars
arraySize.addEventListener('input',function(){    //  console.log(arraySize.value, typeof(arraySize.value));
  
    createNewArray(parseInt(arraySize.value));
});

// Default input for waitforme function (260ms)
let delay = 260;

// Selecting speed slider from DOM
let delayElement = document.querySelector('#speed_input');

//eventListener when speed slider value changes
delayElement.addEventListener('input',function(){
    delay = 320-parseInt(delayElement.value);
});

//array to store random generated array
let array=[];
let originalArray=[];
//call to display bars when the user visits first
createNewArray();

function createNewArray(noOfBars=60){
     // calling helper function to delete old bars from dom
     deleteChild();
   
    array=[];
    for(let i=0;i<noOfBars;i++){
        array.push(Math.floor(Math.random()*200)*2+1);
    }
    originalArray=array;
    const bars = document.querySelector("#bars");

    //creating multiple bars as class 'bar col'
    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${array[i]}px`;
        bar.classList.add('bar');
        
        bar.classList.add('flex-item');
        bar.classList.add(`barNo${i}`);
        bars.appendChild(bar);
    }

}

// Helper function to delete all the previous bars so that new can be added
function deleteChild() {
    const bar = document.querySelector("#bars");
    bar.innerHTML = '';
}

// Selecting newarray button from DOM and adding eventlistener
const newArray = document.querySelector(".newArray");
newArray.addEventListener("click", function(){
    console.log("From newArray " + arraySize.value);
    console.log("From newArray " + delay);
    enableSortingBtn();
    enableSizeSlider();
    createNewArray(arraySize.value);
});


function resetArray(){
    deleteChild();
    stopTimer();

    const bars = document.querySelector("#bars");
    let noOfBars=originalArray.length;
    //creating multiple bars as class 'bar col'
    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${originalArray[i]}px`;
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bar.classList.add(`barNo${i}`);
        bars.appendChild(bar);
    }       
    enableSortingBtn();  
    enableSizeSlider();
    enableNewArrayBtn(); 
    // resetTimer();
}

// const sortBtn = document.addEventListener("click",function)

function toggleActive(k){
    let option = document.querySelectorAll("li.option");
       for(let i=0;i<option.length;i++){
           if(i==k){
               option[i].classList.add("active");
           } else{
               if(option[i].classList.contains("active")){
                   option[i].classList.remove("active");
               }
           }
       }    
    }   
 const sortBtn = document.querySelector(".sortBtn");
 sortBtn.addEventListener("click",function(){
    // resetTimer();
    const messageBox = document.getElementById("messageBox").style.visibility='hidden';   
    const tipBox = document.getElementById("tipBox").style.visibility="hidden";
   
    let option = document.querySelectorAll("li.option");
    let k=-1; 
    for(let i=0;i<option.length;i++){
        if(option[i].classList.contains("active")){
            console.log("value of i is"+i);
            k=i;
            break;
        }
    }
    console.log("value of k is"+k);
    if(k==-1){
    }
    else if(k==0){
        console.log("inside if condition");
        startTimer(); doInsertionSort();
    }
    else if(k==1){
        startTimer(); doSelectionSort();
    }
    else if(k==2){
         doBubbleSort(); startTimer();
        }
    else if(k==3){
         doMergeSort();startTimer();
        }
    else if(k==4){
         doQuickSort();startTimer();
        }
 }); 
   let min=sec=ms="0"+0,startTime;
   function startTimer(){
       startTime;
       min=sec=ms="0"+0;
       console.log("inside start timer");
       startTime=setInterval(()=>
       {
           ms++
         ms=ms<10 ? "0"+ms:ms;
         if(ms==100){
             sec++;
             sec=sec<10 ? "0"+sec:sec;
             ms="0"+0;
         }
         if(sec==60){
             min++;
             min=min<10 ? "0"+min:min;
             sec="0"+0;
         }
         
       
           putValue();
       },10);
   }
    function resetTimer(){
        clearInterval(startTime);
        min=sec=ms="0"+0;
        putValue();      
    }

    function stopTimer(){
        clearInterval(startTime);
    }

   function putValue(){
       document.querySelector(".millisecond").innerText=ms;
       document.querySelector(".minute").innerText=min;
       document.querySelector(".second").innerText=sec;
   }

   

   function displayTime(){
    const messageBox = document.getElementById("messageBox").style.visibility='visible';   
    const tipBox = document.getElementById("tipBox").style.visibility="visible";

    const timeTaken = document.getElementById("timeTaken");
    timeTaken.innerHTML=`${sec} Seconds and<br> ${ms} milliseconds`;
   }

