import React , { Component } from 'react';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id)
    }

    removeItem = () => {
        this.props.removeItem(this.props.task.id);
    }
    
    updateItem = () => {
        this.props.onUpdateItem(this.props.task.id); 
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

export default TaskItem;