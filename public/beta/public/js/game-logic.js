buton = document.querySelector('#dice');
let game = 1, gameaux=1;
    let blacks = [1,12,17,19];
    let whites = [6,8,13,24];
    let whitehousepieces = 5; // 5
    let blackhousepieces = 5; // 5
    let blacklastphase = false; // false
    let whitelastphase = false; // false
    player = 0;
    var canbepressed;
function start()
{
    if(canbepressed)
    {
        if(player === 1)
        {
            if(eatenwhite == false)
            for(let i = 0 ; i < whites.length ; i++)
        {
            Cursor(`.c${whites[i]}`,true);
            let aux = document.querySelector(`.c${whites[i]}`);
            aux.addEventListener('click',calculate);
            aux.column = whites[i];
        }
        else
        {
            Cursor(`.c69`,true);
            let aux = document.querySelector(`.c69`);
            aux.addEventListener('click',calculate);
            aux.column = 69;
        }

    }
    else
        {
            if(eatenblack == false)
            for(let i = 0 ; i < blacks.length ; i++)
        {
            Cursor(`.c${blacks[i]}`,true);
            let aux = document.querySelector(`.c${blacks[i]}`);
            aux.addEventListener('click',calculate);
            aux.column = blacks[i];
        }
        else
        {
            Cursor(`.c-69`,true);
            let aux = document.querySelector(`.c-69`);
            aux.addEventListener('click',calculate);
            aux.column = -69;
        }
        }
    }
}
buton.addEventListener('click',function(){ // verific daca a efectuat toate mutarile posibile
canbepressed = true;
if(die1 + die2 > 0)
{
    if(player == 1)
    {
        for(let i = 0 ; i < whites.length ; i ++)
        {
            let column = whites[i];
            if(eatenwhite == true)
            {
                column = 69;
                i = 100;
            }
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
            if(checkTwoColumns(column,c1) || checkTwoColumns(column,c2))
                {
                    canbepressed = false;
                    break;
                }
    }
    }
    else
    {
        for(let i = 0 ; i < blacks.length ; i ++)
        {
            let column = blacks[i];
            if(eatenblack == true)
            {
                column = -69;
                i  = 100;
            }
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
        if(checkTwoColumns(column,c1) || checkTwoColumns(column,c2))
                {
                    canbepressed = false;
                    break;
                }
        }
    }

}
})
buton.addEventListener('click',function () {
    if(canbepressed)
    {
        prev1 = 0;
    prev2 = 0;
    prevsum = 0;
    player == 1 ? player = 0 : player = 1;
    if(game > 1)
    if(player == 0)
    {
        for(let i = 0 ; i < whites.length ; i ++)
        {
            let aux = document.querySelector(`.c${whites[i]}`);
            aux.removeEventListener('click',calculate);
            Cursor(aux,0);
        }
    }
    else
    {
        for(let i = 0 ; i < blacks.length ; i ++)
        {
            let aux = document.querySelector(`.c${blacks[i]}`);
            Cursor(aux,0);
            aux.removeEventListener('click',calculate);

        }
    }
    if(game != 0)
    game++;
}
else
alert('There are possible moves to be made!');
    
})
buton.addEventListener('click',roll);
buton.addEventListener('click',start);

function resetcovers()
{
    if(canbepressed)
    {let zar01 = document.querySelector('.cover1');
    let zar02 = document.querySelector('.cover2');
    zar01.style.visibility = 'hidden';
    zar02.style.visibility = 'hidden';}
}
buton.addEventListener('click',resetcovers);
