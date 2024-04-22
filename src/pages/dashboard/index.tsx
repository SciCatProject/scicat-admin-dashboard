import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { DatasetCreationOverview } from '../../components/dashboard/chartDatasetCreation';
import { DatasetStatusOverview } from '../../components/dashboard/chartDatasetStatus';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

export const DashboardPage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedYears, setSelectedYears] = useState<null | number>(3);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectYearsFilter = (years: number | null) => {
    setSelectedYears(years);
    handleClose();
  };

  return (
    <Grid container columns={24} spacing={2}>
      <Grid item xs={24} sm={24} md={24} lg={24} xl={24}>
        <Card sx={{ minHeight: '8vw' }}>
          <CardHeader
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='h5' component='div' style={{ flexGrow: 1 }}>
                  Monthly Dataset Creation Overview
                </Typography>
              </div>
            }
            action={
              <>
                <Button
                  variant='outlined'
                  id='basic-button'
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  endIcon={<DateRangeOutlinedIcon />}
                >
                  {selectedYears ? ` Last ${selectedYears} years` : ' All time'}
                </Button>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => selectYearsFilter(null)}>All time</MenuItem>
                  <MenuItem onClick={() => selectYearsFilter(3)}>Last 3 years</MenuItem>
                  <MenuItem onClick={() => selectYearsFilter(10)}>Last 10 years</MenuItem>
                </Menu>
              </>
            }
          />

          <DatasetCreationOverview selectedYears={selectedYears} />
        </Card>
      </Grid>
      <Grid item xs={24} sm={24} md={24} lg={24} xl={24}>
        <Grid container spacing={2}>
          <Grid item xs={24} sm={24} md={4} lg={4} xl={4}>
            <Card sx={{ minHeight: '8vw' }}>
              <CardHeader title='Dataset Publication Status' />
              <DatasetStatusOverview />
            </Card>
          </Grid>
          <Grid item xs={24} sm={24} md={4} lg={4} xl={4}>
            <Card sx={{ minHeight: '8vw' }}>
              <CardHeader title='Dataset Monthly Downloads' />
              <DatasetStatusOverview />
            </Card>
          </Grid>
          <Grid item xs={24} sm={24} md={4} lg={4} xl={4}>
            <Card sx={{ minHeight: '8vw' }}>
              <CardHeader title='Dataset Monthly' />
              <DatasetStatusOverview />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
