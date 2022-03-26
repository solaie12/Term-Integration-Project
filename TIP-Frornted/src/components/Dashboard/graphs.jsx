import { Component } from "react";
import * as React from "react";

import { IncidentCause } from "./IncidentCause";
import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import MonthlyInsights from "./MonthlyInsights";
import MonthlySLAInsights from "./MonthlySLAInsights";
import "./graphs.css";
import { WeeklyChart } from "./Weekly";

import { dev, prod } from "../APIEndpoints";

class Graphs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoadedMonthlySummary: false,
      isLoaded: false,
      data: {},
      incidentsMonthly: [],
      monthlySLA: {},
      isLoadedMonthlySLA: false
    };
    this.months = [
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
  }

  componentDidMount() {
    let monthlySummaryURL = "";
    if (process.env.NODE_ENV === "development") {
      monthlySummaryURL = `${dev.baseURL}${dev.incidentsPerMonthSummary}`;
    } else if (process.env.NODE_ENV === "production") {
      monthlySummaryURL = `${prod.baseURL}${prod.incidentsPerMonthSummary}`;
    }
    const d = new Date();
    let month = d.getMonth() + 1;

    fetch(monthlySummaryURL + month + "/")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoadedMonthlySummary: true,
            data: result
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { incidentsMonthly } = this.state;

    const temp = [];
    const monthsName = [];
    for (let inc of incidentsMonthly) {
      temp.push(inc.count);

      monthsName.push(this.months[inc.created_date__month - 1]);
    }

    const incidentsMonthlyData = {
      datasets: [
        {
          backgroundColor: "rgba(53, 162," + 23 + ",0.5)",
          barPercentage: 0.5,
          barThickness: 60,
          borderRadius: 4,
          categoryPercentage: 0.5,
          data: temp.reverse(),
          label: "2022",
          borderWidth: 1
        }
      ],
      labels: monthsName.reverse()
    };

    let { data } = this.state;

    return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <MonthlyInsights
                data={{ name: "Critical", val: data.critical }}
              />
            </Grid>
            <Grid item xs={3}>
              <MonthlyInsights data={{ name: "High", val: data.high }} />
            </Grid>

            <Grid item xs={3}>
              <MonthlyInsights data={{ name: "Medium", val: data.medium }} />
            </Grid>
            <Grid item xs={3}>
              <MonthlyInsights data={{ name: "Low", val: data.low }} />
            </Grid>

            <Grid item lg={8} md={12} xl={9} xs={12}>
              <WeeklyChart></WeeklyChart>
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <IncidentCause sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }
}

export default Graphs;
