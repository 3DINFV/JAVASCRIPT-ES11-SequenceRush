"use strict";

// ── 1. CATALOGO SIMBOLI (Array di oggetti)
const symbols = ['💻','🌐','🗄️','🐛','🔑','📦','🔒','☁'];

const CONFIG = {
    maxLives:3,
    inputSeconds:60,
    numRound:10
};

const gameState = {
    sequence: [],
    round:0,
    score:0,
    lives:CONFIG.maxLives,
    inputSeconds: CONFIG.inputSeconds
};

const btnGrid= document.getElementById("btn-grid");
const scoreDisplay=document.getElementById("score");
const seqLenDisplay=document.getElementById("seq-len-display");
const roundNum=document.getElementById("round-num");
const livesRow=document.getElementById("lives-row");
const btnStart=document.getElementById("btn-start");
const roundSymbol=document.getElementsByClassName("seq-slot");
let numClick=0;
let seqCorretta=false;

window.onload = function (){
    for(let i=0;i<CONFIG.maxLives;i++)
        livesRow.innerHTML+='❤';
    for(let i=0;i<CONFIG.numRound;i++)
        roundSymbol[i].classList.add("disabled");
    btnGrid.classList.add("disabledButtons");
}

function start(){
    gameState.round++;
    btnStart.disabled=true;
    btnStart.classList.add("no-hover");
    roundNum.innerHTML=gameState.round;
    setSymbol(gameState.round);
}

function setSymbol(round){
    seqLenDisplay.innerHTML=gameState.round;
    for(let i=0;i<round;i++){
        gameState.sequence[i]=symbols[Math.floor(Math.random()*8)];
        setTimeout(()=>{
           visSymbol(i)
        },1000 * i);
    }
    setTimeout(()=>{
        hideSymbol(round)
    },1000 * round);
}

function visSymbol(i){
    document.getElementById("sym"+i).innerHTML=gameState.sequence[i];
    roundSymbol[i].classList.remove("disabled");
}

function hideSymbol(round){
    for(let i=0;i<round;i++)
        roundSymbol[i].innerHTML = "?";
    btnGrid.classList.remove("disabledButtons");
}

function chooseSymbol(pos){
    document.getElementById("sym"+numClick).innerHTML=symbols[pos];
    numClick++;
    if(numClick===gameState.round){
        btnGrid.classList.add("disabledButtons");
        controllaSequenza();
    }
}

function controllaSequenza(){
    for(let i=0;i<gameState.round;i++){
        if(gameState.sequence[i]===roundSymbol[i].innerHTML)
            seqCorretta=true;
        else{
            seqCorretta=false;
            break;
        }
    }
    if(seqCorretta){
        risRound.innerHTML="Sequenza corretta! Vai al round successivo."
        risRound.classList.remove("risKO");
        risRound.classList.add("risOk");
        gameState.round++;
        gameState.score+=100;
    }else{
        gameState.lives--;
        livesRow.innerHTML="";
        for(let i=0;i<gameState.lives;i++)
            livesRow.innerHTML+='❤';
        gameState.score-=50;
        risRound.classList.add("risKO");
        risRound.classList.remove("risOk");
        if(gameState.lives===0){
            risRound.innerHTML=`Gioco Terminato! Hai totalizzato ${gameState.score} punti`;
        }else{
            risRound.innerHTML=`Sequenza errata! Ti restano ${gameState.lives} vite`;
        }
    }
    scoreDisplay.innerHTML = gameState.score;
}