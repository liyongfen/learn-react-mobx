import { observable, computed, autorun, when, reaction, action, runInAction } from 'mobx';

class Store {
    @observable array = [1,2,3];
    @observable object = {a: 'aaa'};
    @observable map = new Map();

    @observable num = 122;
    @observable str = 'aaaa';
    @observable bool = false;

    @computed get mixed(){
        return store.str + '/' + store.num;
    }
    @action 
    bar(){
        this.num = 4343;
        this.str = 'bbbb';
    }
    @action.bound
    foo(){
        this.num = 4343;
        this.str = 'bbbb';
    }

}

//computed 将多个可观察数据组合成一个可观察数据
const  store = new Store();
// const foo = computed(function(){
//     return store.str + '/' + store.num;
// });
// foo.observe(function(change){
//     console.log(change);
// });



//autorun  先行执行一次 能够自动追踪到其可观察数据，并在数据变更后自动触发
// autorun(function(){ 
//     console.log(store.mixed);
// })
// store.str = 'dewdw';

//when  第一个参数必须根据可观察数据返回boolean值  先行执行一次 
//添加条件执行逻辑算是autorun的一个变种
// when(()=> {
//     return store.bool;
// }, ()=> {
//     console.log('this is true');
// })

// store.bool = true;


//reaction 应用场景：在没有数据之前不想，也没有必要调用写缓存的逻辑。
//分离可观察声明和副作用的方式，对autorun做出改进
reaction(()=> [store.num, store.str], (arr)=> {
    console.log(arr);
})
// store.num = 4343;
// store.str = 'bbbb';


//action
//store.bar();

// var foo = store.foo;
// foo();

runInAction('modify', ()=>{
    store.num = 4343;
    store.str = 'bbbb';
})








