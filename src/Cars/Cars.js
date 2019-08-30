import React from 'react';

const car=(props)=>{
    const spec=Object.values(props.car)
    .map(value=>{
        return (
            <td>
                {value}
            </td>
        )
    })
    return (
        <tr>
            {spec}
        </tr>
    )
}

export default car;