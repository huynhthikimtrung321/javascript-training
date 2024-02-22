// Declaration
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // methods get and set
  get dimensions() {
    return this.width + "x" + this.height;
  }

  set dimensions(value) {
    [this.width, this.height] = value.split("x");
  }

  get area() {
    return this.width * this.height;
  }

  get result() {
    return `Area of a ${this.dimensions} rectangle is ${this.area}`;
  }
}

let rectangle = new Rectangle(5, 10);
console.log(rectangle.result);
rectangle.dimensions = "7x12";
console.log(rectangle.result);
console.log(new Rectangle(10, 20));

// Anonymous Class Assigned to a Variable
const Rectangle1 = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

console.log(new Rectangle1(15, 25));

// Named Class Expression
const Rectangle2 = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(new Rectangle2(8, 12));

class Acreage extends Rectangle {
  constructor(height, width) {
    super(height, width);
    console.log(
      `Edge created with height: ${this.height}, width: ${
        this.width
      }, and acreage: ${height * width}`
    );
  }
}

const edgeInstance = new Acreage(10, 25);

//Static method
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static displayName = "Point";
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.displayName); 
console.log(Point.distance(p1, p2));
