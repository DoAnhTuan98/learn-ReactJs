import React,{Component} from 'react';
import './App.css';
import TaskForm from "./components/TaskForm"
import Control from "./components/control"
import TaskList from "./components/TaskList"
import { connect } from 'react-redux';
import * as actions from './actions/index'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  onToggleForm = () => {
    var { taskEditing } = this.props;
    if(taskEditing && taskEditing.id !== '') { // sua task
      this.props.onOpenForm();
    }else { // add task
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id: '',
      name : '',
      status : false
    })
  }

  render(){
    var { isDisplayForm } = this.props;
    
    return (
      <div className="container">
        <div className="text-center">
          <h1>quản lý công việc</h1>
          <hr></hr>
        </div>
        <div className="row">
          <div className={ isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4": "" }>
            <TaskForm />  
          </div> 
          <div className={ isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={ this.onToggleForm }>
              Thêm công việc
            </button>
            <Control onSearch={this.onSearch}/>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList // tasks={ tasks }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      isDisplayForm : state.isDisplayForm,
      taskEditing : state.editTask
  };
}

const mapDispatchToProps = (dispatch,props) => {
  return {
    onToggleForm : () => {
      dispatch(actions.toggleForm())
    },
    onClearTask : (task) => {
      dispatch(actions.onEditTask(task))
    },
    onOpenForm : () => {
      dispatch(actions.openForm());
    } 
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
