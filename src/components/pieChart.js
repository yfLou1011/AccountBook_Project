import React from 'react';
import PropTypes from 'prop-types'
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';
import {Colors} from '../utility'

const colorArr = Object.keys(Colors).map(key => Colors[key]);

const CustomPieChart = ({title, categoryData}) => {
  if(categoryData.length===0){
    return <h3 className='text-center mx-3'>no data</h3>
  }
  return(
    <div className='pie-chart-component'>
      <h3 className='text-center mt-3'>{title}</h3>
      <ResponsiveContainer width={"100%"} height={300}>
      <PieChart width={400} height={400}>
        <Pie dataKey="value" isAnimationActive={false} dataKey="value"
          data={categoryData}
          cx={"50%"} cy={"50%"} outerRadius={80}
          fill="#8884d8" label>
          {
            categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={colorArr[index % colorArr.length]} />)
          }
        </Pie>
        <Tooltip />
      </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
CustomPieChart.propTypes = {
  title:PropTypes.string,
  categoryData:PropTypes.array
}
export default CustomPieChart;
