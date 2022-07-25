WHITECOLOR = '#ffffff';
BLACKCOLOR = '#000000';
addPiece(1,1,'BLACK' );
addPiece(2,2,'WHITE');
blacks = [1];
whites = [2];
let coloana1 = document.querySelector('.c1');
Cursor(coloana1,true);
coloana1.addEventListener('click',calculate);
coloana1.column = 1;
let coloana2 = document.querySelector('.c2');

