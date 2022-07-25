var die1,die2,die3;
var moved = true;
var eatenwhite = false , eatenblack = false;
let whitewinner = false,blackwinner = false;

function cecool(q,e){
  if(q==0)
    {
      WHITECOLOR=e;
    }
  else{
    BLACKCOLOR=e;
}
}

function columnpieces(column) // column este de tip obiect
{
    let y = column.querySelectorAll('.piece');
    return y.length;
}
function addPiece(column , number ,color)   // color = 'WHITE' sau 'BLACK'
{
    var x = document.querySelector(`.c${column}`);
    let columnpiecesnumber =  columnpieces(x); // numarul de piese din coloana
    if(column == 69)
    {
        eatenwhite = true;
        if(columnpiecesnumber == 0)
        {
        update('white',69,'add');
        }

    }
    if(column == -69)
    {
        eatenblack = true;
        if(columnpiecesnumber == 0)
        {
        update('black',-69,'add');
    }
    }
    for(let i = 1 ; i <= Math.min(number,5-columnpiecesnumber) ; i ++) // creez maxim 5 piese
    {

    var piece = document.createElement('div');
        x.appendChild(piece);
        piece.classList.add('piece' , `${color.toLowerCase()}`);
        if(color.toLowerCase() === 'black')
        piece.style.backgroundColor = BLACKCOLOR;
        else {
          piece.style.backgroundColor = WHITECOLOR;
        }
    }  alignElements(column);
    var remainder = columnpiecesnumber + number-5;
    if(remainder>0) // secventa de stackare
    {
        var pieces = x.querySelectorAll('.piece');
        if(column >= 1 && column <=12 || column == -69 || column == -666)
            var piece = pieces[0];
        else
            var piece = pieces[pieces.length-1];
            if(piece.innerText == '') // daca nu are piese stackate
        {
            let text = document.createTextNode(`x${remainder+1}`)
            piece.appendChild(text);
            piece.setAttribute('style' , 'color : turquoise ; font-weight : bold ; text-align : center;');
            if(blacks.includes(column) || column == 666)
            {
                piece.style.backgroundColor = BLACKCOLOR;
            }
            else
            if(whites.includes(column) || column == -666)
                piece.style.backgroundColor = WHITECOLOR;
        }
        else // daca are piese stackate
        {
            let text = piece.innerText;
            var nr;
            if(text.length == 2)
            nr = parseInt(text[1]);
            else
            nr = parseInt(text[1]) * 10 + parseInt(text[2]);
            nr++;
            piece.innerText = `x${nr}`;
        }
    }
}
function startPieces() // functia ce da startul jocului prin pozitionarea tuturor pieselor
{
addPiece(24,2,'WHITE');
addPiece(1,2,'BLACK');
addPiece(19,5,'BLACK');
addPiece(6,5,'WHITE');
addPiece(17,3,'BLACK');
addPiece(8,3,'WHITE');
addPiece(13,5,'WHITE');
addPiece(12,5,'BLACK');
}
function admi(x){

  if(x==0)
    {  $(".hower").show();
      $(".hower2").hide();
    }
  else
  {
     $("#rabdare2").show();
     $("#rabdare1").hide();
  }
}

function init(){
  $("#dice").hide();
  $("#rabdare2").hide();
  $(".hower").hide();

}
init();

function Cursor(selector,bool) // schimba cursorul din default in pointer cand faci hover peste un obiect
{ // bool primeste true pt adaugare si false pt remove
    var element;
    if((typeof selector) === 'string')
    element = document.querySelector(selector);
    else
    element = selector;
if(bool == true)
{   let aux = element.style.cssText.search('pointer');
        if(aux < 1)
        element.style.cursor = 'pointer';
}
    else
    {
        element.style.cursor = 'default';
    }

}
Cursor('#dice',true);

