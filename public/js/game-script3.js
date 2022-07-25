var die1,die2,die3;
var moved = true;
var eatenwhite = false , eatenblack = false;
let whitewinner = false,blackwinner = false;
let zar01 = document.querySelector('.cover1');
let zar02 = document.querySelector('.cover2');
let textrobot = document.querySelector('.robot');   
let winnertext = document.querySelector('.winner');
let blacks = [1,12,17,19];
    let whites = [6,8,13,24];
    let whitehousepieces = 5; // 5
    let blackhousepieces = 5; // 5 
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
    }
    var remainder = columnpiecesnumber + number-5;
    alignElements(column);
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
//daca string = 'test' atunci va pregati piese pentru testarea lastphase-ului
function startPieces(string) // functia ce da startul jocului prin pozitionarea tuturor pieselor
{
    if(string == 'test')
    {
        addPiece(1,3,'WHITE');
        addPiece(2,3,'WHITE');
        addPiece(3,2,'WHITE');
        addPiece(4,2,'WHITE');
        addPiece(5,2,'WHITE');
        addPiece(6,2,'WHITE');
        addPiece(7,1,'WHITE');
        addPiece(24,3,'BLACK');
        addPiece(23,3,'BLACK');
        addPiece(22,2,'BLACK');
        addPiece(21,2,'BLACK');
        addPiece(20,2,'BLACK');
        addPiece(19,2,'BLACK');
        addPiece(18,1,'BLACK');
        blackhousepieces = 14;
        whitehousepieces = 14;
        blacks = [18,19,20,21,22,23,24];
        whites = [1,2,3,4,5,6,7];
    }
    else{
addPiece(24,2,'WHITE');
addPiece(1,2,'BLACK');
addPiece(19,5,'BLACK');
addPiece(6,5,'WHITE');
addPiece(17,3,'BLACK');
addPiece(8,3,'WHITE');
addPiece(13,5,'WHITE');
addPiece(12,5,'BLACK');}
  $("#dice").hide();
}
//startPieces('asd');
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
//Cursor('#dice',true);
function roll() // dai cu zarul
{
    if(canbepressed)
    {
        die3 = 0;
    die1 = Math.ceil(Math.random()*6) ;
    die2 = Math.ceil(Math.random()*6) ;
    die1 > 0 ? 0 : die1++;
    die2 > 0 ? 0 : die2++;
    if(die1 > die2)
    [die1,die2] = [die2,die1];
    zaruri(die1,die2);
    if(die1 == die2)
    {die1 *= 4;
        die2 = 0;
        die3 = die1/4;
    }
}
}
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
    let lastpiece = (column >= 13 && column <= 24 || column == -69 ) ? colpieces[colpieces.length-1] : colpieces[0];
    blacks.includes(column) ? color = 'black' : color = 'white';
    if(color == 'black')
    {
        if(!blacks.includes(destination) && destination != -69 && destination != 666)
            update('black',destination,'add');
        if(columnpieces(col) == 1)
            update('black',column,'remove');
        if(column >= 19 && column <= 24)
            blackhousepieces--;
        if(destination >= 19 && destination <= 24)
            blackhousepieces++;
    }
    addPiece(destination,1,color);
    if(colpieces.length > 0)
    {if(lastpiece.innerText == '')
    lastpiece.remove();
    else
    {
        let text = lastpiece.innerText;
            var nr;
            if(text.length == 2)
            nr = parseInt(text[1]);
            else
            nr = parseInt(text[1]) * 10 + parseInt(text[2]);
            nr--;
            if(nr > 1)
            lastpiece.innerText = `x${nr}`;
            else
            lastpiece.innerText = '';
    }
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
        let columnpiecesnumber =  y.length; // numarul de piese din coloana
        for(let i = 0 ; i < columnpiecesnumber ; i++)
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
    movePiece(column,columnn); // mutare
    
                //sterg event listenerurile
   
    let c = document.querySelector(`.c${column}`);
    c.removeEventListener('click',deselect);


    Cursor(c,0);
    c.outerHTML = c.outerHTML;
    let acum = document.querySelector('.c3');
    acum.style.backgroundColor = 'pink';

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
    
    //in urm 3 linii adaug optiunea de deselectare a coloanei in cazul in care userul se rasgandeste
    let col = document.querySelector(`.c1`);
    col.c = 1;
    col.addEventListener('click',deselect);
col1 = document.querySelector('.c3');
if(col1 != null) {col1.style.backgroundColor = 'blue';
Cursor(col1,1);
col1.addEventListener('click',move);
col1.c = 3;
col1.d = 1;
col1.cstart = 1;
col1.removeEventListener('click',calculate);
}

}
function update(vector , element , procedure) // vector - string cu 'white' sau 'black' ca sa determin vectorul de updatat
{ // element e un numar ce trebuie inserat/sters
// procedure e  un string cu 'add' sau 'remove'
console.log(`update(${vector} , ${element} , ${procedure})`);
if(vector.toLowerCase() == 'white')
{
    if(procedure.toLowerCase() == 'add')
    {
        whites.splice(0,0,element);
    }
    else
    {
        let index = -1;
    for(let i = 0 ; i < whites.length ; i ++)
    {
        if(whites[i] == element)
        {
            index = i;
            break;
        }
    }
    if(index != -1)
    whites.splice(index,1);
    }

}
else
{
    if(procedure.toLowerCase() == 'add')
    {
        blacks.splice(0,0,element);
    }
    else
    {
        let index = -1;
    for(let i = 0 ; i < blacks.length ; i ++)
    {
        if(blacks[i] == element)
        {
            index = i;
            break;
        }
    }
    if(index != -1)
    blacks.splice(index,1);
    }

}
}
function checkformoves(column) // pt robot
{
    c2 = -12398;
    if(column == -69)
        column = 0;
    if(die3)
    {
        c1 = column + die3;
    }
    else {
    c1 = column + die1;
    c2 = column + die2;
    }
    if(column == 0)
        column = -69;
        if(blacklastphase)
        {
            if(c1 == 25)
                c1 = 666;
            if(c2 == 25)
            c2 = 666; 
        }
    if(die3 && checkTwoColumns(column,c1) != 0)
        return 3; /// folosesc die3
        if(!die3 && checkTwoColumns(column,c1) != 0)
        return 1; /// folosesc die1
        if(!die3 && checkTwoColumns(column,c2) != 0)
        return 2; /// folosesc die2
    return 0;
}
function robot() 
{
    roll();
    var p = 4;
    while(blacks.includes(-69) && (die1 || die2))
    {
         p = checkformoves(-69);
        if(p != 0) 
        {
        if(p == 3) // daca am dubla
        {
            c1 = die3;
            textrobot.innerText += `C-69 - C${c1} (${die3}),`;
            die1-= die3;
            zar02.style.visibility = 'visible';
            movePiece(-69,c1);
        }
        else if(p == 1)
        {
            c1 = die1;
            textrobot.innerText += `C-69 - C${c1} (${die1}),`;
            die1= 0;
            zar01.style.visibility = 'visible';
            movePiece(-69,c1);
        }
        else if(p == 2)
        {
            c1 = die2;
            textrobot.innerText += `C-69 - C${c1} (${die2}),`;
            die2 = 0;
            zar02.style.visibility = 'visible';
            movePiece(-69,c1);
        }
    }
    else
    break;
    }
    if(p != 0)
    while(die1 + die2 > 0)
    {
        if(!blacklastphase)
        {var choice = blacks[Math.ceil(Math.random() * (blacks.length )) - 1];
        console.log(choice);
        while(checkformoves(choice) == 0)
            {
                
                choice = blacks[Math.ceil(Math.random() * blacks.length) - 1];
            }
            p = checkformoves(choice);
        if(p == 3)
        {
            c1 = choice + die3;
            textrobot.innerText += `C${choice} - C${c1} (${die3}),`;
            die1 -= die3;
            if(!die1)
                die3 = 0;
            zar02.style.visibility = 'visible';
            movePiece(choice,c1);
            
        }
        else if(p == 1)
        {
            c1 = choice + die1;
            textrobot.innerText += `C${choice} - C${c1} (${die1}),`;
            die1 = 0;
            zar01.style.visibility = 'visible';
            movePiece(choice,c1);
            
        }
        else if (p == 2)
        {
            c1 = choice + die2;
            textrobot.innerText += `C${choice} - C${c1} (${die2}),`;
            die2 = 0;
            zar02.style.visibility = 'visible';
            movePiece(choice,c1);
            
        }
        let z = document.querySelector('.c666');
        if(blackhousepieces + columnpieces(z) == 15)
        {
            blacklastphase = true;
        }
        if(eatenblack)
        blacklastphase = false;
        if(blacklastphase == true)
        {
            let x = document.querySelector(`.c666`);
            x.style.visibility = 'visible';
        }
    }
    else // breakeru
    {
        var first;
        
        for(first = 19 ; first <= 24 ; first ++)
            if(blacks.includes(first))
                break;
        while(blacks.includes(25-die3))
        {
            die1 -= die3;
            textrobot.innerText += `C${25-die3} - C666 (${die3}),`;
            if(!die1)
                die3 = 0;
                movePiece(25-die3,666);
                
        }
        if( !die3 && blacks.includes(25-die1))
        {
            movePiece(25-die1,666);
            textrobot.innerText += `C${25-die1} - C666 (${die1}),`;
            die1 = 0;
        }
        if( !die3 && blacks.includes(25-die2))
        {
            movePiece(25-die2,666);
            textrobot.innerText += `C${25-die2} - C666 (${die2}),`;
            die2 = 0;
        }
        while(die1 + die2)
        {
            if(die3)
            {
                if(first + die3 >= 25)
                {
                    movePiece(first,666);
                    die1 -= die3;
                    textrobot.innerText += `C${first} - C666 (${die3}),`;
                    if(!die1)
                        die3 = 0;
                        
                }
                else
                {
                    movePiece(first,first+die3);
                    die1 -= die3;
                    textrobot.innerText += `C${first} - C${first+die3} (${die3}),`;
                    if(!die1)
                        die3 = 0;
                }
            }
            else
                if(die1)
                {
                    if(first+die1 >= 25)
                    {
                        movePiece(first,666);
                    textrobot.innerText += `C${first} - C666 (${die1}),`;
                    die1 = 0;
                    }
                    else
                    {
                        movePiece(first,first+ die1);
                    textrobot.innerText += `C${first} - C${first+die1} (${die1}),`;
                    die1 = 0;
                    }
                }
                else if(die2)
                {
                    if(first+die2 >= 25)
                    {
                        movePiece(first,666);
                    textrobot.innerText += `C${first} - C666 (${die2}),`;
                    die2 = 0;
                    }
                    else
                    {
                        movePiece(first,first+ die2);
                    textrobot.innerText += `C${first} - C${first+die2} (${die2}),`;
                    die2 = 0;
                    }
                }
        }
        if(blackhousepieces == 0)
            blackwinner = true;
        if(blackwinner)
        {
            winnertext.innerHTML = "Jucatorul 2 a castigat!";
            for(let i = 1 ; i <= 24 ; i ++)
        {
            let col = document.querySelector(`.c${i}`);
            col.outerHTML = col.outerHTML;
        }
        buton.outerHTML = buton.outerHTML;
        Cursor(buton,0);
        }
    }
    }
    console.log(`Negruzzi : ${blacks}`);
    buton.innerText = 'Aruncă zarurile';
}
