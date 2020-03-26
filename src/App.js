import React,{Component} from 'react';
import './App.css';
import TaskForm from "./components/TaskForm"
import Control from "./components/control"
import TaskList from "./components/TaskList"
import Randomstring from 'randomstring'
import { findIndex } from "lodash"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks : [],
      isDisplayForm : false,
      taskEditing: null,
      filter : {
        name : '',
        status: -1
      },
      keyword: ''
    }
  }

  componentWillMount() {
    if(localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }

  onToggleForm = () => {
    if( this.state.taskEditing) {
        this.setState({
          isDisplayForm: true,
          taskEditing: null
        })
    }else {
      this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        taskEditing: null
      })
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    })
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }

  onSubmit = (data) => {
    // console.log(data);
    var { tasks } = this.state;
    if(data.id === '') { // thêm công việc
      data.id = Randomstring.generate(16);// tasks
      tasks.push(data)
    }else {
      // sửa công việc
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    
    this.setState({
      tasks : tasks,
      taskEditing : null
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    // var index = this.findIndex(id);
    var index = findIndex(tasks,function(task) { return task.id === id;});
    if(index !== -1) {
      tasks[index].status = !tasks[index].status;
      console.log(tasks);
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
  }

  findIndex(id) {
    var { tasks } = this.state;
    var result = -1 ;
    tasks.forEach((task,index) => {
      if(task.id === id) {
        result = index;
      }
    });
    return result;
  }

  removeItem = (id) => {
    var { tasks } = this.state;
    // var index = this.findIndex(id);
    var index = findIndex(tasks,function(task) { return task.id === id;})
    tasks.splice(index,1);
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  onUpdateItem = (id) => {
    var { tasks } = this.state;
    // var index = this.findIndex(id);
    var index = findIndex(tasks,(task) => { return task.id === id ;})
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    })
    this.onShowForm();
  } 

  onFilter = (filterName,filterStatus) => {
    filterStatus = parseInt(filterStatus,10);
    this.setState({
      filter : {
        name : filterName.toLowerCase(),
        status : filterStatus
      }
    })
  }
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    })
  }
  render(){
    
    let { tasks,isDisplayForm,taskEditing,filter,keyword } = this.state;
    // var elmTaskForm = isDisplayForm ? <TaskForm/> : '';
    if(keyword) { // tìm kiếm 
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1
      })
      // tasks = _.filter(tasks, (task) => {
      //   return task.name.toLowerCase().indexOf(keyword.toLocaleLowerCase()) !== -1;
      // })
    }
    if(filter) { 
      if(filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task)  => {
        if(filter.status === -1) {
          return task;
        }else {
          // console.log(task.status);
          return task.status === (filter.status === 1 ? true : false);
        }
      })
      
    }
    return (
      <div className="container">
        <div className="text-center">
          <h1>quản lý công việc</h1>
          <hr></hr>
        </div>
        <div className="row">
          <div className={ isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4": "" }>
            {isDisplayForm && <TaskForm onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} taskEditing={taskEditing}/>}
            {isDisplayForm === false && ''}
          </div> 
          <div className={ isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={ this.onToggleForm }>
              Thêm công việc
            </button>
            <Control onSearch={this.onSearch}/>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList tasks={ tasks } 
                  onUpdateStatus={this.onUpdateStatus} 
                  removeItem={this.removeItem} 
                  onToggleForm={this.onToggleForm} 
                  onUpdateItem={this.onUpdateItem}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
