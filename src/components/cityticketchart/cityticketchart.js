import React, {Component} from 'react';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import ChartMenu from '../chartmenu/chartmenu';

const StateCityChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from backend API
    axios.get("http://localhost:9829/ticket/countByLocationCity")
      .then(response => {
        console.log(response.data); // Log the response to check its structure
        const stateData = response.data;
        const groupedData = {};

        // Group cities by state
        stateData.forEach(item => {
          const { state, city, ticketCount } = item;
          if (!groupedData[state]) {
            groupedData[state] = [];
          }
          groupedData[state].push({ city, ticketCount });
        });

        // Convert grouped data into an array of objects
        const formattedData = Object.keys(groupedData).map(state => ({
          state,
          cities: groupedData[state]
        }));

        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching ticket data', error);
      });
  }, []);

  // Custom tooltip to show the state and city info
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { city, ticketCount } = payload[0].payload;
      const state = payload[0].payload.state; // Get the state from the payload

      return (
        <div className="custom-tooltip">
          <Typography variant="body2"><strong>City:</strong> {city}</Typography>
          <Typography variant="body2"><strong>State:</strong> {state}</Typography>
          <Typography variant="body2"><strong>Tickets Raised:</strong> {ticketCount}</Typography>
        </div>
      );
    }

    return null;
  };

  return (
    <>
    <ChartMenu/>
    <Box>
      <Typography variant="h6" gutterBottom>State-wise City Ticket Counts</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {
            // Dynamically render a Bar component for each city in each state
            data.map((stateData, index) => (
              stateData.cities.map((cityData, i) => (
                <Bar
                  key={`${index}-${i}`}
                  dataKey="ticketCount"
                  data={stateData.cities}
                  name={cityData.city}
                  fill="#8884d8"
                  barSize={20}
                  label={{ position: 'top' }}
                  stackId="a"
                />
              ))
            ))
          }
        </BarChart>
      </ResponsiveContainer>
    </Box>
    </>
  );
};

export default StateCityChart;
