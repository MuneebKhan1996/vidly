import React from 'react';
import TableBody from './tableBody';
import TableHeaders from './tableHeaders';

const Table = ({ columns, sortColumn, onSort, data }) => {

    return ( 
        <table className="table">
                <TableHeaders columns={columns} sortColumn={sortColumn} onSort={onSort} />
                <TableBody data={data} columns={columns} />
        </table>
    );
}
 
export default Table;