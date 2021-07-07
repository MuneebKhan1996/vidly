import React from 'react';

const ListGroup = (props) => {
    const { items: genres, textProperty, valueProperty, selectedGenre, onItemSelect } = props;

    return (
        <ul className="list-group">
            { genres.map( genre => (
                <li 
                    onClick={() => onItemSelect(genre)}
                    key={genre[valueProperty]} 
                    className={ genre === selectedGenre ? "list-group-item active" : "list-group-item" } >
                        {genre[textProperty]}
                </li>
            ))}
        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}
 
export default ListGroup;