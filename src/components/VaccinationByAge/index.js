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
            endAngle={360}
            innerRadius="0"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
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
