document.getElementById('submitID').disabled = true; 
let okuser = false;
document.getElementById('user').addEventListener('keyup', e => {
  if (e.target.value != "") {
    okuser = true;
  }
  else
    okuser = false;
});
console.log('adsad');
document.getElementById('pw').addEventListener('keyup', e => {
    if (e.target.value != "" && okuser == true) {
        document.getElementById('submitID').disabled = false; 
    }
    else
    document.getElementById('submitID').disabled = true; 
  });