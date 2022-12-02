import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Card } from "@mui/material/";
import Box from "@mui/material/Box";
import YoutubePlayer from "./YoutubePlayer";
import CommentScreen from "./CommentScreen";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Card
          elevation={2}
          sx={{
            position: "relative",
            backgroundColor: "#d4d4f6",
            //minHeight: "600px",
          }}
        >
          {children}
        </Card>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& button:focus": { backgroundColor: "#2c2f70", color: "white" },
          }}
        >
          <Tab label="Player" {...a11yProps(0)} />
          <Tab label="Comments" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <YoutubePlayer />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CommentScreen />
      </TabPanel>
    </Box>
  );
}
