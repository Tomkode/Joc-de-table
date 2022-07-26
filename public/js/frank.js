const socket = io();
let cn_e;
let lzq=false;
socket.on('mesaj', (mesaj,nume,catiis)=>{
    console.log(mesaj,nume,"sunt "+catiis);
    if(catiis>2)
    window.location="/neparerau.html";
    //let who= document.querySelector('#cne');
   // who.innerHTML=nume;    
    cn_e=catiis;
    if(cn_e==1)
        player=1;
    else
        player=0;
    //alert(player);
    //console.log(pl)
    cinee();    
});
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
socket.emit('culoarea', clr, cn_e);
console.log('culoarea ', clr, cn_e);
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
  $(".hower2").show();
//  socket.emit('culoare',1, BLACKCOLOR);
}

socket.on('astanu',(x)=>{
if(x==cl1)
{
    b1.removeEventListener('click',click2);
    b1.removeEventListener('click',click1);
}

if(x==cl2)
{
    b2.removeEventListener('click',click2);
    b2.removeEventListener('click',click1);
}
if(x==cl3)
{
    b3.removeEventListener('click',click2);
    b3.removeEventListener('click',click1);
}
if(x==cl4)
{
    b4.removeEventListener('click',click2);
    b4.removeEventListener('click',click1);
}
if(x==cl5)
{
    b5.removeEventListener('click',click2);
    b5.removeEventListener('click',click1);
}
if(x==cl6)
{
    b6.removeEventListener('click',click2);
    b6.removeEventListener('click',click1);
}
});


function click1(evt){
  var clr=evt.currentTarget.colour;
  socket.emit('culoarea', clr, cn_e);
  console.log('culoarea ', clr, cn_e);
  var piese=document.querySelectorAll('.white');
  for(var i=0;i<piese.length;i++)
    {
      piese[i].style.backgroundColor=clr;
    }
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
 $(".hower2").show();
}

