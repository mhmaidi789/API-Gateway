import React from 'react'
import SearchBar from '../Components/SearchBar.jsx'
import SearchResults from '../Components/SearchResults.jsx'
import Fade from '@material-ui/core/Grow';
import LinearProgress from '@material-ui/core/LinearProgress';

class SearchContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      books: [],
      searchResults: null,
      codeSnippetObj : {
        key: 'Example Object',
        apiKey: `Google's API`
      },
      showSnippet: false,
      loading: false,
    }

    this.performSearch = this.performSearch.bind(this)
  }
  
    performSearch(string){
      this.setState({loading: true, showSnippet: false,
      books: []});

      let tempArray = string.split(' ').filter(el => el !== '');
      let updatedString = tempArray.join('+')
      const sendObj = {"updatedString":updatedString}
      let requestBody = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendObj)
      };
  
      fetch('/search', requestBody) 
      .then(response => response.json())
      .then(data => {
        console.log('Data received from backend: ', data)
        this.setState({
          books : data,
          loading: false,
        })
      })

      .catch(err => console.log(err))
      }

  // Selected Button
  selectButton(id) {
    console.log(id)
    this.setState({
      codeSnippetObj: this.state.books[id].apiData,
      showSnippet: true})

  }
  
  render(){
    //container array 
    //made a for loop for each thing i got from my fetch
    // <SearchResults booktite=data.title/>
    //render container array in the return statement
    const rowsArray = [];
    for (let i = 0; i < this.state.books.length; i++){
      rowsArray.push(<SearchResults key = {i} selectButton = {(e) => this.selectButton(e)} timeout = {i+1} books={this.state.books[i].formattedData}/>)
    }

      return(
        
        <div style  className='searchcontainer'>
          <SearchBar onEnter={this.performSearch} />

          {/* Loading Bar */}
          {this.state.loading?(
            <div style = {{height: 100, justifyContent: 'center', marginTop: '25%'}}>
              <LinearProgress />
            </div>

          ):<div />}
          
          {/* Results and codesnippet */}
          {this.state.books.length > 0?
            <div style = {{marginTop: '1em', display: 'flex', flexDirection: 'row',}}> 
              {/*Results  */}
              <div style = {{display: 'flex', flex: 1, flexDirection: 'column'}}>
                <strong style = {{alignSelf: 'center'}} >Search Results: </strong> 
                {rowsArray}
              </div>
          {/* Code Snippet */}
            <Fade style ={{display: 'flex', flex: 1}} in = {this.state.showSnippet} timeout = {1000} >
              <div style = {{display: 'flex', flex: 1, flexDirection: 'column'}}>
                    <strong style = {{alignSelf: 'center'}}>API Returned Object: </strong> 
                    <pre className ='codeSnippet'>
                      <code>
                        <br />
                        {JSON.stringify(this.state.codeSnippetObj, null, 2)}
                      </code>
                    </pre>
              </div>
            </Fade>
          </div>
          :<div />
          }
          
        </div>
      )
  }
}

export default SearchContainer