import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme
} from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import { useEffect, useState, useRef } from "react";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import * as React from "react";
import { dev, prod } from "../APIEndpoints";

export const IncidentCause = (props) => {
  const theme = useTheme();

  const [list, setList] = useState({});
  const [incTypes, setIncTypes] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [total, setTotal] = useState(0);

  const [priority, setPriority] = React.useState("");

  let incidentCauseURL = "";
  if (process.env.NODE_ENV === "development") {
    incidentCauseURL = `${dev.baseURL}${dev.monthlyIncidentsByCause}`;
  } else if (process.env.NODE_ENV === "production") {
    incidentCauseURL = `${prod.baseURL}${prod.monthlyIncidentsByCause}`;
  }

  useEffect(() => {
    const d = new Date();
    let month = d.getMonth() + 1;
    fetch(incidentCauseURL + month + "/")
      .then((res) => res.json())
      .then(
        (result) => {
          const temp = [];
          const incidentType = [];
          let others = 0;
          let count = 0;
          let temptotal = 0;
          for (let inc of result) {
            temp.push(inc.count);
            if (count > 3) others += inc.count;
            count += 1;

            incidentType.push(inc.incident_type);
            temptotal += inc.count;
          }
          setTotal(temptotal);

          const withOthers = temp.slice(0, 3);
          const labelWithOthers = incidentType.slice(0, 3);
          withOthers.push(others);
          labelWithOthers.push("OTHERS");

          const colors = ["#3F51B5", "#e53935", "#FB8C00", "#68d9d3"];
          const items = [];
          for (let i = 0; i < 4; i++) {
            items.push({
              title: labelWithOthers[i],
              value: withOthers[i],
              color: colors[i]
            });
          }
          setIncTypes(items);

          const incidentsTypeData = {
            datasets: [
              {
                data: withOthers,
                backgroundColor: colors,
                borderWidth: 8,
                borderColor: "#FFFFFF",
                hoverBorderColor: "#FFFFFF"
              }
            ],
            labels: labelWithOthers
          };

          setList(incidentsTypeData);
          setIsLoaded(true);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  const handleChange = (event) => {
    setPriority(event.target.value);

    fetch(incidentCauseURL + event.target.value)
      .then((res) => res.json())
      .then(
        (result) => {
          const temp = [];
          const incidentType = [];
          let others = 0;
          let count = 0;
          let temptotal = 0;
          for (let inc of result) {
            temp.push(inc.count);
            if (count > 3) others += inc.count;
            count += 1;

            incidentType.push(inc.incident_type);
            temptotal += inc.count;
          }
          setTotal(temptotal);

          const withOthers = temp.slice(0, 3);
          const labelWithOthers = incidentType.slice(0, 3);
          withOthers.push(others);
          labelWithOthers.push("OTHERS");

          const colors = ["#3F51B5", "#e53935", "#FB8C00", "#68d9d3"];
          const items = [];
          for (let i = 0; i < 4; i++) {
            items.push({
              title: labelWithOthers[i],
              value: withOthers[i],
              color: colors[i]
            });
          }
          setIncTypes(items);

          const incidentsTypeData = {
            datasets: [
              {
                data: withOthers,
                backgroundColor: colors,
                borderWidth: 8,
                borderColor: "#FFFFFF",
                hoverBorderColor: "#FFFFFF"
              }
            ],
            labels: labelWithOthers
          };

          setList(incidentsTypeData);
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
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
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
          title="Top 3 Incident Causes of the month"
          action={
            <Box>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  For Month
                </InputLabel>
                <NativeSelect
                  defaultValue={4}
                  inputProps={{
                    name: "Filter",
                    id: "uncontrolled-native"
                  }}
                  onChange={handleChange}
                >
                  <option value={1}>January</option>
                  <option value={2}>February</option>
                  <option value={3}>March</option>
                  <option value={4}>April</option>
                </NativeSelect>
              </FormControl>
            </Box>
          }
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 300,
              position: "relative"
            }}
          >
            <Doughnut data={list} options={options} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 2
            }}
          >
            {incTypes.map(({ color, title, value }) => (
              <Box
                key={title}
                sx={{
                  p: 1,
                  textAlign: "center"
                }}
              >
                <Typography color="textPrimary" variant="subtitle2">
                  {title}
                </Typography>
                <Typography style={{ color }} variant="subtitle2">
                  {((value / total) * 100).toFixed(2)}%
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }
};
