import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import ChartMenu from "../chartmenu/chartmenu";

// Material UI imports for styling
import { Button, ButtonGroup } from '@mui/material';

const TicketStatusChart = () => {
  const [ticketCounts, setTicketCounts] = useState({
    open: 0,
    closed: 0,
    pending: 0
  });

  const [selectedStatus, setSelectedStatus] = useState("open");

  useEffect(() => {
    // Fetch ticket counts from the backend API
    const fetchTicketCounts = async () => {
      try {
        const openResponse = await axios.get("http://localhost:9829/ticket/open/count");
        const closedResponse = await axios.get("http://localhost:9829/ticket/closed/count");
        const pendingResponse = await axios.get("http://localhost:9829/ticket/pending/count");

        setTicketCounts({
          open: openResponse.data,
          closed: closedResponse.data,
          pending: pendingResponse.data
        });
      } catch (error) {
        console.error("Error fetching ticket counts:", error);
      }
    };
    fetchTicketCounts();
  }, []);

  // Data for the chart based on the selected status
  const data = [
    {
      name: selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1) + " Tickets",
      count: ticketCounts[selectedStatus]
    }
  ];

  // Set bar color based on status
  const getBarColor = (status) => {
    switch (status) {
      case 'open':
        return '#2196f3'; // Blue
      case 'closed':
        return '#4caf50'; // Green
      case 'pending':
        return '#ffeb3b'; // Yellow
      default:
        return '#8884d8'; // Default color
    }
  };

  return (
    <div>
      <ChartMenu/>
      <h3>Ticket Status Overview</h3>
      <ButtonGroup variant="contained" aria-label="Ticket status buttons" style={{ marginBottom: '20px' }}>
        <Button onClick={() => setSelectedStatus('open')} color={selectedStatus === 'open' ? 'primary' : 'default'}>
          Open
        </Button>
        <Button onClick={() => setSelectedStatus('closed')} color={selectedStatus === 'closed' ? 'primary' : 'default'}>
          Closed
        </Button>
        <Button onClick={() => setSelectedStatus('pending')} color={selectedStatus === 'pending' ? 'primary' : 'default'}>
          Pending
        </Button>
      </ButtonGroup>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="5 5" stroke="#ccc" />
          <XAxis dataKey="name" tick={{ fontSize: 14, fill: '#333' }} />
          <YAxis tick={{ fontSize: 14, fill: '#333' }} />
          <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff', borderRadius: '5px' }} />
          <Legend wrapperStyle={{ fontSize: 14 }} />
          <Bar dataKey="count" fill={getBarColor(selectedStatus)} barSize={50} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TicketStatusChart;
