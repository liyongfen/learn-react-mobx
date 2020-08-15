class Animal{
    name(){
        return 'Animal';
    }
    say(){
        return `I am ${this.name()}`
    }
}

class Dog extends Animal{
    foo='foo';
    
    name(){
        return 'Dog';
    }
}

console.log(new Dog() instanceof Animal);