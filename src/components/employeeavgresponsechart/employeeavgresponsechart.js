import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Typography, Paper, Grid } from '@mui/material';
import ChartMenu from "../chartmenu/chartmenu";

const ResponseTimeChart = () => {
  const [data, setData] = useState([]);
  
  // Fetch the average response times per employee from the backend
  useEffect(() => {
    fetch("http://localhost:9829/ticket/averageresponsetime")
      .then((response) => response.json())
      .then((data) => {
        // Format data for each employee
        const formattedData = Object.entries(data).map(([employeeId, avgResponseTimes]) => ({
          employeeId: `Employee ${employeeId}`,
          avgResponseTime: avgResponseTimes,  // Assuming `avgResponseTimes` is the average time
        }));
        setData(formattedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Show loading until data is fetched
  if (!data.length) {
    return (
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography variant="h6" component="h2" align="center" gutterBottom>
          Loading data...
        </Typography>
      </Container>
    );
  }

  return (
    <>
    <ChartMenu/>
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Average Response Time per Employee (Bar Chart)
        </Typography>
        <Grid container justifyContent="center">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="employeeId" label={{ value: 'Employee', position: 'insideBottomRight', offset: 0 }} />
              <YAxis label={{ value: 'Avg Response Time (Seconds)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgResponseTime" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Paper>
    </Container>
    </>
  );
};

export default ResponseTimeChart;
