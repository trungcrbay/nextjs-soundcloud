"use client";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function BasicTabs() {
  const [value, setValue] = useState<number>(0);
  const [trackUpload, setTrackUpload] = useState({
    fileName: "",
    percent: 0,
    uploadedTrackName: "",
  });
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          
          <Tab disabled={value !== 0} label="Tracks" />
          <Tab disabled={value !== 1} label="Basic Information" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Step1
          trackUpload={trackUpload}
          setValue={setValue}
          setTrackUpload={setTrackUpload}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Step2 trackUpload={trackUpload} setValue={setValue}  setTrackUpload={setTrackUpload} />
      </CustomTabPanel>
    </Box>
  );
}
const UploadTabs = () => {
  return (
    <div>
      <BasicTabs></BasicTabs>
    </div>
  );
};

export default UploadTabs;
