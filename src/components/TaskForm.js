import React , { Component } from 'react';
 
class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            id: '',
            name: '',
            status: false
        }
    }

    componentWillMount() {
        if(this.props.taskEditing){
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.taskEditing) {
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status
            })
        }else if (!nextProps.taskEditing) {
            this.setState({
                id: '',
                name: '',
                status: false           
            })
            // console.log('sua -> them')
        }
    }


    onCloseForm = () => {
        this.props.onCloseForm()
    }

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === "status") {
            value = "true" ? true : false;
        }
        this.setState({
            [name] : value 
        })
        
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }
    render(){
        var { id } = this.state;
        return (
            <div className="card">
                <div className="text-center">
                    <h5>
                        { id !== '' ? 'Cập nhập công việc' : 'Thêm công việc' }
                        {/* <span><i className="far fa-times-circle"><button className="btn btn-danger"></button></i></span> */}
                        <button className="far fa-times-circle" onClick={ this.onCloseForm }></button>
                    </h5>
                </div>
                <form onSubmit={this.onSubmit}>
                <div className="card-body">
                    <div className="form-group">
                        <label>Tên:</label>
                        <input type="text" className="form-control" aria-describedby="helpId" name="name" 
                            onChange={this.onHandleChange} 
                            value={this.state.name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái:</label>
                        <select className="form-control" name="status" onChange={this.onHandleChange} value={this.state.status}>
                            <option value={true}>Kích hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br></br>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Lưu lại</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>Huỷ Bỏ</button>
                        </div>
                    </div>
                </div>
                </form>
                
            </div>
        );
    }
}

export default TaskForm;
