import React, {useContext, useEffect} from 'react'
import {Doughnut} from 'react-chartjs-2';
import Preloader from '../Preloader/Preloader';
import EventContext from '../../context/EventContext/eventContext';

const Doug = () => {
 
    const eventContext = useContext(EventContext);
    const {getAvgCompany, doughnut} = eventContext;

    /**Gets the events hosted by each company
     * @method
     */
    useEffect(()=>{

            getAvgCompany();
            console.log('function called');
      
    },[])
     
    if(doughnut === null){
        return <Preloader/>
    }

    const state = {
        labels: doughnut.labels,
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
            data: doughnut.data
          }
        ]
      }
      


      //Renders the doughnut for all of the events hosted by each company
    return (
        <div>
             <Doughnut
          data={state}
          options={{
            title:{
              display:true,
              text:'Average events hosted by companies',
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

export default Doug
