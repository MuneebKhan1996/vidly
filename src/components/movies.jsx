import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./listGroup";
import MoviesTable from "./moviesTable";
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { sort: 'Title', order: 'asc'}
    }

    componentDidMount(){
        const genres = [{_id:"", name: "All Genres" }, ...getGenres()]
        this.setState( { movies: getMovies(), genres, selectedGenre: genres[0] });
    }
    
    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies})
    }
    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }
    handlePageChange = page => {
        this.setState ({ currentPage: page});
    }
    handleItemSelect = genre => {
        console.log(genre);
        this.setState ({ selectedGenre: genre, currentPage: 1});
    }
    handleSort = sortColumn => {
        this.setState({ sortColumn });
    }
    getPageData = () => {
        const { pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies } = this.state;
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter( m => m.genre._id === selectedGenre._id) : allMovies;
        const { length: countOfMovies } = filtered;
        const orderedMovies = _.orderBy(filtered, [sortColumn.sort], [sortColumn.order]);
        const movies = paginate(orderedMovies, currentPage, pageSize); 

        return { countOfMovies, movies };
    }
    
    render() { 
        const { pageSize, currentPage, sortColumn } = this.state;
        const { length: count } = this.state.movies;

        if(count === 0) return <p>All sold out</p>

        const { countOfMovies, movies } = this.getPageData();
        return ( 
            <React.Fragment>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-2">
                            <ListGroup 
                                items={this.state.genres} 
                                onItemSelect={this.handleItemSelect}
                                selectedGenre ={this.state.selectedGenre}
                                textProperty="name"
                                valueProperty="_id"
                            />
                        </div>
                        <div className="col-md-10">
                            <p>Total Movies: {countOfMovies}</p>
                            <MoviesTable 
                                movies={movies}
                                sortColumn={sortColumn}
                                onLike={this.handleLike}
                                onDelete={this.handleDelete}
                                onSort={this.handleSort}
                            />
                        <Pagination 
                            itemsCount={ countOfMovies } 
                            pageSize={pageSize} 
                            onPageChange={this.handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Movies;