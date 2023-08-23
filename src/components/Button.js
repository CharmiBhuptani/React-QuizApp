import React from 'react';

function Button(props) {
  return (
    <button disabled={props.disbled} className='btn' onClick={props.clickHandler}>{props.btnName}</button>
  )
}

export default React.memo(Button)