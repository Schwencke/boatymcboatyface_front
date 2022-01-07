import { useEffect, useState } from "react"
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import moment from 'moment'


const Products = ({facade}) => {

const options = {style: 'currency', currency: 'DKK'};
const numberFormat = new Intl.NumberFormat('en-US', options);  

const priceData= [[1577836800, 241],[1580515200, 230],[1583020800, 235],[1585699200, 224],[1588291200, 222],[1590969600, 210],[1593561600, 200],[1596240000, 210],[1598918400, 220],[1601510400, 230],[1604188800, 220],[1606780800, 270]]

const configPrice = {
      
  yAxis: [{
    offset: 20,

    labels: {
      formatter: function () {
        return numberFormat.format(this.value) 
      }
      ,
      x: -15,
      style: {
        "color": "#000", "position": "absolute"

      },
      align: 'left'
    },
  },
    
  ],
  tooltip: {
    shared: true,
    formatter: function () {
      return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format("MMMM Do YYYY")
    }
  },
  plotOptions: {
    series: {
      showInNavigator: true,
      gapSize: 6,

    }
  },
  rangeSelector: {
    selected: 1
  },
  title: {
    text: `Historical data for USD`
  },
  chart: {
    height: 600,
  },

  credits: {
    enabled: false
  },

  legend: {
    enabled: true
  },
  xAxis: {
    type: 'date',
  },
  rangeSelector: {
    buttons: [{
      type: 'day',
      count: 1,
      text: '1d',
    }, {
      type: 'day',
      count: 7,
      text: '7d'
    }, {
      type: 'month',
      count: 1,
      text: '1m'
    }, {
      type: 'month',
      count: 3,
      text: '3m'
    },
      {
      type: 'all',
      text: 'All'
    }],
    selected: 4
  },
  series: [{
    name: 'Price',
    type: 'spline',

    data: priceData,
    tooltip: {
      valueDecimals: 2
    },

  }
  ]
};

    return (
        <div>
          <ReactHighcharts config = {configPrice}></ReactHighcharts>
        </div>
    )
}

export default Products
