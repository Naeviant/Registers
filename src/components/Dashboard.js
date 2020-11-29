import React, { useState, useEffect } from 'react';
import { CircularProgress, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import clsx from 'clsx';

const useStyles = makeStyles({
  timetable: {
    width: "calc(100% - 1px)",
    overflowX: "hidden",
    position: "absolute",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  timetableCell: {
    width: "calc(20% - 10px)",
    borderRight: "1px dotted grey",
    borderLeft: "1px dotted grey"
  },
  timetableTime: {
    textAlign: "center",
    height: "10%",
    borderLeft: "1px dotted grey"
  },
  top: {
    borderTop: "1px dotted grey"
  },
  lesson: {
    background: "green",
    textAlign: "center",
    border: "1px solid black",
    cursor: "pointer"
  },
});

function TimeTableCell(props) {
  const classes = useStyles();
  
  var found = false,
      i = 0;
  return props.lessons.map(lesson => {
    i += 1;
    if (lesson.time.startTime == parseInt(props.timestamp) && lesson.time.day == parseInt(props.day)) {
      found = true;
      return (
        <td id={lesson._id} key={lesson._id} rowSpan={(lesson.time.endTime - lesson.time.startTime) / 5} className={clsx(classes.lesson, classes.timetableCell)}>
          <strong>{lesson.name}</strong>
          <br />
          <span>{Math.floor(lesson.time.startTime / 60)}:{lesson.time.startTime % 60} - {Math.floor(lesson.time.endTime / 60)}:{lesson.time.endTime % 60}</span>
        </td>
      );
    }
    else if (lesson.time.startTime < parseInt(props.timestamp) && lesson.time.endTime > parseInt(props.timestamp) && lesson.time.day == parseInt(props.day)) {
      found = true;
      return (<></>);
    }
    if (props.lessons.length === i && !found) {
      return (
        <td className={classes.timetableCell}></td>
      )
    }
  });
}

function TimeTableSmallRow(props) {
  const classes = useStyles();

  return (
    <tr className=
      {
        props.time ? classes.top : ""
      }
    >
      {
        props.time ? <td className={classes.timetableTime} rowSpan="12">{props.time}</td> : <></>
      }
      <TimeTableCell day="0" lessons={props.lessons} timestamp={props.timestamp} />
      <TimeTableCell day="1" lessons={props.lessons} timestamp={props.timestamp} />
      <TimeTableCell day="2" lessons={props.lessons} timestamp={props.timestamp} />
      <TimeTableCell day="3" lessons={props.lessons} timestamp={props.timestamp} />
      <TimeTableCell day="4" lessons={props.lessons} timestamp={props.timestamp} />
    </tr>
  );
}

function TimeTableRow(props) {
  return (
    <>
    <TimeTableSmallRow lessons={props.lessons} timestamp={parseInt(props.timestamp)} time={props.time} />
    <TimeTableSmallRow lessons={props.lessons} timestamp={parseInt(props.timestamp) + 5} />
    <TimeTableSmallRow lessons={props.lessons} timestamp={parseInt(props.timestamp) + 10} />
    <TimeTableSmallRow lessons={props.lessons} timestamp={parseInt(props.timestamp) + 15} />
    <TimeTableSmallRow lessons={props.lessons} timestamp={parseInt(props.timestamp) + 20} />
    <TimeTableSmallRow lessons={props.lessons} timestamp={parseInt(props.timestamp) + 25} />
    <TimeTableSmallRow lessons={props.lessons} timestamp={parseInt(props.timestamp) + 30} />
    <TimeTableSmallRow lessons={props.lessons} timestamp={parseInt(props.timestamp) + 35} />
    <TimeTableSmallRow lessons={props.lessons} timestamp={parseInt(props.timestamp) + 40} />
    <TimeTableSmallRow lessons={props.lessons} timestamp={parseInt(props.timestamp) + 45 } />
    <TimeTableSmallRow lessons={props.lessons} timestamp={parseInt(props.timestamp) + 50 } />
    <TimeTableSmallRow lessons={props.lessons} timestamp={parseInt(props.timestamp) + 55 } />
    </>
  );
}

function Dashboard() {
  const classes = useStyles();

  const [state, setState] = useState({
    lessons: [],
    loading: true
  });

  useEffect(() => {
    axios.get("/api/dashboard/").then(res => {
      setState({...state, lessons: res.data, loading: false })
    });
  }, []);

  if (state.loading) {
    return <CircularProgress />
  }

  return (
    <div className="Dashboard">
      <table className={classes.timetable}>
        <thead>
        <tr>
            <th></th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
        </tr>
        </thead>
        <tbody>
          <TimeTableRow lessons={state.lessons} time="8am" timestamp="480" />
          <TimeTableRow lessons={state.lessons} time="9am" timestamp="540" />
          <TimeTableRow lessons={state.lessons} time="10am" timestamp="600" />
          <TimeTableRow lessons={state.lessons} time="11am" timestamp="660" />
          <TimeTableRow lessons={state.lessons} time="12pm" timestamp="720" />
          <TimeTableRow lessons={state.lessons} time="1pm" timestamp="780" />
          <TimeTableRow lessons={state.lessons} time="2pm" timestamp="840" />
          <TimeTableRow lessons={state.lessons} time="3pm" timestamp="900" />
          <TimeTableRow lessons={state.lessons} time="4pm" timestamp="960" />
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;