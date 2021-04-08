import React from 'react';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Grow';

class SearchResults extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
        console.log("props", this.props)

        return(
            <Fade style = {{display: 'flex', flex: 1, flexDirection: 'column' }} in = {true} timeout = {this.props.timeout*1000} >
                <div>         
                    <button className = {'resultButton'} onClick = {this.props.selectButton}>
                        <div style = {{color: 'white'}}><strong>Book Title: </strong>{this.props.books.title}</div>
                        <div style = {{color: 'white'}}><strong>Author: </strong>{this.props.books.author}</div>
                        <div style = {{wordWrap: 'break-word', color: 'white'}}><strong>API: </strong>{this.props.books.selfLink}</div>
                    </button>
                </div>
            </Fade>    
        )
    }
}

export default SearchResults

