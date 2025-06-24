
import React, { useState } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography
} from '@mui/material';



const UserDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        Customer Dashboard
      </Typography>

    </Container>
  );
};

export default UserDashboard;