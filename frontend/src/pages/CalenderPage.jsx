import Calendar from 'react-calendar';
import { useDateContext } from '../hooks/useDateContext';
import { Link } from 'react-router-dom';

const CalenderPage = () => {
  const {dateState,dispatchDateState}=useDateContext()
  const handleDateChange = (date) => {
      console.log(date.getDate(),date.getMonth(),date.getFullYear());
      dispatchDateState({type:"SET_DATE",payload:date});
  };
  return (
    <div className="calender" style={{flexGrow:2,display:"flex",flexDirection:"column",alignItems:"center"}}>
      <Calendar
        onChange={handleDateChange} // This triggers when a date is selected
        value={dateState} // Controlled state for the selected date
      />
      <Link to="/tasks">
        <button>Go to task Page</button>
      </Link>

    </div>
  )
}

export default CalenderPage