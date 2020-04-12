import React , { Component } from 'react';
import * as actions from './../actions/index';
import { connect } from 'react-redux';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    removeItem = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm()
    }
    
    updateItem = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task); 
    }
    render () {
        var { task , index } = this.props;
        return (
            <tr>
                <td>{index}</td>
                <td>{task.name}</td>
                <td className="text-center">
                <span onClick={this.onUpdateStatus}>{task.status === true ? 'Kích hoạt' : 'Ẩn' }</span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.updateItem}>Sửa</button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.removeItem}>Xóa</button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    };
  }
  
  const mapDispatchToProps = (dispatch,props) => {
    return {
        onUpdateStatus : (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask : (id) => {
            dispatch(actions.onDeleteTask(id));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        },
        onEditTask : (task) => {
            dispatch(actions.onEditTask(task));
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        }
    };
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);
  