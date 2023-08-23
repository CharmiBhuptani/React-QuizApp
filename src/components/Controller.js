import React from 'react';

import Button from './Button';

function Controller(props) {

    return (
        <>
            <div className='controller'>
                <div>
                    <Button disbled={props.prevDisable} clickHandler={props.prevHandler} btnName='Previous'></Button>
                    <Button disbled={props.nextDisable} clickHandler={props.nextHandler} btnName='Next'></Button>
                </div>
                {
                    (props.last) ?
                        (<Button clickHandler={props.finishHandler} btnName='Finish'></Button>)
                        :
                        (<Button clickHandler={props.skipHandler} btnName='Skip'></Button>)
                }
            </div>
        </>
    )
}

export default React.memo(Controller)