function movePiece(column , destination)
{
    let col = document.querySelector(`.c${column}`);
    let colpieces = col.querySelectorAll('.piece');
    if(checkTwoColumns(column,destination) == 2)
    {
        if(blacks.includes(destination))
        {
            movePiece(destination,-69);
            update('black' , destination , 'remove' );
            if(destination >=19 && destination <= 24)
            blackhousepieces --;

        }
        else
        {
            movePiece(destination,69);
            update('white' , destination , 'remove' );
            if(destination >= 1 && destination <= 6)
            whitehousepieces -- ;

        }
        movePiece(column,destination);
    }
    else
    if(checkTwoColumns(column,destination) == 1) // daca sunt piese pe coloana respectiva
    {
    let lastpiece = (column >= 13 && column <= 24) ? colpieces[colpieces.length-1] : colpieces[0];
    blacks.includes(column) ? color = 'black' : color = 'white';
    addPiece(destination,1,color);
    if(lastpiece.innerText == '')
    lastpiece.remove();
    else
    {
        let text = lastpiece.innerText;
            let nr = parseInt(text[1]);
            nr--;
            if(nr > 1)
            lastpiece.innerText = `x${nr}`;
            else
            lastpiece.innerText = '';
    }
    alignElements(column);
    }
}
function alignElements(column)
{
    var x = document.querySelector(`.c${column}`);
    if(column >= 1 && column <=12 || column == -69) // daca e in partea de jos
    {
        let y = x.querySelectorAll('.piece');
        let columnpiecesnumber =  columnpieces(x); // numarul de piese din coloana
        for(let i = columnpiecesnumber-1 ; i>=0  ; i--)
        y[i].style.transform = `translateY(${5-Math.min(columnpiecesnumber,5)}00%)`; // sa inceapa piesele de jos
    }
}
function checkTwoColumns(column1,column2) // piesa din column1 va fi pusa peste cea din column2
{
    if(column2 == 69 || column2 == -69 || column2 == 666 || column2 == -666) // daca piesa este mancata sau e removed
    return 1;
    if(!valid(column2) || column1 == column2)
    return 0;
let c1 = document.querySelector(`.c${column1}`);
let c2 = document.querySelector(`.c${column2}`);
let pieces1 = c1.querySelectorAll(`.piece`);
let pieces2 = c2.querySelectorAll('.piece');
if(pieces2.length == 0)
return 1;
if(pieces1.length > 0)
{
let p1 = column1 >=13 ? pieces1[pieces1.length-1] : pieces1[0];
let p2 = column2 >=13 ? pieces2[pieces2.length-1] : pieces2[0];
let style1 = window.getComputedStyle(p1);
let color1 = style1.getPropertyValue('background-color');
let style2 = window.getComputedStyle(p2);
let color2 = style2.getPropertyValue('background-color');
if(color1 != color2 && pieces2.length == 1)
return 2 ; // piesa din column2 va fi mancata
if(color1 == color2)
return 1 ; // sunt de aceeasi culoare si pot fi mutate
return 0 ; // nu sunt de aceeasi culoare si nu pot fi mutate
}
}
var prev1=0,prev2=0,prevsum=0,prevfinal = 0,prevcolumn = 0,player;
var col1,col2,colsum,colfinal,c1,c2,csum,cfinal;

