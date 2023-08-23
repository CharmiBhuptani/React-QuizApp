import React from 'react';

function StatusBar(props) {
    return (
        <div className='status'>
            <span style={{width: props.percent}} className='statusBar'></span>
        </div>
    )
}

export default StatusBar