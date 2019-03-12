import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component{
  constructor(props) {
        super(props);
        this.state = { 
            quotes:[],
            selectedQuoteIndex:null,
            

         }
   this.selectQuoteIndex=this.selectQuoteIndex.bind(this)
   this.handleClick=this.handleClick.bind(this)
    }
    componentDidMount(){
       
        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
        .then(data=>data.json())
        .then(data=>
           this.setState({quotes:data.quotes},()=>{
               this.setState({
                   selectedQuoteIndex:this.selectQuoteIndex(),
                
                })
           })
            )
      }
      get selectedQuote(){
          if(!this.state.quotes.length || !Number.isInteger(this.state.selectedQuoteIndex)){
              return; 
          }return this.state.quotes[this.state.selectedQuoteIndex]
      }



    selectQuoteIndex(){
    if(!this.state.quotes){
        return;
    } 
    const num = this.state.quotes.length;
    const randomNum = Math.floor(Math.random()* num-1)
    return randomNum;
}


        handleClick(event){
            event.preventDefault()
            this.setState({
                selectedQuoteIndex:this.selectQuoteIndex()
             
             })
          }
      
  render(){
     const quote = this.selectedQuote ? this.selectedQuote.quote:"";
       const author = this.selectedQuote ? this.selectedQuote.author:"";
    return(
    <React.Fragment>
      <div className="text-center">
      <p id="header">Random Quote Machine</p>
      </div>
      
     <div id="quote-box" className="bg-light col-md-12">
             <div id="quotes">
      <p id="text" className="p-3 text-primary mb-0 pb-0">
                    {quote}
             </p>
      <p id= "author" className="font-italic text-danger"> {author} </p>
      
      </div>
      <div className="">
         <button 
className="btn btn-dark ml-5"
      onClick={this.handleClick}
      id="new-quote">new quote</button>
      <a 

id="tweet-quote" target="_blank"
       href={`https://twitter.com/intent/tweet?text=${`${quote} - ${author}`}&hashtags=shahriar`}>
      <span><i className="fab fa-twitter "></i></span>
      </a> 
        </div>
     
      
      </div>
<div className="text-center pt-3 text-primary">
        <p> by Shahriar</p>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
