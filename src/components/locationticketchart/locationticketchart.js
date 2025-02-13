import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Typography, Paper, Grid } from '@mui/material';
import ChartMenu from "../chartmenu/chartmenu";

const TicketCountByLocation = () => {
  const [data, setData] = useState([]);

  // Fetch the ticket count by location from the backend
  useEffect(() => {
    fetch("http://localhost:9829/ticket/countByLocation")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);  // Log the fetched data for debugging
        setData(data);  // Set the response data to state
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Show loading state until data is fetched
  if (data.length === 0) {
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
          Ticket Count by Location (State)
        </Typography>
        <Grid container justifyContent="center">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" label={{ value: 'Location (State)', position: 'insideBottomRight', offset: 0 }} />
              <YAxis label={{ value: 'Ticket Count', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="ticketCount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Paper>
    </Container>
  </>
  );
};

export default TicketCountByLocation;
