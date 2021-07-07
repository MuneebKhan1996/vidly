import React, { Component } from 'react';
import Like from './like';
import Table from './table';
import TableBody from './tableBody';
import TableHeaders from './tableHeaders';

class MoviesTable extends Component {

    columns = [
        {path: 'title', label: 'Title'},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        { 
            key: 'like', 
            content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)}/>
        },
        {
            key: 'delete', 
            content: movie => <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger">Remove</button>
        }
    ]
    
    render() { 
        const { movies, onLike, onDelete, sortColumn, onSort } = this.props;
        return ( 
            <Table columns={this.columns} data={movies} sortColumn={sortColumn} onSort={onSort} />
        );
    }
}

 
export default MoviesTable;