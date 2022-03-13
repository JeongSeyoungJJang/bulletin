import React from "react";

const TableColumn = ({children, id}) => {

    // const onClick= (e) => {
    //     e.preventDefault();
    //     debugger
    //     console.log(e.currentTarget.innerText);
    // }

    return (
        <td className="component-table-column" id={id}>
            {
                children
            }    
        </td>
    )
}

export default TableColumn;