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
                    <button onClick = {this.props.selectButton} style = {{padding: '1em', margin: '1em', borderStyle: 'solid', border: 2, backgroundColor: '#fffeed', boxShadow: '1px 1px 1px 1px', borderRadius: '0.5em'}}>
                        <div><strong>Book Title: </strong>{this.props.books.title}</div>
                        <div><strong>Author: </strong>{this.props.books.author}</div>
                        <div style = {{wordWrap: 'break-word'}}><strong>API: </strong>{this.props.books.selfLink}</div>
                    </button>
                </div>
            </Fade>    
        )
    }
}

export default SearchResults

