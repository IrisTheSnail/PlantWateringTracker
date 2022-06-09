import { useState } from "react"

import moment from "moment"

export function Calendar(props){
    /* Current animation (CSS attribute) */
    const [anim, setAnim] = useState("none");
    
    /*  
        Plays "animation" for "delay" milliseconds 
        and calls "updateContent" in the middle of the animation 
    */
    const flip = (animation, updateContent, delay=500) => {
        setAnim(`${animation} ${delay/1000}s ease`);
        setTimeout(updateContent, delay/2);
        setTimeout(() => {
            setAnim("none");
        }, delay);
    }

    const onNext = ()=> {
        flip("flip-next", props.nextMonth);
    }
    
    const onPrev = (callback)=> {
        flip("flip-prev", props.prevMonth);
    }

    return (<div className="cal-container" style={{animation: anim}}>
                
                <div className="cal-month"> 
                    <div className="cal-btn" onClick={onPrev}>{"<"}</div>
                    { props.month.format("MMM YYYY") } 
                    <div className="cal-btn" onClick={onNext}>{">"}</div>
                </div>
                
                <div className="cal-days">
                    {
                        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(e => {
                            return (
                                <div key={e} className="cal-day"> {e} </div>    
                            )
                        })
                    }
                    
                    {
                        [...Array(props.month.startOf('month').daysInMonth())].map((_, i) => {

                            let m = props.month.startOf('month');
                            let day = m.clone().add(i, 'day');

                            let classToday      = moment().isSame(day, 'day')       ? "cal-day-today"    : "";
                            let classSelected   = props.day.isSame(day, 'day')      ? "cal-day-selected" : "";
                            let classEntry      = props.getDataEntry(day) !== null  ? "cal-day-entry"    : "";
                            
                            return <div key = {i} 
                                        className = {`cal-day ${classToday} ${classSelected} ${classEntry}`} 
                                        style = {{gridColumn: m.clone().add(i, 'day').day() + 1}}
                                        onClick = {()=>{props.onDaySelect(m.clone().add(i, 'day'))}}
                                    >
                                        
                                        {m.clone().add(i, 'day').format("D")}
                                    
                                    </div>
                        })
                    
                    }
                    
                </div>
            </div>)
    
}
