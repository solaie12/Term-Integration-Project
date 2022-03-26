import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import React, { Component } from "react";
import AssessmentIcon from "@mui/icons-material/Assessment";

class MonthlyInsights extends Component {
  render() {
    const { data } = this.props;

    return (
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="h6">
                <span style={{ fontWeight: "bolder" }}>{data.val}</span>{" "}
                {data.name} incidents
              </Typography>

              <Typography color="textPrimary" variant="h6"></Typography>
            </Grid>
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h5"
              ></Typography>
              <Typography color="textPrimary" variant="h4"></Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default MonthlyInsights;
