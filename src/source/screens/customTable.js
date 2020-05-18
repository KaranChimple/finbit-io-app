import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const CustomizedTables = ({list}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="left">Cloudiness Percentage</StyledTableCell>
            <StyledTableCell align="left">Details&nbsp;</StyledTableCell>
            <StyledTableCell align="left">Weather Details&nbsp;</StyledTableCell>
            <StyledTableCell align="left">Wind Details&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <StyledTableRow key={row.dt_txt}>
              <StyledTableCell component="th" scope="row">
                {row.dt_txt}
              </StyledTableCell>
              <StyledTableCell align="left">{row.clouds.all}%</StyledTableCell>
              <StyledTableCell align="left">
                <div>
                  <p>Actual Temperature: {row.main.temp} Kelvin</p>
                  <p>Feel Like Temperature: {row.main.feels_like} Kelvin</p>
                  <p>Atm pressure on the ground level: {row.main.grnd_level} hPa</p>
                  <p>Humidity: {row.main.humidity}%</p>
                  <p>Min temp: {row.main.temp_min} Kelvin</p>
                  <p>Max temp: {row.main.temp_max} Kelvin</p>
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.weather.map((element) => (
                  <div key={element.description}>
                    <p>Weather Description: {element.description}</p>
                    <p>Weather Parameter: {element.main}</p>
                  </div>
                ))}
              </StyledTableCell>
              <StyledTableCell align="left">
                <div>
                  <p>Wind Direction: {row.wind.deg} degrees</p>
                  <p>Wind Speed: {row.wind.speed} meter/sec</p>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTables;
