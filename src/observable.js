import { observable, isArrayLike,isObservableObject, extendObservable} from 'mobx';
/**
  array objact map set prop
 */
const arr = observable([1,2,3]);
console.log(arr, isArrayLike(arr), Array.isArray(arr), arr[2]);

const obj = observable({a: 'a'});
obj.b = 'bbb';
//extendObservable();
console.log(obj, isObservableObject(obj.b));

const map = observable(new Map());

map.set('a', 1);

console.log(map, map.get('a'));

/**
 *  observable.box
 */

 const num = observable.box(1);
 const str = observable.box('aaa');
 const bool = observable.box(true);
 console.log(num, str, bool)
 num.set(20);
 str.set(333);
 bool.set(false)
 console.log(num.get(), str, bool.get())