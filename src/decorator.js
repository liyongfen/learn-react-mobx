"use strict"
function log(target){
    const desc = Object.getOwnPropertyDescriptors(target.prototype);
    for(let key of Object.keys(desc)){
        if(key === 'constructor'){
            continue;
        }
        const func = desc[key].value;
        if (typeof func === 'function'){
            Object.defineProperty(target.prototype, key, {
                value(...args){
                    console.log('brefor ', key);
                    const res = func.apply(this, args);
                    console.log('after ', key);
                    return res;
                }
            })
        }
    }
}
function readonly(target, key, descriptor){
    descriptor.writable = false;
}
function validate(target, key, descriptor){
    const func = descriptor.value;
    descriptor.value = function(...args){
        for (let num of args) {
            if(typeof num != 'number'){
                throw new Error(`${num} is not number`);
            }
        }
        return func.apply(this, args);
    }
}

@log
class Numberis{
    @readonly PI = 3.14;

    @validate
    sum(...args){
        return args.reduce((s, c)=> s + c, 0);
    }
}
//new Numberis().PI = 1000;

console.log(new Numberis().sum(23, 'xxx'));

