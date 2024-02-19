const x = document.forms['frm1'];
let text = '';
for (let i = 0; i < x.length; i++) {
  text += x.elements[i].value + '<br>';
}
document.getElementById('demo').innerHTML = 'Name: ' + text;
const y = document.getElementsByClassName('intro');
document.getElementById('introduction').innerHTML = 'About: ' + y[0].innerHTML;

setTimeout(runExample, 4000);
function runExample() {
  const users = document.querySelectorAll('.user');
  const userCount = users.length;
  for (let i = 0; i < userCount; i++) {
    const username = users[i].querySelector('.username').value;
    const age = parseInt(users[i].querySelector('.age').value);

    console.log(`User ${i + 1}:`);
    console.log(`Username: ${username}`);
    console.log(`Age: ${age}`);
  }

  const newAges = document.querySelectorAll('#userList .age');
  newAges.forEach((element) => {
    element.setAttribute('value', '22');
  });

  console.log('Age after being changed: ', newAges[0].value);

  console.log('Useful info of content is:', content.getAttribute('useful-info'));

  const contentElement = document.querySelector('#content');
  contentElement.removeAttribute('data-useful-info');
  console.log('Attribute after being removed:', contentElement)

  contentElement.classList.add('my-class');

  contentElement.classList.toggle('my-class');

  contentElement.classList.toggle('your-class');

  console.log(contentElement.classList.contains('abc'));

  contentElement.classList.replace('your-class', 'my-class');
}
