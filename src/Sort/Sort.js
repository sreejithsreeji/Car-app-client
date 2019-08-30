import React from 'react';
import './Sort.css'
const sort=(props)=>{
    const sortOptions=['brand','model','trim'];
    const optionComponent=sortOptions.map(option=>{
        return (
            <td>
            <label>{option}</label>
            <input onChange={(e)=>props.sort(e)}  type='checkbox' name={option} value={option}></input>
            </td>
        )
    })

    return (
       
            <div>
                <td>
                <p className="Sort-title">Sort By</p>
                </td>
                {optionComponent} 
            </div>
            
        
    )
}

export default sort;