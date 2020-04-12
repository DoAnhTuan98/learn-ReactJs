import React , { Component } from 'react';
import TaskItem from "./TaskItem"
import { connect } from 'react-redux';
import * as actions from './../actions/index'

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
      var filter = {
        name : name === 'filterName' ? value : this.state.filterName,
        status : name === 'filterStatus' ? value : this.state.filterStatus
      }
      this.props.onFilterTable(filter); 
      this.setState({
        [name] : value
      })
    }
  
    render () {
      // console.log(this.props.todos);
      var { filterName , filterStatus } = this.state;
      var { tasks,filterTable,search } = this.props;

      // filter task
      if(filterTable.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
        })
      }
      
      tasks = tasks.filter((task) => {
        if(filterTable.status === -1 ) {
          return task
        }
        else {
          return task.status === (filterTable.status === 1 ? true : false);
        }
      })

      if(search) { // tìm kiếm 
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
        });
      }
      
      var elmTasks = tasks.map((task,index) => {
        return <TaskItem 
          key={task.id} 
          index={index} 
          task={task} 
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
                    <td></td>
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

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filterTable : state.filterTable,
    search : state.search
  }
}

const mapDispatchToProps = (dispatch,props) => {
  return {
    onFilterTable : (filter) => {
      dispatch(actions.filterTask(filter));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskList);