import React, {useEffect, useContext} from 'react'
import {Pie} from 'react-chartjs-2';
import EventContext from '../../context/EventContext/eventContext';
import Preloader from '../Preloader/Preloader';
const Barchart = () => {

    const eventContext = useContext(EventContext);
    const {getMostBookedEvents, barchart} = eventContext;


    /**Gets data for the most booked events from the database
     * @method
     */
    useEffect(()=>{
      getMostBookedEvents();
    },[])

    if(barchart === null){
      return <Preloader/>
    }

    const state = {
      labels: barchart.labels,
      datasets: [
        {
          label: 'Rainfall',
          backgroundColor: [
            '#B21F00',
            '#C9DE00',
            '#2FDE00',
            '#00A6B4',
            '#6800B4'
          ],
          hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F'
          ],
          data: barchart.data
        }
      ]
    }

    //displays the barchart of the most booked events
      
    return (
        <div>
            <Pie
          data={state}
          options={{
            title:{
              display:true,
              text:'Most booked events',
              fontSize:20
            },
            legend:{
              display:true,
              position:'left'
            }
          }}
        />
        </div>
    )
}

export default Barchart
