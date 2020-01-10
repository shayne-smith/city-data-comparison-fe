import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import {markerDummyData} from "../../map-components/data";


export default function BarGraph ({selected}){
    const [data, setData] = useState({})
  // console.log(selected, 'selected')
    useEffect( () => {
      let data = selected[0]
      let labels = []
      let amount = []
      let backgroundColors = []
      if (data){
        let houserooms = data["Housing by rooms"];
        
        
        Object.keys(houserooms).forEach(function (label) {
          labels.push(label)
          let value = houserooms[label];
          amount.push(value);
          backgroundColors.push(  '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6))
        });
        
        console.log(labels);
        console.log(amount);
        var newState = {
          labels: [],
          datasets:[
            {
              label:'%',
              data: [],
              backgroundColor:[
             
              ]
            }
          ]
      }
        console.log(newState, 'new State')
        newState.labels = labels
        newState.datasets[0].data = amount
        newState.datasets[0].backgroundColor = backgroundColors;
        setData({chartData: newState})

      }

    },[selected])
  
  
  
  const defaultProps = {
    displayTitle:true,
    displayLegend: false,
    legendPosition:'top',
    location:'%'
  }
    return (
      <div className="chart">

        <Bar
          data={data.chartData}
          options={{
            maintainAspectRatio:true,
            title:{
              display:defaultProps.displayTitle,
              text:' Rooms per House ',
              fontSize:25
            },
            legend:{
              display:defaultProps.displayLegend,
              position:defaultProps.legendPosition
            }
          }}
        />
      </div>
    )
  }
  