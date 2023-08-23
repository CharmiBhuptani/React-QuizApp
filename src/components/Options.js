import React from 'react';

function Options(props) {
    return (
        <div>
            <input checked={props.val === props.options} onChange={props.optionHandler} type="radio" id={props.options} className="radioBtn" name="answer" value={props.options} />
            <label className={props.className} htmlFor={props.options}>{props.options}</label>
        </div>
    )
}

export default React.memo(Options)