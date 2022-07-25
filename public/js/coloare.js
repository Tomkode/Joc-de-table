document.body.addEventListener("load", ()=>{
$(".hower2").hide();

})

function asc(x){
    if(x)
      {
          $("#dice").show();
          $(".hower2").hide();
     }
      else
        $("#dice").hide();
}
asc(0);

function gata(x){
    if(x)
    {
        $(".playground").hide();
    }
}