import React, { Component } from 'react'

class Search extends Component {
    state={
        text: ''
    } 

    onSubmit = e => {
        e.preventDefault();
        if(this.state.text === ""){
            this.props.setAlert('Please Enter Username', 'light');
        } else {
            this.props.searchUser(this.state.text);
            this.setState({text: ''});
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });
    

    render() { 
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input type="text" name="text" placeholder="Search User" value={this.state.text} onChange={this.onChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                    
                </form>
                {this.props.showClearBtn && <input type="button" value="Clear" className="btn btn-white btn-block" onClick={this.props.clearUsers} />}
                
            </div>
        )
    }
}

export default Search;
