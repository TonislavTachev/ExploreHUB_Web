import React, {useEffect, useContext} from 'react'
import {Line} from 'react-chartjs-2';
import EventContext from '../../context/EventContext/eventContext';
import Preloader from '../Preloader/Preloader';

const LineChart = () => {

    const eventContext = useContext(EventContext);
    const {getUserBase, userbase} = eventContext;

    /**Gets the userbase 
     * @method
     */
    useEffect(()=>{
        
            getUserBase();
       
    },[])

    if(userbase === null){
      return <Preloader/>
    }

const state = {
    labels: ['January', 'February', 'March',
             'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Users',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: userbase
      }
    ]
  }

  //renders the number of registered users
    return (
        <div>
            <Line
          data={state}
          options={{
            title:{
              display:true,
              text:`Students using ExploreHUB: ${userbase[userbase.length-1]}`,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        </div>
    )
}

export default LineChart
