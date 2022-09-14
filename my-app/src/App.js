import logo from './logo.svg';
import './App.css';
import React from "react"
import Sketch from "react-p5"

let width = 900
let height = 400
let x = width / 15
let y = height / 20
let rs = 10;
let speed = 5
let rectOnex = width / 25;
let rectOney = height / 3;
let rectTwox = width * (14 / 15);
let rectTwoy = height / 3;
let rectW = 10;
let rectH = 100;
let speedRect = 5;
let speedx = speed;
let speedy = speed;
let paused = 0;
let victory = 1;
let pause = 5;
let count = 0;
let scoreOne = '0';
let scoreTwo = '0';
let direction = 1;
let enter = 0;
let youcanpress = true;
let winner;
function App() {
  const setup = (p5, canvasParentRef) => {
    let cnv = p5.createCanvas(width, height).parent(canvasParentRef)
    cnv.mousePressed((event) => {
      if(victory === 1){
        x = width / 15
        y = height / 20
        victory = 0;
      }
    })
    p5.frameRate(60)
  }
  
  const draw = p5 => {

    p5.background("#00FFFF")
    p5.textStyle(p5.BOLDITALIC);
    p5.textSize(60)
    p5.text( scoreOne + ' - ' + scoreTwo, width * (6/14) , 90);
    p5.fill(255)
    p5.rect(rectOnex, rectOney, rectW, rectH)
    p5.rect(rectTwox, rectTwoy, rectW, rectH)
    p5.circle(x, y, 10)
    // if (p5.keyIsPressed) {
    //   if (p5.keyCode === p5.UP_ARROW) {
    //     rectTwoy -= speedRect; 
    //   } else if (p5.keyCode === p5.DOWN_ARROW) {
    //     rectTwoy += speedRect; 
    //   }
    //   if (p5.keyCode === 87) {
    //     rectOney -= speedRect; 
    //   } else if (p5.keyCode === 83) {
    //     rectOney += speedRect; 
    //   }
    // }
    // if(p5.keyIsPressed){
    //   if(p5.keyCode === 80)
    //   {
    //     pause *= -1;
    //     paused = 1;
    //   }       
    // }
    if(x < 0){
      x = width / 15;
      y = height / 20;
      enter = 1;
      speedx *= (-1)
      if(speedy < 0)
        speedy *= (-1)
      scoreTwo++;
    }
    else  if(x > width){
      x = width * 13/ 15;
      y = height / 20;
      enter = 1;
      speedx *= (-1)
      if(speedy < 0)
        speedy *= (-1)
      scoreOne++;
    }
    if((p5.keyIsDown(80) && paused === 0) || enter === 1){
      pause *= (-1);
      paused = 1;
      count++;
      if(enter === 1)
        enter = 0;
      youcanpress = false;
    }
    else if (!p5.keyIsDown(80))
    {
      paused = 0;
      youcanpress = true;
    }
    if(p5.keyIsPressed){
      // if(p5.keyIsDown(p5.UP_ARROW) && youcanpress === true){
      //   youcanpress = false
      // }
      // else
      // {
      //   youcanpress = true
      //   if(count % 2 === 1 && paused === 0)
      //   {
      //     pause *= -1;
      //     paused = 1;
      //     count++;
      //   }
      // }
      if(!p5.keyIsDown(p5.UP_ARROW) && !p5.keyIsDown(p5.DOWN_ARROW) && !p5.keyIsDown(87) && !p5.keyIsDown(83))
      {
        if(count % 2 === 1 && paused === 0)
        {
          pause *= -1;
          paused = 1;
          count++;
        }
      }
      // if(count % 2 === 1 && paused === 0)
      // {
      //   pause *= -1;
      //   paused = 1;
      //   count++;
      // }
    }

    if(pause > 0)
    {
      if(p5.keyIsDown(p5.UP_ARROW))
        rectTwoy -= speedRect;
      if(p5.keyIsDown(p5.DOWN_ARROW))
        rectTwoy += speedRect;
      if(p5.keyIsDown(87))
        rectOney -= speedRect;
      if(p5.keyIsDown(83))
        rectOney += speedRect;
    }
    // x += speed
    // if(x > width)
    //   x = 0
    if(y > height || y < 0)
    {
      speedy *= (-1)
      y += speedy
    }
    let hit1 = circRect(p5, x, y, rs, rectOnex, rectOney, rectW, rectH)
    let hit2 = circRect(p5, x, y, rs, rectTwox, rectTwoy, rectW, rectH)
    if(x > width || hit1 || hit2)
    {
      speedx *= (-1)
      x += speedx
    }
    //wif(victory == 2)
    if(scoreOne === 2)
      winner = "One";
    if(scoreTwo === 2)
      winner = "Two";
    if(victory === 1 || winner === "One" || winner === "Two")
    {
      victory = 1;
      p5.background("#d1af84");
      p5.fill(0)
      p5.textSize(60)
      p5.text("Player " + winner + " Win", width / 2 - width / 10,height / 3, 15, 300)
      winner = "noOne"
    }
    else{
      // if(p5.mouseClicked(event)){
      //   if(p5.keyCode){
      //     victory = 0;
      //     console.log(event)
      //   }
      // }
      // if(hit1 || hit2)
      // {
      //   speed *= (-1)
      // }
      if(pause > 0)
      {
        x += speedx;
        y += speedy;
      }
    }
    if(p5.keyIsPressed && victory === 1){
      if(p5.keyCode){
        console.log("start")
        x = width / 15
        y = height / 20
        scoreOne = 0;
        scoreTwo = 0;
        victory = 0;
        if(speedx < 0)
          speedx *= (-1)
        if(speedy < 0)
          speedy *= (-1)
      }
    }
    // if(p5.mouseClicked(event)){
    //   if(p5.keyCode){
    //     victory = 0;
    //     console.log(event)
    //   }
    // }
    // if(hit1 || hit2)
    // {
    //   speed *= (-1)
    // }
  }
  function circRect(p5, cx, cy, rad, rx, ry, rw, rh) {
    let testX = cx;
     let testY = cy;
     
     if (cx < rx)         testX = rx;      // test left edge
     else if (cx > rx+rw) testX = rx+rw;   // right edge
     if (cy < ry)         testY = ry;      // top edge
     else if (cy > ry+rh) testY = ry+rh;   // bottom edge
     
     let d = p5.dist(cx, cy, testX, testY);
     
       if (d <= rad) {
       return true;
     }
     return false;
   
   }

  return <Sketch setup={setup} draw={draw} />
}

export default App;
