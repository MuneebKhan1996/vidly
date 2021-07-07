import React, { Component } from 'react';

class TableHeaders extends Component {
    raisedSort = sort => {
        const sortColumn = {...this.props.sortColumn};
        if(sortColumn.sort === sort) 
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else{
            sortColumn.sort = sort;
            sortColumn.order = 'asc'
        }
        this.props.onSort(sortColumn);
    }
    renderSortIcon = column => {
        const { sortColumn } = this.props;
        if(column.path !== this.props.sortColumn.sort) return null;
        if(this.props.sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>
        return <i className="fa fa-sort-desc"></i>
    }

    render() { 
        return ( 
            <thead>
                <tr>
                    { this.props.columns.map( column =>  
                        <th 
                            className="clickable"
                            key={column.path || column.key} 
                            onClick={() => this.raisedSort(column.path)} 
                        >
                            {column.label} {this.renderSortIcon(column)}
                        </th> 
                    )}
                </tr>
            </thead>
        );
    }
}
 
export default TableHeaders;