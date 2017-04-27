import React, {Component} from 'react';
import Hello from 'components/Hello';
import { addTodo as addTodoAction } from 'redux/reducers/todos';
import { connect } from 'react-redux';
import 'isomorphic-fetch';

const fetchData = (url) => (dispatch) => {
    console.log('hiiiiii');
  dispatch({ type: 'FETCH_REQUEST' });
 
  return fetch(url).then(
    (result) => {
        console.log('Dispatching now');
        dispatch({
                        type: 'ADD_TODO',
                        text: 'sddsds',
                        id: 1
                })
    },
    (error) => dispatch({ type: 'FETCH_FAILURE', error })
  );
};

class Home extends Component {

    componentWillMount() {
        const { addTodoAction } = this.props;
        console.log('InComponentWillMount')
        addTodoAction('hpppppp');
    }

    shouldComponentUpdate(){
        return true;
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
            dispatch(fetchData('https://jsonplaceholder.typicode.com/posts/1'))
        }
    })
)(Home);