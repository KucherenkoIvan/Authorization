import React from 'react';
import {useState} from 'react';
import './index.scss';

export default function SvallowCum(props){

    console.log(props);

    let [count, set_count] = useState(0);
    
    console.log(count);

    const click_handler = () => {
        set_count(count + 1);
        console.log(count);
    };

    return (    
        <>
        <h1>
            {props.children}
        </h1>
        <button className="big_button" onClick={click_handler}>
            Вот столько см: {count}
        </button>
        </>
  );
}