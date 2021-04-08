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
  
  // make fetch request here?
    // requesting to back end, not the API
    // API fetch logic happens at backend
    // prop drill response into to search results
    performSearch(string){
      this.setState({loading: true, showSnippet: false,
      books: []});

      let tempArray = string.split(' ').filter(el => el !== '');
      let updatedString = tempArray.join('+')
      const sendObj = {"updatedString":updatedString}
      // console.log('updatedString: ', updatedString)
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
        console.log('Data received from backend: ', data[0])
        let updatedState = this.state;
        let bookArray = [];
        data.forEach(element => {
          let bookInfo = {
            // title: element.volumeInfo.title,       
            title: element.title,       
            selfLink: element.selfLink,     
            // author: element.volumeInfo.authors[0],            
            author: element.author,            
          }
          bookArray.push(bookInfo)
        })
        updatedState.loading = false;
        updatedState.books = bookArray
        console.log('updated state',updatedState)
        this.setState({updatedState})

      })

      .catch(err => console.log(err))
      }

  // Selected Button
  selectButton() {

    this.setState({showSnippet: true})


    // fetch('/search', requestBody) 
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({showSnippet: true})
    //   })
    //   .catch(err => console.log(err))
  }
  
  render(){
    //container array 
    //made a for loop for each thing i got from my fetch
    // <SearchResults booktite=data.title/>
    //render container array in the return statement
    const rowsArray = [];
    for (let i = 0; i < this.state.books.length; i++){
      rowsArray.push(<SearchResults selectButton = {() => this.selectButton()} timeout = {i+1} books={this.state.books[i]}/>)
    }

      return(
        
        <div className='searchcontainer'>
          <SearchBar onEnter={this.performSearch} />

          {/* Loading Bar */}
          {this.state.loading?(
            <div style = {{height: 100, justifyContent: 'center', marginTop: '25%'}}>
              <LinearProgress />
            </div>

          ):<div />}
          
        
          {/* Results and codesnippet */}
          {this.state.books.length > 0?
            <div style = {{marginTop: '1em', display: 'flex', flexDirection: 'row'}}> 
              {/*Results  */}
              <div style = {{display: 'flex', flex: 1, flexDirection: 'column'}}>
              <strong style = {{alignSelf: 'center'}} >Search Results: </strong> 
                {rowsArray}
            </div>
          {/* Code Snippet */}
            <Fade in = {this.state.showSnippet} timeout = {1000} >
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

// jsonobject.items[0]
// API: "Google"
// title: "why Read Moby-Dick?"
// author: [Nathaniel Philbrick]
// industryIdentifier[0]["identifier"] : "9780143123972"

export default SearchContainer

// performSearch(searchTerm ){
//   const urlString = 'https://api.themoviedb.org/3/search/movie?api_key=e30af747df7905a923cedbcf8b405f72&query=' + searchTerm
//   const getlist = fetch(urlString)
//   .then(response => {
//       return response.json()
//   }).then(data => {
//       const results = data.results
//       const movieRows = [];
//       results.forEach((movie) => {
//           movie.poster_src = "https://image.tmdb.org/t/p/w200/" + movie.poster_path
//           const movies = <MovieRow stars={this.state.stars} key={movie.id} movie={movie}/>
//           if(movie.poster_path !== null){
//           movieRows.push(movies)
//           }
//           this.setState({rows: movieRows})
//       })
//   })
//   .catch(err => {
//       console.log('Not a movie', err)
//   })

// setRating(event){
//   const rating = event.target.value
//   this.setState({stars: rating})
//   const postMovieData = {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({title: this.props.movie.title, rating: rating})
//   };
//   fetch('http://localhost:3000', postMovieData)
// }