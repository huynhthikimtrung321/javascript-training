const x = document.forms["frm1"];
let text = "";
for (let i = 0; i < x.length ;i++) {
  text += x.elements[i].value + "<br>";
}
document.getElementById("demo").innerHTML = 
"Name: " + text;
const y = document.getElementsByClassName('intro');
document.getElementById('introduction').innerHTML = 'About: ' + y[0].innerHTML;
