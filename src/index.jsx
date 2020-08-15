import React from 'react';
import ReactDOM from 'react-dom';
import { action, computed, observable, toJS, spy, trace, observe } from 'mobx';
import { observer } from 'mobx-react';

// spy((event)=> {
//     console.log(event);
// })
class Todo {
    id = Date.now();
    @observable title = '';
    @observable finished = false;
    constructor(title){
        this.title = title;
    }
    @action.bound
    toggle(){
        this.finished = !this.finished;
    }
}
class Store{
    @observable todos = [];
    
    @action.bound
    createTodo(title){
        const todo = new Todo(title);
        this.todos.unshift(todo);
        //console.log(toJS(this.todos));
    }
    @action.bound
    removeTodo(todo){
        this.todos.remove(todo);
    }
    @computed get left(){
        return this.todos.filter(t => !t.finished).length;
    }
}
const store = new Store();


/////////////////////////////////////////////
@observer
class TodoItem extends React.Component{
    handleChange = (e)=> {
        this.props.todo.toggle();
    }
    render(){
        trace();
        const {id, title, finished} = this.props.todo;
        return <div>
            <input type="checkbox" checked={finished} onChange={this.handleChange} className="toggle"/>
            <span className="title">{title}</span>
        </div>
    }
}

@observer
class TodoView extends React.Component{
    handleRemove = (todo) => {
        this.props.store.removeTodo(todo);
    }
    render(){
        trace();
        const {todos} = this.props.store;
        return(
            <ul className="todos">
                {
                    todos.map((todo) => {
                        return <li className={["todos-item", todo.finished && 'finished'].join(' ')} key={todo.id}>
                            <TodoItem todo={todo} />
                            <button onClick={() => this.handleRemove(todo)} className="btn">X</button>
                        </li>
                    })
                }
            </ul>
        )
    }
}

@observer
class TodoFooter extends React.Component{
    render(){
        trace();
        const {left} = this.props.store
        return(
            <footer className='footer'>
                {left} 个条目没有完成
            </footer>
        )
    }
}

@observer
class TodoHeader extends React.Component {
    state = {
        inputValue: '',
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const value = this.state.inputValue;
        this.props.store.createTodo(value);
        this.setState({ inputValue: '' });
    }
    handleChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }
    render() {
        trace();
        return (
            <header>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        className="input"
                        placeholder="请输入"
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        )
    }
}

@observer
class TodoList extends React.Component{
   
    render(){
        trace();
        const store = this.props.store;
        return(
            <div>
                <TodoHeader store={store}/>
                <TodoView store={store}/>
                <TodoFooter store={store}/>
            </div>
        )
    }
}

ReactDOM.render(<TodoList store={store}/>, document.querySelector('#root'));


