import React from 'react';

const Model=(props)=>{
    if(props.showModel){
        return (
            <div className='model'>
            <div className='model-content'>
                {props.children}
            </div>
                
            </div>
        )
    }else return null
}

export default Model;