import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import ChartMenu from "../chartmenu/chartmenu";

const DomainTicketChart = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:9829/ticket/countByDept") // Adjust URL if needed
            .then(response => response.json())
            .then(data => {
                setChartData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    return (
      <>
      <ChartMenu/>
        <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                    Ticket Count by Department
                </Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="employeeDept" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="ticketCount" fill="#1976d2" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
      </>
    );
};

export default DomainTicketChart;
