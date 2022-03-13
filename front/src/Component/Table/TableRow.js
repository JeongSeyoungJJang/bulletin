import React from 'react';

const TableRow = (props) => {
    return (
        
        <tr className='component-table-row' id={`component-table-row-${props.id}`} onClick={props.onClick}>
            {
                props.children
            }    
        </tr>
    )
};

export default TableRow;