function cinee(q){
if(cn_e==1){
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

socket.on('START',(c1,c2)=>{
  asc(1);
  WHITECOLOR=c1;
  eatenblack=false;
  eatenwhite=false;
  BLACKCOLOR=c2;
  startPieces();
  if(player==0)
    $("#dice").hide();
});

$("#dice").hide();

socket.on('STOP', ()=>{
  window.location="/neparerau2.html";
});


function roll() // dai cu zarul
{
    //if(canbepressed)
   // {
        die3 = 0;
    die1 = Math.ceil(Math.random()*6) ;
    die2 = Math.ceil(Math.random()*6) ;
    die1 > 0 ? 0 : die1++;
    die2 > 0 ? 0 : die2++;
    if(die1 > die2)
    [die1,die2] = [die2,die1];
    zaruri(die1,die2);
    socket.emit('zaruri', die1, die2);
    if(die1 == die2)
    {die1 *= 4;
        die2 = 0;
        die3 = die1/4;
    }
   // socket.emit('zaruri', )
  //}
}

buton.addEventListener('click',roll);
buton.addEventListener('click',start);

socket.on('zaruri', (z1,z2)=>{
  resetcovers();
  zaruri(z1,z2);
})

function move(evt) // functia de mutare cand dai click pe highlighted column
{
    let columnn = evt.currentTarget.c;
    let die = evt.currentTarget.d;
    let column = evt.currentTarget.cstart;
    moved = true;
    movePiece(column,columnn); 
    socket.emit('mutare',columnn,die, column);
     // mutare
    
    let zar01 = document.querySelector('.cover1');
    let zar02 = document.querySelector('.cover2');
    if(die == 1) // anulez zarul care l am folosit pt a muta
        {
            if(die3)
            {
                zar02.style.visibility = 'visible';
                die1-=die3;
                if(!die1)
                die3 = 0,zar01.style.visibility = 'visible';
            }
            else
            {
                die1 = 0;
                zar01.style.visibility = 'visible';
            }
        }
    else
        if(die == 2)
            {
                die2 = 0;
                zar02.style.visibility = 'visible';
            }
            else
                {
                    die1 = 0;
                    die2 = 0;
                    zar01.style.visibility = 'visible';
                    zar02.style.visibility = 'visible';
                }

                if(die1==0 && die2==0)
                lzq=true;   
                //sterg event listenerurile
    if(col1 != null) {
        if(columnpieces(col1) == 0 || Math.abs(c1) == 666)
        Cursor(col1,0);
        col1.style.backgroundColor = null;
        col1.removeEventListener('click',move);
        if(columnpieces(col1) > 1 && Math.abs(c1) != 666)
        col1.addEventListener('click',calculate);
        col1.column = c1;
    }
    if(col2 != null) {
        if(columnpieces(col2) == 0 || Math.abs(c2) == 666)
        Cursor(col2,0);
        col2.style.backgroundColor = null;
        col2.removeEventListener('click',move);
        if(columnpieces(col2) > 1 && Math.abs(c2) != 666)
        col2.addEventListener('click',calculate);
        col2.column = c2;
    }
    if(colsum != null) {
        if(columnpieces(colsum) == 0 || Math.abs(csum) == 666)
        Cursor(colsum,0);
        colsum.style.backgroundColor = null;
        colsum.removeEventListener('click',move);
        if(columnpieces(colsum) > 1 && Math.abs(csum) != 666 )
        colsum.addEventListener('click',calculate);
        colsum.column = csum;
    }
    let c = document.querySelector(`.c${column}`);
    c.removeEventListener('click',deselect);

if(player == 1)
{
    if(column >= 1 && column <= 6)
    whitehousepieces -- ;
    if(columnn >= 1 && columnn<= 6)
    whitehousepieces ++ ;
}
else
{
    if(column >= 19 && column <= 24)
    blackhousepieces -- ;
    if(columnn >= 19 && columnn <= 24)
    blackhousepieces ++;
}
let pieces = columnpieces(c);
if(pieces == 0) // daca coloana nu mai are nicio piesa
{
    Cursor(c,0);
    c.outerHTML = c.outerHTML;
    if(player == 1) // daca nu mai are piese mancate
    {
        update('white',column,'remove');
        if(column == 69)
        {eatenwhite = false;
        for(let i = 0 ; i < whites.length ; i++)
        {
            if(Math.abs(whites[i]) != 666 ) {
            Cursor(`.c${whites[i]}`,true);
            let aux = document.querySelector(`.c${whites[i]}`);
            aux.addEventListener('click',calculate);
            aux.column = whites[i];}
        }
    }
    }
    else
    {
        update('black',column,'remove');
        if(column == -69)
        {
            eatenblack = false;
        for(let i = 0 ; i < blacks.length ; i++)
        {
            if(Math.abs(blacks[i]) != 666){
            Cursor(`.c${blacks[i]}`,true);
            let aux = document.querySelector(`.c${blacks[i]}`);
            aux.addEventListener('click',calculate);
            aux.column = blacks[i];}
        }
    }
    }

}
var finaldestination = columnn;// ii atribui click eventul si coloanei destinatie
let aux = document.querySelector(`.c${finaldestination}`);
if(columnpieces(aux) == 1 && finaldestination != -666 && finaldestination != 666)
{
    if( (player == 1 && eatenwhite == false) || (player == 0 && eatenblack == false))
    {Cursor(aux,1);
aux.addEventListener('click',calculate);
aux.column = finaldestination;
    }
prev1 = 0;
prev2 = 0;
prevsum = 0;
if(player == 1)
update('white',finaldestination,'add');
else
update('black',finaldestination,'add');
}
let y = document.querySelector('.c-666');
if(whitehousepieces + columnpieces(y) == 15) // determin cand este lastphase ul pentru un player
{
    whitelastphase = true;
}
if(eatenwhite)
whitelastphase = false;
let z = document.querySelector('.c666');
if(blackhousepieces + columnpieces(z) == 15)
{
    blacklastphase = true;
}
if(eatenblack)
blacklastphase = false;
if(whitelastphase == true) // daca e last phase ul pentru white
{
    let x = document.querySelector(`.c-666`);
    x.style.visibility = 'visible';
}
if(blacklastphase == true)
{
    let x = document.querySelector(`.c666`);
    x.style.visibility = 'visible';
}
if(whitehousepieces == 0 && whitelastphase == true)
whitewinner = true;
if(blackhousepieces == 0 && blacklastphase == true)
blackwinner = true;
if(whitewinner || blackwinner)
    {
        let winnertext = document.querySelector('.winner');
        if(whitewinner)
        {
            winnertext.innerHTML = `Player1 won!`;
        }
        else
        {
            winnertext.innerHTML = 'Player2 won!';
        }
        for(let i = 1 ; i <= 24 ; i ++)
        {
            let col = document.querySelector(`.c${i}`);
            col.outerHTML = col.outerHTML;
        }
        buton.outerHTML = buton.outerHTML;
        Cursor(buton,0);
    }
    socket.emit('victori', whites,blacks,eatenwhite,eatenblack);
    console.log('Negruzzi : ' , blacks , '\n');
    console.log('Albuzzi : ' , whites , '\n');
}

socket.on('victori',(w,b,ew,eb)=>{

    whites=w;blacks=b;
    eatenwhite=ew;
    if(eatenwhite)
        {
            for(let i=0;i<whites.length;i++)
                if(whites[i]!=69){
                    let col=document.querySelector(`.c${whites[i]}`);
                    col.removeEventListener('click',calculate);

                }
        }
    eatenblack=eb;
    if(eatenblack)
    {
        for(let i=0;i<blacks.length;i++)
            if(blacks[i]!=-69){
                let col=document.querySelector(`.c${blacks[i]}`);
                col.removeEventListener('click',calculate);
                
            }
    }
})


function move2(columnn, die, column) // functia de mutare cand dai click pe highlighted column
{
    moved = true;
    movePiece(column,columnn); 
     // mutare
    
    let zar01 = document.querySelector('.cover1');
    let zar02 = document.querySelector('.cover2');
    if(die == 1) // anulez zarul care l am folosit pt a muta
        {
            if(die3)
            {
                zar02.style.visibility = 'visible';
                die1-=die3;
                if(!die1)
                die3 = 0,zar01.style.visibility = 'visible';
            }
            else
            {
                die1 = 0;
                zar01.style.visibility = 'visible';
            }
        }
    else
        if(die == 2)
            {
                die2 = 0;
                zar02.style.visibility = 'visible';
            }
            else
                {
                    die1 = 0;
                    die2 = 0;
                    zar01.style.visibility = 'visible';
                    zar02.style.visibility = 'visible';
                }

if(die1==0 && die2==0)
lzq=true;       
//sterg event listenerurile
    if(col1 != null) {
        if(columnpieces(col1) == 0 || Math.abs(c1) == 666)
        Cursor(col1,0);
        col1.style.backgroundColor = null;
        col1.removeEventListener('click',move);
        if(columnpieces(col1) > 1 && Math.abs(c1) != 666)
        col1.addEventListener('click',calculate);
        col1.column = c1;
    }
    if(col2 != null) {
        if(columnpieces(col2) == 0 || Math.abs(c2) == 666)
        Cursor(col2,0);
        col2.style.backgroundColor = null;
        col2.removeEventListener('click',move);
        if(columnpieces(col2) > 1 && Math.abs(c2) != 666)
        col2.addEventListener('click',calculate);
        col2.column = c2;
    }
    if(colsum != null) {
        if(columnpieces(colsum) == 0 || Math.abs(csum) == 666)
        Cursor(colsum,0);
        colsum.style.backgroundColor = null;
        colsum.removeEventListener('click',move);
        if(columnpieces(colsum) > 1 && Math.abs(csum) != 666 )
        colsum.addEventListener('click',calculate);
        colsum.column = csum;
    }
    let c = document.querySelector(`.c${column}`);
    c.removeEventListener('click',deselect);

if(player == 1)
{
    if(column >= 1 && column <= 6)
    whitehousepieces -- ;
    if(columnn >= 1 && columnn<= 6)
    whitehousepieces ++ ;
}
else
{
    if(column >= 19 && column <= 24)
    blackhousepieces -- ;
    if(columnn >= 19 && columnn <= 24)
    blackhousepieces ++;
}
let pieces = columnpieces(c);
if(pieces == 0) // daca coloana nu mai are nicio piesa
{
    Cursor(c,0);
    c.outerHTML = c.outerHTML;
    if(player == 1) // daca nu mai are piese mancate
    {
        update('white',column,'remove');
        if(column == 69)
        {eatenwhite = false;
        for(let i = 0 ; i < whites.length ; i++)
        {
            if(Math.abs(whites[i]) != 666 ) {
            Cursor(`.c${whites[i]}`,true);
            let aux = document.querySelector(`.c${whites[i]}`);
            aux.addEventListener('click',calculate);
            aux.column = whites[i];}
        }
    }
    }
    else
    {
        update('black',column,'remove');
        if(column == -69)
        {
            eatenblack = false;
        for(let i = 0 ; i < blacks.length ; i++)
        {
            if(Math.abs(blacks[i]) != 666){
            Cursor(`.c${blacks[i]}`,true);
            let aux = document.querySelector(`.c${blacks[i]}`);
            aux.addEventListener('click',calculate);
            aux.column = blacks[i];}
        }
    }
    }

}
var finaldestination = columnn;// ii atribui click eventul si coloanei destinatie
let aux = document.querySelector(`.c${finaldestination}`);
if(columnpieces(aux) == 1 && finaldestination != -666 && finaldestination != 666)
{
    if( (player == 1 && eatenwhite == false) || (player == 0 && eatenblack == false))
    {Cursor(aux,1);
aux.addEventListener('click',calculate);
aux.column = finaldestination;
    }
prev1 = 0;
prev2 = 0;
prevsum = 0;
if(player == 1)
update('white',finaldestination,'add');
else
update('black',finaldestination,'add');
}
let y = document.querySelector('.c-666');
if(whitehousepieces + columnpieces(y) == 15) // determin cand este lastphase ul pentru un player
{
    whitelastphase = true;
}
if(eatenwhite)
whitelastphase = false;
let z = document.querySelector('.c666');
if(blackhousepieces + columnpieces(z) == 15)
{
    blacklastphase = true;
}
if(eatenblack)
blacklastphase = false;
if(whitelastphase == true) // daca e last phase ul pentru white
{
    let x = document.querySelector(`.c-666`);
    x.style.visibility = 'visible';
}
if(blacklastphase == true)
{
    let x = document.querySelector(`.c666`);
    x.style.visibility = 'visible';
}
if(whitehousepieces == 0 && whitelastphase == true)
whitewinner = true;
if(blackhousepieces == 0 && blacklastphase == true)
blackwinner = true;
if(whitewinner || blackwinner)
    {
        let winnertext = document.querySelector('.winner');
        if(whitewinner)
        {
            winnertext.innerHTML = `Player1 won!`;
        }
        else
        {
            winnertext.innerHTML = 'Player2 won!';
        }
        for(let i = 1 ; i <= 24 ; i ++)
        {
            let col = document.querySelector(`.c${i}`);
            col.outerHTML = col.outerHTML;
        }
        buton.outerHTML = buton.outerHTML;
        Cursor(buton,0);
    }
    console.log('Negruzzi : ' , blacks , '\n');
    console.log('Albuzzi : ' , whites , '\n');

}


$('#paseaza').hide();

socket.on('mutare',(c1,d,c2)=>{
move2(c1,d,c2);
});



buton.addEventListener('click', ()=>{
    $("#dice").hide();
    $('#paseaza').show();
    $("#paseaza").click(()=>{
        socket.emit('gara');
        $('#paseaza').hide();
            });
});


socket.on('gara',()=>$("#dice").show());
