import React,{Component} from 'react';

import './App.css';
import axios from "axios";
import Car from './Cars/Cars';
import Sort from './Sort/Sort';




class App extends Component{

  state={
    cars:[],
    sortOptionSelected:0,
    loaded:0,
    pageNumber:1,
    maxPerPage:10,
    sortOptions:[]
  }

  componentDidMount(){
      axios.get('http://localhost:3000/api/v1/cars')
      .then(response=>{
        this.setState({cars:response.data.results,loaded:1})
      })
  }

  showModel=()=>{
    this.setState({showModel:1})
  }

  render(){
    let cars=null;
    cars=
          this.state.cars.map(car=>{
            return (
              <Car key={car._id} car={car} ></Car>
            )
          })
    const getKeys=()=>{
      return Object.keys(this.state.cars[0]);
    }

    let headings=null;
    if(this.state.loaded===1){
      const keys=getKeys();                     
      headings=keys.map(head=>{
        return (
          <th>{head}</th>
        )
      });
      
    }
    return (
      <div className="App">
      <div className="App-header">
      <h3>Car Details</h3>  
      </div>
          <tr>
            <td>
            <Sort sort={this.sortHandler}></Sort> 
            </td>
        
            <td>
            <label className="Sort-title">Max Per Page</label>
              <input type='text' value={this.state.maxPerPage} onChange={(e)=>this.maxPageChanged(e)} ></input>
            </td>
          </tr>
          
          <div className='Tabe-container'>
          <table >
          <thead>
          <tr>
            {headings}
          </tr>
          </thead>
          <tbody>
            {cars}
          </tbody>
        </table>
          </div>
      </div>
    );
  }

  maxPageChanged=(e)=>{
    this.setState({maxPerPage:e.target.value});
    let url='http://localhost:3000/api/v1/cars/sort-by?'
    setTimeout(()=>{
      this.getData(url+`&limit=${this.state.maxPerPage}`)
    },3000)
  }

  sortHandler=(e)=>{
    let url;
    if(e.target.checked){
      this.setState({sortOptions:[...this.state.sortOptions,e.target.value],sortOptionSelected:1},()=>{
        url=this.urlMaker(this.state.sortOptions);
       this.getData(url)
      });

    }else{
      let newState=[...this.state.sortOptions];
      newState.splice(this.state.sortOptions.indexOf(e.target.value),1);
      this.setState({sortOptions:newState,sortOptionSelected:newState.length>0?1:0},()=>{
        url=this.urlMaker(this.state.sortOptions);
       this.getData(url);
      })
    }
  }

  getData=(url)=>{
    axios.get(url)
    .then((response)=>{
      this.setState({cars:response.data.results});
    })
  }



  urlMaker=(sortOptions)=>{
    let url='http://localhost:3000/api/v1/cars/sort-by?';
    for(let i=0;i<this.state.sortOptions.length;i++){
      console.log(sortOptions[i])
      url=url+`k${i+1}=${sortOptions[i]}&`
    }
    return url+`limit=${this.state.maxPerPage}`
  }
}


export default App;
