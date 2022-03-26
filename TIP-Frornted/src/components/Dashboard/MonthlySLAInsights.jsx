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

class MonthlySLAInsights extends Component {
  render() {
    const { data } = this.props;

    return (
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="h6">
                {data.name} Compliance
              </Typography>
              <Typography color="textPrimary" variant="h4"></Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="h5">
                {data.percentage}%{/* {data.val} */}
              </Typography>
              <Typography color="textPrimary" variant="h4"></Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default MonthlySLAInsights;
