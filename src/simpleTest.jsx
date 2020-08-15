import React from 'react';
import ReactDOM from 'react-dom';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

class Store {
    @observable catch = {queue: []};
    @action.bound
    refresh(){
        this.catch.queue.push(1);
    }
}
const store = new Store();

@observer
class Bar extends React.PureComponent{
    render(){
        const queue = this.props.queue;
        return <div>{queue.length}</div>
    }
}


class Foo extends React.PureComponent{
    render(){
        console.log('Foo');
        return <div>
            <button onClick={this.props.refresh}>按钮</button>
            <Bar queue={this.props.catch.queue}/>
        </div>
    }
}

ReactDOM.render(<Foo catch={store.catch} refresh={store.refresh}/>, document.querySelector('#root'));