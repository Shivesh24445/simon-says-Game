let gameseq=[];
let userseq=[];

let btns=["yellow","red","green","purple"];
let started=false;
let level=0;
let highest=0;

let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game Started");
        started=true;
        levelup();
    }
})

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },150);
}
function levelup(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randomidx=Math.floor(Math.random()*3);
    let randomcolor=btns[randomidx];
    let randbtn=document.querySelector(`.${randomcolor}`);
    gameseq.push(randomcolor);
    btnflash(randbtn);
}

function checkans(idx){
    if(gameseq[idx]===userseq[idx]){
        if(gameseq.length == userseq.length){
            setTimeout(levelup,1000);
        }
    }
    else{
        h2.innerHTML=`Game Over! Your Score is <b>${level}</b> <br>Press Any Key To Start`;
        let h3=document.querySelector("h3");
        highest=Math.max(highest,level);
        h3.innerHTML=`Your highest score is ${highest}`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },200)
        reset();
    }
}

function btnpress(){
    let btn=this;
    userflash(btn);

    let usercolor=btn.getAttribute("id");
    userseq.push(usercolor);
    checkans(userseq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}