import React, { Component } from 'react';
import Search from './Search'
import Sort from './Sort'


class Control extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row mt-15">
                <Search onSearch={this.props.onSearch}/>
                <Sort />
            </div>
        );
    }
}

export default Control;