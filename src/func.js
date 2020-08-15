function Dog(){}
function Animal(){}
/**
 dog instanceof Animal
 dog.__proto__.__proto__... == Animal.prototype
 dog.__proto__ == Dog.prototype
 Dog.prototype.__proto__... === Animal.prototype
 */
Object.defineProperties(Animal.prototype, {
    name: {
        value(){
            return 'Animal'
        }
    },
    say: {
        value(){
            return `I am ${this.name()}`
        }
    }
});
//多态，子类覆盖父类的方法
Dog.prototype = Object.create(Animal.prototype, {
    constructor: {
        value: Dog,
        enumerable: false
    },
    name: {
        value(){
            return "Dog"
        }
    }
});

console.log(new Dog().say());
console.log(new Dog().constructor);