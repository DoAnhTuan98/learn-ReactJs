import React , { Component } from 'react';
import TaskItem from "./TaskItem"

class TaskList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        filterName : '',
        filterStatus: -1
      }
    }
    onHandleChange = (event) => {
      var target = event.target;
      var name = target.name;
      var value = target.value;
      this.props.onFilter(
        name === 'filterName' ? value : this.state.filterName,
        name === 'filterStatus' ? value : this.state.filterStatus
      ) 
      this.setState({
        [name] : value
      })
    }
  
    render () {
      var { filterName , filterStatus } = this.state;
      var { tasks } = this.props;
      var elmTasks = tasks.map((task,index) => {
        return <TaskItem 
          key={task.id} 
          index={index} 
          task={task} 
          onUpdateStatus={this.props.onUpdateStatus} 
          removeItem={this.props.removeItem} 
          onToggleForm={this.props.onToggleForm}
          onUpdateItem={this.props.onUpdateItem}
        />
      });  
      return (
          <div className="TaskList">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Trạng Thái</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row"></td>
                    <td>
                      <input type="text" className="form-control" name="filterName" value={filterName} onChange={this.onHandleChange}></input>
                    </td>
                    <td>
                      <div className="form-group">
                        <select className="form-control" name="filterStatus" value={filterStatus} onChange={this.onHandleChange}>
                          <option value={-1}>Tất cả</option>
                          <option value={0}>Ẩn</option>
                          <option value={1}>Kích hoạt</option>
                        </select>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  {elmTasks}
                </tbody>
              </table>
          </div>
      );
    }
}
export default TaskList;