function poateca(x) {
  player=x;
}
function valid(c)
{
    if(c >=1 && c<=24 || Math.abs(c) == 666)
    return 1;
    return 0;
}
function move(evt) // functia de mutare cand dai click pe highlighted column
{
    let columnn = evt.currentTarget.c;
    let die = evt.currentTarget.d;
    let column = evt.currentTarget.cstart;
    moved = true;
    movePiece(column,columnn);
    resurectie(column,columnn); // mutare
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
function deselect(evt) // functie ce iti deselecteaza o coloana daca ti ai schimbat decizia de a o muta
{
let column = evt.currentTarget.c;
if(col1 != null) {
    if(columnpieces(col1) == 0)
    Cursor(col1,0);
    else if(c1 != 666 && c1 != -666)
            col1.addEventListener('click',calculate);
    col1.style.backgroundColor = null;
    col1.removeEventListener('click',move);
}
if(col2 != null) {
    if(columnpieces(col2) == 0)
    Cursor(col2,0);
    else if(c2 != -666 && c2 != 666)
            col2.addEventListener('click',calculate);
    col2.style.backgroundColor = null;
    col2.removeEventListener('click',move);
}
if(colsum != null) {
    if(columnpieces(colsum) == 0)
    Cursor(colsum,0);
    else if (csum != -666 && csum != 666)
            colsum.addEventListener('click',calculate);
    colsum.style.backgroundColor = null;
    colsum.removeEventListener('click',move);
}
let col = document.querySelector(`.c${column}`);
col.removeEventListener('click',deselect);
}
//functia ce imi da highlight la mutarile posibile si ma lasa sa mut
function calculate(evt) // column si n sunt numerice
{
    moved = false;
    if(die1 + die2 > 0)
    {
        let column = evt.currentTarget.column;
    if(moved == false) // daca nu a mutat si a schimbat coloana
        {if(valid(prev1))
        {

            let aux = document.querySelector(`.c${prev1}`);
            aux.style.backgroundColor = null;
            if(columnpieces(aux) == 0)
            Cursor(aux,0);
            else if(prev1 != -666 && prev1 != 666)
            aux.addEventListener('click',calculate);
            aux.removeEventListener('click',move);
        }
        if(valid(prev2))
        {

            let aux = document.querySelector(`.c${prev2}`);
            aux.style.backgroundColor = null;
            if(columnpieces(aux) == 0)
            Cursor(aux,0);
            else if(prev2 != -666 && prev2 != 666)
            aux.addEventListener('click',calculate);

            aux.removeEventListener('click',move);
        }
        if(valid(prevsum))
        {

            let aux = document.querySelector(`.c${prevsum}`);
            aux.style.backgroundColor = null;
            if(columnpieces(aux) == 0)
            Cursor(aux,0);
            else if(prevsum != -666 && prevsum != 666)
            aux.addEventListener('click',calculate);
            aux.removeEventListener('click',move);
        }
        if(prevcolumn != column && valid(prevcolumn))
        {
            let aux = document.querySelector(`.c${prevcolumn}`);
            aux.removeEventListener('click',deselect);
        }
        }
    moved = false;
    let n = player;
    col1 = null;
    col2 = null;
    colsum = null;
    //in urm 3 linii adaug optiunea de deselectare a coloanei in cazul in care userul se rasgandeste
    let col = document.querySelector(`.c${column}`);
    col.c = column;
    col.addEventListener('click',deselect);
if(n == 1) // daca e jucatorul 1 dau highlight la coloanele cu indice c-zar1,c-zar2 si c-suma
{
    if(column == 69)
{
    if(!die3)
    {
        c1 = 25 - die1;
    c2 = 25 - die2;
    25 - die1 - die2 < 19 ? csum = 0 : csum = 25 - die1 - die2;
    }
    else
{
    c1 = 25 - die3;
    c2 = 0;
    csum = 0
}
}
else
{
    if(die3) // dubla
{
    c1 = column - die3;
    c2 = 0;
    csum = 0;
}
else
{c1 = column - die1;
c2 = column - die2;
csum = column - die1 - die2;}
if(whitelastphase == true)
{
    if(c1 == 0)
    c1 = -666;
    if(c2 == 0 && !die3)
    c2 = -666;
    if(csum == 0 && !die3)
    csum = -666;
    let max = Math.max(...whites);
    if(max == column)
    {
        if(c1 < 0)
        c1 = -666;
        if(c2 < 0&& c1 != -666)
        c2 = -666;
    }

}
}

}
else // daca e jucatorul 0 adica black fac la fel doar ca in sens invers
{
    if(column == -69)
{
    if(!die3)
    {
        c1 = die1;
    c2 = die2;
    die1 + die2 > 6 ? csum = 0 : csum = die1 + die2;
    }
    else
    {
        c1 = die3;
        c2 = 0
        csum = 0;
    }
}
else
    {
        if(die3) // dubla
{
    c1 = column + die3;
    c2 = 0;
    csum = 0;
} else
{c1 = column + die1;
c2 = column + die2;
csum = column + die1 + die2;}
if(blacklastphase == true)
{
    if(c1 == 25)
    c1 = 666;
    if(c2 == 25 && !die3)
    c2 = 666;
    if(csum == 25 && !die3)
    csum = 666;
    let min = Math.min(...blacks);
    if(min == column)
    {
        if(25<c1)
        c1 = 666;
        if(25<c2 && c1 != 666)
        c2 = 666;
    }

}
    }
}
if(player == 1 && eatenwhite == true)
    csum = -3;
if(player == 0 && eatenblack == true)
    csum = -3;
var possible = false , valid1 , valid2 , validsum;
    if(checkTwoColumns(column,c1))
        {col1 = document.querySelector(`.c${c1}`);possible = true; valid1 = true;}
    if(checkTwoColumns(column,c2))
        {col2 = document.querySelector(`.c${c2}`);possible = true ; valid2 = true;}
        validsum = valid1 || valid2;
    if(validsum && checkTwoColumns(column,csum) && csum != c1 && csum != c2 && possible == true)
        {colsum = document.querySelector(`.c${csum}`);}


if(col1 != null) {col1.style.backgroundColor = 'blue';
Cursor(col1,1);
col1.addEventListener('click',move);
col1.c = c1;
col1.d = 1;
col1.cstart = column;
col1.removeEventListener('click',calculate);
}
if(col2 != null) {col2.style.backgroundColor = 'blue';
Cursor(col2,1);
col2.addEventListener('click',move);
col2.c = c2;
col2.d = 2;
col2.cstart = column;
col2.removeEventListener('click',calculate);

}
if(colsum != null) {colsum.style.backgroundColor = 'blue';
Cursor(colsum,1);
colsum.addEventListener('click',move);
colsum.c = csum;
colsum.d = 3;
colsum.cstart = column;
colsum.removeEventListener('click',calculate);

}


        prev1 = c1;
        prev2 = c2;
        prevsum = csum;
        prevcolumn = column;
}
}
function update(vector , element , procedure) // vector - string cu 'white' sau 'black' ca sa determin vectorul de updatat
{ // element e un numar ce trebuie inserat/sters
// procedure e  un string cu 'add' sau 'remove'
if(vector.toLowerCase() == 'white')
{
    if(procedure.toLowerCase() == 'add')
    {
        whites.splice(whites.length,0,element);
    }
    else
    {
        let index = 0;
    for(let i = 0 ; i < whites.length ; i ++)
    {
        if(whites[i] == element)
        {
            index = i;
            break;
        }
    }
    whites.splice(index,1);
    }

}
else
{
    if(procedure.toLowerCase() == 'add')
    {
        blacks.splice(blacks.length,0,element);
    }
    else
    {
        let index = 0;
    for(let i = 0 ; i < blacks.length ; i ++)
    {
        if(blacks[i] == element)
        {
            index = i;
            break;
        }
    }
    blacks.splice(index,1);
    }

}

}
