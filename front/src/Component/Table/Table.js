import React from 'react';
import "./Table.css";

const Table = props => {
  const {headerName, children} = props;
  return (
    <table className='component-table'>
      <thead>
        <tr>
          {
            headerName.map((item, index) => {
              return (
                <td className='component-table-header-column' id={`component-table-header-column-${item}`} key={index}>{item}</td>
              )
            })
          }        
        </tr>    
      </thead>    
      <tbody>
          {
            children.map(child=> {
              return {...child, id:1}
            })
          }
      </tbody>
    </table>
  )
}

export default Table;