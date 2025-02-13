import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';
import ChartMenu from "../chartmenu/chartmenu";

const AverageResolutionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the data from the backend
    axios.get('http://localhost:9829/resolve/averageresolutiontime')
      .then(response => {
        const chartData = Object.keys(response.data).map(key => ({
          employeeName: key,  // Using the combined employee name and ID
          avgResolutionTime: response.data[key],
        }));
        setData(chartData);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <>
    <ChartMenu/>
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Average Resolution Time of Employees
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="employeeName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgResolutionTime" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </>
  );
};

export default AverageResolutionChart;
