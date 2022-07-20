import React, { Component } from 'react'
import { movies } from './getmovies'

export default class Favorites extends Component {

    constructor(){
        super();
        this.state={
            genres: [],
            currgen: 'All Genres',
            movies: [],
            currtext: '',
            limit: 5,
            curpage: 1
        }
    }
    handlegenrechange=(genre)=>{
        this.setState({
            currgen: genre
        })
    }

    sortPopularityDesc=()=>{
        let tmp=this.state.movies;
        tmp.sort(function(a,b){
            return b.popularity-a.popularity;
        })
        this.setState({
            movies: [...tmp]
        })
    }

    sortPopularityAsc=()=>{
        let tmp=this.state.movies;
        tmp.sort(function(a,b){
            return a.popularity-b.popularity;
        })
        this.setState({
            movies: [...tmp]
        })
    }

    sortRatingDesc=()=>{
        let tmp=this.state.movies;
        tmp.sort(function(a,b){
            return b.vote_average-a.vote_average;
        })
        this.setState({
            movies: [...tmp]
        })
    }

    sortRatingAsc=()=>{
        let tmp=this.state.movies;
        tmp.sort(function(a,b){
            return a.vote_average-b.vote_average;
        })
        this.setState({
            movies: [...tmp]
        })
    }

    handlepagechange=(page)=>{
        this.setState({
            curpage: page
        })
    }

    handledelete=(obj)=>{
        let tmp=this.state.movies.filter(mov=>mov.id!=obj.id);
        this.setState({
            movies: [...tmp]
        })
        localStorage.setItem('movies-app',JSON.stringify(tmp));
    }
    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let data=JSON.parse(localStorage.getItem('movies-app') || '[]');
        let tmp=[]
        data.forEach(movieobj=> {
            if(!tmp.includes(genreids[movieobj.genre_ids[0]])){
                tmp.push(genreids[movieobj.genre_ids[0]]);
            }
        });
        tmp.unshift('All Genres');
        this.setState({
            genres: [...tmp],
            movies: [...data]
        })

    }
    render() {
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        
        let filterarr=[];

        if(this.state.currgen!="All Genres"){
            filterarr=this.state.movies.filter((obj)=>genreids[obj.genre_ids[0]]==this.state.currgen);
        }
        else{
            filterarr=this.state.movies;
        }

        if(this.state.currtext!=''){
            let tmp=filterarr.filter((obj)=>{
                let title=obj.original_title.toLowerCase();
                return title.includes(this.state.currtext.toLowerCase());
            })
            filterarr=tmp;
        }
        
        let pages=Math.ceil(filterarr.length/this.state.limit);
        let pagesarr=[];
        for(let i=1;i<=pages;i++){
            pagesarr.push(i);
        }
        let si=(this.state.curpage-1)*(this.state.limit);
        let ei=si+(this.state.limit);
        // console.log(filterarr.length,si,ei);
        filterarr=filterarr.slice(si,ei);

        return (
            <div>
                <>
                    <div className='main' style={{marginTop: "2rem"}}>
                        <div className='row'>
                            <div className='col-lg-3 col-sm-12'>
                                <ul class="list-group">
                                    {
                                        this.state.genres.map(genre=>(
                                            this.state.currgen==genre ? 
                                            <li class="list-group-item" style={{background:'#3f51b5',color:'white',fontWeight:'bold'}}>{genre}</li> :
                                            <li class="list-group-item" style={{background:'white',color:'#3f51b5'}} onClick={()=>this.handlegenrechange(genre)}>{genre}</li>
                                        ))
                                    }
                                    
                                </ul>
                            </div>
                            <div className='col-lg-9 favourites-table col-sm-12' >
                                <div className='row'>
                                    <input type='text' className='input-group-text col' placeholder='Search'  value={this.state.currtext} onChange={(e)=>this.setState({currtext: e.target.value})}/>
                                    <input type='number' className='input-group-text col' placeholder='Rows Count' value={this.state.limit} onChange={(e)=>this.setState({limit: parseInt(e.target.value)==0 ? 1 : parseInt(e.target.value)})}/>
                                </div>

                                <div className='row'>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col"><i class="fas fa-sort-up" onClick={this.sortPopularityDesc}/>Popularity<i class="fas fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                                                <th scope="col"><i class="fas fa-sort-up" onClick={this.sortRatingDesc}/>Rating<i class="fas fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filterarr.map((movieobj)=>(
                                                    <tr>
                                                        <td><img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`}   alt={movieobj.title} style={{width:'5rem'}}/> {movieobj.title}</td>
                                                        <td>{genreids[movieobj.genre_ids[0]]}</td>
                                                        <td>{movieobj.popularity}</td>
                                                        <td>{movieobj.vote_average}</td>
                                                        <td><button type="button" class="btn btn-danger" onClick={()=>this.handledelete(movieobj)}>Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        {
                                            pagesarr.map(page=>(
                                                <li class="page-item"><a class="page-link" onClick={()=>this.handlepagechange(page)}>{page}</a></li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}
