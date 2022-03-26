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

import Chart from "chart.js/auto";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { dev, prod } from "../APIEndpoints";

export const WeeklyChart = (props) => {
  const theme = useTheme();

  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let weeklyURL = "";
  if (process.env.NODE_ENV === "development") {
    weeklyURL = `${dev.baseURL}${dev.incidentsWeekly}`;
  } else if (process.env.NODE_ENV === "production") {
    weeklyURL = `${prod.baseURL}${prod.incidentsWeekly}`;
  }

  useEffect(() => {
    fetch(weeklyURL + "0/")
      .then((res) => res.json())
      .then(
        (result) => {
          const temp = [];
          const weeksName = [];
          for (let inc of result) {
            temp.push(inc.count);
            weeksName.push("Week" + inc.created_date__week);
          }

          const incidentsMonthlyData = {
            datasets: [
              {
                backgroundColor: "rgba(53, 162," + 23 + ",0.5)",
                barPercentage: 0.5,
                barThickness: 20,
                borderRadius: 0,
                categoryPercentage: 0.5,
                data: temp.reverse().slice(0, temp.length - 1),
                label: "2022",
                borderWidth: 1
              }
            ],
            labels: weeksName.reverse().slice(0, weeksName.length - 1)
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

  const [priority, setPriority] = React.useState("");

  const handleChange = (event) => {
    setPriority(event.target.value);

    fetch(weeklyURL + event.target.value)
      .then((res) => res.json())
      .then(
        (result) => {
          const temp = [];
          const weeksName = [];
          for (let inc of result) {
            temp.push(inc.count);

            weeksName.push("Week " + inc.created_date__week);
          }

          const incidentsMonthlyData = {
            datasets: [
              {
                backgroundColor: "rgba(53, 162," + 23 + ",0.5)",
                barPercentage: 0.5,
                barThickness: 20,
                borderRadius: 4,
                categoryPercentage: 0.5,
                data: temp.reverse().slice(0, temp.length - 1),
                label: "2022",
                borderWidth: 1
              }
            ],
            labels: weeksName.reverse().slice(0, weeksName.length - 1)
          };

          setData(incidentsMonthlyData);
          setIsLoaded(true);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

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
        <CardHeader
          title="Weekly Incidents Raised Trend"
          action={
            <Box>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Filter
                </InputLabel>
                <NativeSelect
                  defaultValue={10}
                  inputProps={{
                    name: "Filter",
                    id: "uncontrolled-native"
                  }}
                  onChange={handleChange}
                >
                  <option value={0}>Total</option>
                  <option value={1}>Critical</option>
                  <option value={2}>High</option>
                  <option value={3}>Medium</option>
                  <option value={4}>Low</option>
                </NativeSelect>
              </FormControl>
            </Box>
          }
        />

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
