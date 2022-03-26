import React, { Component } from "react";
import { IncidentsByMonth } from "./IncidentsByMonth";
import { IncientsMonthlySLA } from "./IncidentsMonthlySLA";

import MonthlySLAInsights from "./MonthlySLAInsights";
import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import { dev, prod } from "../APIEndpoints";

class MonthlyReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
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
    const d = new Date();
    let month = d.getMonth() + 1;

    let monthlySLAInsightURL = "";
    if (process.env.NODE_ENV === "development") {
      monthlySLAInsightURL = `${dev.baseURL}${dev.incidentsKPISLAInsight}`;
    } else if (process.env.NODE_ENV === "production") {
      monthlySLAInsightURL = `${prod.baseURL}${prod.incidentsKPISLAInsight}`;
    }

    fetch(monthlySLAInsightURL + month + "/")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoadedMonthlySLA: true,
            monthlySLA: result
          });
        },

        (error) => {
          this.setState({
            isLoadedMonthlySLA: true,
            error
          });
        }
      );
  }

  render() {
    let { monthlySLA, isLoadedMonthlySLA } = this.state;
    let lowPercentagae = 0;
    let mediumPercentagae = 0;
    let highPercentagae = 0;
    let criticalPercentagae = 0;

    if (isLoadedMonthlySLA) {
      lowPercentagae = (
        (monthlySLA.low.in_sla /
          (monthlySLA.low.in_sla + monthlySLA.low.out_sla)) *
        100
      ).toFixed(2);
      highPercentagae = (
        (monthlySLA.high.in_sla /
          (monthlySLA.high.in_sla + monthlySLA.high.out_sla)) *
        100
      ).toFixed(2);
      mediumPercentagae = (
        (monthlySLA.medium.in_sla /
          (monthlySLA.medium.in_sla + monthlySLA.medium.out_sla)) *
        100
      ).toFixed(2);
      criticalPercentagae = (
        (monthlySLA.critical.in_sla /
          (monthlySLA.critical.in_sla + monthlySLA.critical.out_sla)) *
        100
      ).toFixed(2);
    }

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <MonthlySLAInsights
              data={{
                name: "Critical SLA",
                val: monthlySLA.critical,
                percentage: criticalPercentagae
              }}
            ></MonthlySLAInsights>
          </Grid>
          <Grid item xs={3}>
            <MonthlySLAInsights
              data={{
                name: "High SLA",
                val: monthlySLA.high,
                percentage: highPercentagae
              }}
            ></MonthlySLAInsights>
          </Grid>

          <Grid item xs={3}>
            <MonthlySLAInsights
              data={{
                name: "Medium SLA",
                val: monthlySLA.medium,
                percentage: mediumPercentagae
              }}
            ></MonthlySLAInsights>
          </Grid>
          <Grid item xs={3}>
            <MonthlySLAInsights
              data={{
                name: "Low SLA",
                val: monthlySLA.low,
                percentage: lowPercentagae
              }}
            ></MonthlySLAInsights>
          </Grid>
        </Grid>

        <IncidentsByMonth></IncidentsByMonth>
        <br></br>
        <IncientsMonthlySLA></IncientsMonthlySLA>
      </div>
    );
  }
}

export default MonthlyReport;
