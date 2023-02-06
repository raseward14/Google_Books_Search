import React from 'react';

const count = (value) => {
    console.log(`count received ${value}`)
    return (
        <div>
            {value? 
            <span>book count: {value}</span>
            :
            <span>book count: 0</span>
        }
        </div>
    )
}

export default count;