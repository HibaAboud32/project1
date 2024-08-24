import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '0',
    online: 4000,
    offline: 2400,
    amt: 2400,
  },
  {
    name: '1',
    online: 3000,
    offline: 1398,
    amt: 2210,
  },
  {
    name: '2',
    online: 2000,
    offline: 9800,
    amt: 2290,
  },
  {
    name: '3',
    online: 2780,
    offline: 3908,
    amt: 2000,
  }
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/bar-chart-has-background-62zcd';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="online" fill="#2989DB" />
          <Bar dataKey="offline" fill="#444349" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
