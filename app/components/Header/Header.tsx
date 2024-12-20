import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@react-google-maps/api';
import useStyles from './styles';

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" dir="rtl">
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' className={classes.title}>
          وجهتي
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant='h6' className={classes.title}>
            اكتشف اماكن جديدة
          </Typography>
          {/* <Autocomplete> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase 
              placeholder='بحث...' 
              classes={{ root: classes.inputRoot, input: classes.inputInput }} 
              dir="rtl" // RTL for input direction
            />
          </div>
          {/* </Autocomplete> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;