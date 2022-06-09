import { useEffect, useState } from "react"

import './App.css';

import { Calendar } from './components/Calendar/Calendar';
import { Details } from './components/Notes/Details';
import { Chart } from './components/Chart/Chart';

import moment from "moment"

function App() {
  /* Currently selected month */
  const [month, setMonth] = useState(moment());

  /* Currently selected day */
  const [day, setDay] = useState(moment());

  /* The habits' data */
  const [data, setData] = useState({});

  /* At load time, load the saved data if it exists */
  useEffect(()=>{
    const savedData = window.localStorage.getItem("data") || "{}";
    setData(JSON.parse(savedData));
  },[]);


  
  const nextMonth = () => {
    setMonth(month.clone().add(1, "month"));
  };
  const prevMonth = () => {
    setMonth(month.clone().subtract(1, "month"));
  };

  /* Saves a new habit entry or updates an existing one */
  const save = (count) => {
    const entry = {
      date: day,
      count: count
    };

    const newData = {...data};

    let key = day.format("DDMMYYYY");
    let old = data[key];
    let exists = old !== undefined;

    /* if the count is 0 and the entry doesn't exists than there is nothing to save */
    if(!count && !exists)
      return;

    /* else if the count is 0 than delete the existing entry */
    else if(!count)
      delete newData[key];
    
    else
      newData[key] = entry;
    

    setData(newData);
    window.localStorage.setItem("data", JSON.stringify(newData));
  };

  const getDataEntry = (date) => {
      let keys = Object.keys(data);

      for(let i = 0; i < keys.length; i++) {

          let e = data[keys[i]];

          if(moment(e.date).isSame(date, 'day'))
              return e;
      }

      return null;
  };

  return (
    <div className="app">
      <Calendar day={day} month={month} nextMonth={nextMonth} prevMonth={prevMonth} onDaySelect={setDay} getDataEntry={getDataEntry} />
      <Details data={data} day={day} onSave={save} />
      <Chart month={month} getDataEntry={getDataEntry} />
    </div>
  );
}

export default App;
