import React, {Component} from 'react';
import Hello from 'components/Hello';
import { addTodo as addTodoAction } from 'redux/reducers/todos';
import { connect } from 'react-redux';


class Home extends Component {

    componentWillMount() {
        const { addTodoAction } = this.props;
        addTodoAction({
            text: 'hellowhatisthis'
        });
    }
    
    render() {
        const { status } = this.props;

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
            sample: state.sample
        }
    }),
    dispatch => ({
        addTodoAction
    })
)(Home);