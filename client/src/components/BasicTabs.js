import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Card } from "@mui/material/";
import Box from "@mui/material/Box";
import YoutubePlayer from "./YoutubePlayer";
import CommentScreen from "./CommentScreen";
import { createTheme, ThemeProvider } from "@mui/material/";

const theme = createTheme({
  palette: {
    text: {
      primary: "#deb992",
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <ThemeProvider theme={theme}>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {
          <Card
            elevation={2}
            sx={{
              position: "relative",
              backgroundColor: "white !important",
            }}
          >
            {children}
          </Card>
        }
      </div>
    </ThemeProvider>
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
    <Box sx={{ width: "100%", height: "100%", backgroundColor: "#051622" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            "& button:focus": { backgroundColor: "white", color: "#deb992" },
          }}
        >
          <Tab label="Player" {...a11yProps(0)} sx={{ color: "#deb992" }} />
          <Tab label="Comments" {...a11yProps(1)} sx={{ color: "#deb992" }} />
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
