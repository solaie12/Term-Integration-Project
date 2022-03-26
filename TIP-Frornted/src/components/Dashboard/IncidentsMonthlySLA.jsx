import { Bar } from "react-chartjs-2";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  useTheme
} from "@mui/material";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { dev, prod } from "../APIEndpoints";

export const IncientsMonthlySLA = (props) => {
  const theme = useTheme();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let monthlyCriticalSLA = "";
  if (process.env.NODE_ENV === "development") {
    monthlyCriticalSLA = `${dev.baseURL}${dev.criticalIncidentsTrend}`;
  } else if (process.env.NODE_ENV === "production") {
    monthlyCriticalSLA = `${prod.baseURL}${prod.criticalIncidentsTrend}`;
  }

  useEffect(() => {
    fetch(monthlyCriticalSLA)
      .then((res) => res.json())
      .then(
        (result) => {
          const monthsName = [];
          const temp = [];
          for (let inc in result) {
            let ts = result[inc];
            temp.push(result[inc].criticalPercent);

            monthsName.push(months[inc - 1]);
          }

          const incidentsMonthlyData = {
            datasets: [
              {
                backgroundColor: "rgba(53, 162," + 23 + ",0.5)",
                barPercentage: 0.5,
                barThickness: 60,
                borderRadius: 0,
                categoryPercentage: 0.5,
                data: temp,
                label: "2022",

                borderWidth: 1
              }
            ],
            labels: monthsName
          };

          setData(incidentsMonthlyData);
          setIsLoaded(true);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary
    }
  };
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Card {...props}>
        <CardHeader title="Critical Incidents monthly SLA compliance trend" />

        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 400,
              position: "relative"
            }}
          >
            <Bar data={data} options={options} />
          </Box>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2
          }}
        >
          <Button color="primary" size="small">
            Overview
          </Button>
        </Box>
      </Card>
    );
  }
};
