var productValue;

const productElement = document.getElementById('product');
productElement.oninput = function (e) {
  productValue = e.target.value;
};

btn.onclick = () => {
    btn.after(productElement.value);
  };
  
const section = document.querySelector('section');

section.addEventListener('click', event => {
	console.log(event.target);
});

var checkboxElement = document.getElementById('my-checkbox');
checkboxElement.onchange =  function(e) {
    console.log(e.target.checked);
}
          
class MyClass {
    handleEvent(event) {
      switch (event.type) {
        case 'mousedown':
          newButton.textContent = 'Mouse button pressed';
          break;
        case 'mouseup':
          newButton.textContent += '...and released.';
          break;
      }
    }
  }

let myClassInstance = new MyClass();

newButton.addEventListener('mousedown', myClassInstance);
newButton.addEventListener('mouseup', myClassInstance);

const parent = document.getElementById('parent');
const child = document.getElementById('child');

parent.onclick = function () {
  console.log('Clicked on parent');
};

child.onclick = function () {
  console.log('Clicked on child');
};

document.addEventListener('click', (event) => {
  console.log('x: ' + event.clientX);
  console.log('y: ' + event.clientY);
});

button3.addEventListener('click', () => alert('Alert again!'));
button3.addEventListener('click', () => alert('Alert again!'));

function handleMouseDown(event) {
  console.log('Mouse button pressed at ' + event.currentTarget);
}

function handleMouseUp(event) {
  console.log('Mouse button released at ' + event.currentTarget);
}

let elem = document.getElementById('myElement');

elem.addEventListener('mousedown', handleMouseDown);
elem.addEventListener('mouseup', handleMouseUp);
