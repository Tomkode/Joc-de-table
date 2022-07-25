var b1,b2,b3,b4,b5,b6;
let who= document.querySelector('#cne');
var WHITECOLOR, BLACKCOLOR;
b1=document.querySelector('#u1');
b2=document.querySelector('#u2');
b3=document.querySelector('#u3');
b4=document.querySelector('#u4');
b5=document.querySelector('#u5');
b6=document.querySelector('#u6');

let cl1="#ffffff";
let cl2="#000000";
let cl3="#5926d1";
let cl4="#09ed3b";
let cl5="#e8000c";
let cl6="#e6c32c";
b1.colour = cl1;
b2.colour = cl2;
b3.colour = cl3;
b4.colour = cl4;
b5.colour = cl5;
b6.colour = cl6;

//
// window.addEventListener('load', (event) => {
//   who.innerHTML="Jucătoru #1";
// });
function click2(evt)
{
var clr = evt.currentTarget.colour;
var piese=document.querySelectorAll('.black');
for(var i=0;i<piese.length;i++)
  {
    piese[i].style.backgroundColor=clr;
  }
  b1.removeEventListener('click',click2);
  b2.removeEventListener('click',click2);
  b3.removeEventListener('click',click2);
  b4.removeEventListener('click',click2);
  b5.removeEventListener('click',click2);
  b6.removeEventListener('click',click2);
  BLACKCOLOR = clr;
  var barnea = document.querySelector('.hower');
  barnea.innerHTML = "";
  socket.emit('culoare',1, BLACKCOLOR);
}
function click1(evt){
  var clr=evt.currentTarget.colour;
  var piese=document.querySelectorAll('.white');
  for(var i=0;i<piese.length;i++)
    {
      piese[i].style.backgroundColor=clr;
    }
    WHITECOLOR = clr;
    var barnea = document.querySelector('.hower');
    barnea.innerHTML = "";
    evt.currentTarget.outerHTML=evt.currentTarget.outerHTML;
    socket.emit('culoare',0, WHITECOLOR);
 b1.removeEventListener('click',click1);
 b2.removeEventListener('click',click1);
 b3.removeEventListener('click',click1);
 b4.removeEventListener('click',click1);
 b5.removeEventListener('click',click1);
 b6.removeEventListener('click',click1);
    admi(1);
}

function cinee(q){

if(q==1){
b1.addEventListener('click',click1);
b2.addEventListener('click',click1);
b3.addEventListener('click',click1);
b4.addEventListener('click',click1);
b5.addEventListener('click',click1);
b6.addEventListener('click',click1);
}
else{
  b1.addEventListener('click',click2);
  b2.addEventListener('click',click2);
  b3.addEventListener('click',click2);
  b4.addEventListener('click',click2);
  b5.addEventListener('click',click2);
  b6.addEventListener('click',click2);
}
}
