import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {newUpdatedFetchedData} = props
  const pieChartAgeData = newUpdatedFetchedData.vaccinationByAge

  return (
    <div className="barChartContainer">
      <h1 className="barChartContainerHeading">Vaccination by Age</h1>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={pieChartAgeData}
            startAngle={0}
            endAngle={180}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Men" fill="#2cc6c6" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill="#f54394" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            horizontalAlign="middle"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
