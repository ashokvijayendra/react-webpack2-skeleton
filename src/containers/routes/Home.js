import React, {Component} from 'react';
import Hello from 'components/Hello';
import { addTodo as addTodoAction } from 'redux/reducers/todos';
import { connect } from 'react-redux';

class Home extends Component {

    componentWillMount() {
        const { addTodoAction } = this.props;
        console.log('InComponentWillMount')
        addTodoAction('hpppppp');
    }

    render() {
        const { status } = this.props;
        console.log('state',status);
        return (
            <div>
                <Hello name="home"/>
            </div> 
        )
    }
}

export default connect(
    state => ({
        status: {
            sample: state
        }
    }),
    dispatch => ({
        addTodoAction: (text) => {
            dispatch(addTodoAction('https://jsonplaceholder.typicode.com/posts/1'))
        }
    })
)(Home);