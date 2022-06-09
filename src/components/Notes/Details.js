

import { useEffect, useState } from "react"

export function Details(props){

    const [count, setCount] = useState(0);
    
    useEffect(()=>{
        let key     = props.day.format("DDMMYYYY");
        let count   = props.data[key]?.count || 0;
        setCount(count)
    }, [props.data, props.day]);

    useEffect(()=>{
        props.onSave(count);
    }, [count]);

    const increment = async () => {
        await setCount(count + 1);
    }
    const decrement = async () => {
        await setCount(Math.max(0, count - 1));
    }

    return (<div className="cal-container cal-notes">
                <h1>{props.day.format("DD MMMM")}</h1>
                <div className="cal-notes-content">
                    <p style={{alignSelf: "center"}}>How many flowers did you water today ?</p>
                    <div className="cal-spinner" style={{alignSelf: "center"}} >
                        <div className="cal-spinner-btn" onClick={decrement}> - </div>
                        <div>{count}</div>
                        <div className="cal-spinner-btn" onClick={increment}> + </div> 
                    </div>
                </div>
            </div>)
}