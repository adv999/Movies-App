import React, { Component } from 'react'
import {movies} from './getmovies'
import axios from 'axios';
import {Link} from 'react-router-dom'

export default class Movies extends Component {
    
    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            curpage:1,
            movies:[],
            favourties: []
        }
    }

    changeMovies=async()=>{
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=6c27793831460b270c8ee19919ed24c4&language=en-US&page=${this.state.curpage}`)
        let data=res.data;
        this.setState({
            movies:[...data.results]
        })
    }

    handleRight=()=>{
        let tmparr=[];
        for(let i=1;i<=this.state.parr.length+1;i++){
            tmparr.push(i);
        }
        this.setState({
            parr:[...tmparr],
            curpage:this.state.curpage+1
        },this.changeMovies)
    }

    handleLeft=()=>{
        
        this.setState({
            curpage:this.state.curpage!=1 ? this.state.curpage-1 : 1
        },this.changeMovies);
    }

    handleClick=(value)=>{
        if(value!=this.state.curpage){
            this.setState({
                curpage: value
            },this.changeMovies);
        }
    }

    handlefavourites=(movie)=>{
        // console.log("hellp");
        let olddata=JSON.parse(localStorage.getItem('movies-app') || "[]")
        if(this.state.favourties.includes(movie.id)){
            olddata=olddata.filter((m)=>m.id!=movie.id);
        }
        else{
            olddata.push(movie);
        }
        localStorage.setItem('movies-app',JSON.stringify(olddata));
        
        this.handlefavouritesstate();
        // console.log(olddata);
    }

    handlefavouritesstate=()=>{
        let olddata=JSON.parse(localStorage.getItem('movies-app') || "[]");
        let tmp=olddata.map((movie)=>movie.id);
        this.setState({
            favourties:[...tmp]
        })
    }

    async componentDidMount(){
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=6c27793831460b270c8ee19919ed24c4&language=en-US&page=${this.state.curpage}`)
        let data=res.data;
        this.setState({
            movies:[...data.results]
        })
        //console.log('mounting done');
    }
    render() {
    // let movie=movies.results
    //console.log('render');
    return ( 
          <>
            {
                this.state.movies.length==0 ? 
                <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                :
                <div>
                    <h3 className="text-center"><strong>Trending</strong></h3>
                    <div className="movies-list">
                        {
                            this.state.movies.map((movieobj)=>(
                                <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieobj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                                <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`}   alt={this.state.movies.title} className="card-img-top movies-img" />
                                {/* <div className="card-body"> */}
                                    <h5 className="card-title movies-title">{movieobj.original_title}</h5>
                                    {/* <p class="card-text movies-text">{movieobj.overview}</p> */}
                                    <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                                        {
                                            this.state.hover == movieobj.id &&
                                            <Link to="/" className="btn btn-primary movies-button" onClick={()=>this.handlefavourites(movieobj)}>{this.state.favourties.includes(movieobj.id) ? "Remove from Favourites" : "Add to Favourites"}</Link>
                                        }
                                    </div>
                                {/* </div> */}
                                </div>
                            ))
                        }
                    </div>

                    <div style={{display:'flex',justifyContent:'center'}}>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                            {
                                this.state.parr.map((value)=>(
                                    <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                                ))
                            }
                            <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                        </ul>
                        </nav>
                    </div>
                    </div>
            }
        </>
    )
  }
}
