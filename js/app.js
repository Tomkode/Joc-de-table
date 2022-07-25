

  const socket=io();



  socket.on('player-number',(num)=>{
    if(num==-1)
      window.location="http://google.com";
    console.log(`Ich bin ${num}`);
    player=num;
  });


  socket.on('msjS', (msg)=>{
    var item = document.createElement('li');
    item.id='srvr';
    if(player==0)
    msg=msg+"Plays with white.";
    else
    msg=msg+"Plays with blacks.";
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
  socket.on('msj', (msg)=>{
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });

  socket.on('zaruri', (d1,d2)=>{
    zaruri(d1,d2);
    die1=d2;
    die2=d2;
    if(d1 == d2)
    {
        die1 *= 4;
        die2 = 0;
        die3 = die1/4;
      }
  });

  // socket.on('cnvmutat', (c,d)=>{
  //   movePiece(c,d);
  // });
