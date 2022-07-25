function zaruri(zar1,zar2){
  //alert(zar1+" "+ zar2);
  $('.dice').removeClass(" dice");
  $('.duplicate').empty();
  let x1,x2;
  switch(zar1){
    case 1: x1=".first-face";break;
    case 2: x1=".second-face";break;
    case 3: x1=".third-face";break;
    case 4: x1=".fourth-face";break;
    case 5: x1=".fifth-face";break;
    default:x1=".sixth-face";break;
  }
  switch(zar2){
    case 1: x2=".first-face";break;
    case 2: x2=".second-face";break;
    case 3: x2=".third-face";break;
    case 4: x2=".fourth-face";break;
    case 5: x2=".fifth-face";break;
    default:x2=".sixth-face";break;
  }
  if(zar1!=zar2){
  $(x2).addClass(" dice");
  $(x1).addClass(" dice");
  }
  else{
    $(x1).addClass(" dice");
    $(x1).clone().appendTo(".duplicate");
  }
  
  }
  