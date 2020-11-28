import React, { useState, useEffect } from 'react';
import { CircularProgress, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import clsx from 'clsx';

const useStyles = makeStyles({
  registerInput: {
    width: "50px",
    '& input': {
      textAlign: "center",
      caretColor: "transparent"
    }
  },
  green: {
    backgroundColor: "#c8e6c9"
  },
  blue: {
    backgroundColor: "#b3e5fc"
  },
  yellow: {
    backgroundColor: "#fff9c4"
  },
  orange: {
    backgroundColor: "#ffe0b2"
  },
  red: {
    backgroundColor: "#ffcdd2"
  },
  grey: {
    backgroundColor: "#e0e0e0"
  }
});

function RegisterInput(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    color: "white"
  });

  const changeHandler = (e) => {
    const validCodes = /[\\\/bcdefghijlmnoprstuvwxyzBCDEFGHIJLMNOPRSTUVWXYZ#]/;
    const greenCodes = /[\\\/]/;
    const blueCodes = /[PSVW]/;
    const yellowCodes = /[LU]/;
    const orangeCodes = /[BCDEFHIJMRT]/;
    const redCodes = /[GNO]/;
    const greyCodes = /[XYZ#]/;

    if (e.nativeEvent.data && validCodes.test(e.nativeEvent.data) === true) {
      e.target.value = e.nativeEvent.data.toUpperCase();
      const i = e.nativeEvent.path[3].cellIndex;
      const nextRow = e.nativeEvent.path[4].nextSibling;
      
      if (greenCodes.test(e.target.value)) {
        setState({...state, color: "green" });
      }
      else if (blueCodes.test(e.target.value)) {
        setState({...state, color: "blue" });
      }
      else if (yellowCodes.test(e.target.value)) {
        setState({...state, color: "yellow" });
      }
      else if (orangeCodes.test(e.target.value)) {
        setState({...state, color: "orange" });
      }
      else if (redCodes.test(e.target.value)) {
        setState({...state, color: "red" });
      }
      else if (greyCodes.test(e.target.value)) {
        setState({...state, color: "grey" });
      }      

      if (nextRow) {
        const element = nextRow.cells[i].firstChild.firstChild.firstChild;
        element.focus();
      }
    }
    else {
      e.target.value = "-";
    }
  }

  const keyHandler = (e) => {
    const i = e.nativeEvent.path[3].cellIndex;
    switch (e.key) {
      case "ArrowDown":
        const nextRow = e.nativeEvent.path[4].nextSibling;
        if (nextRow) {
          const element = nextRow.cells[i].firstChild.firstChild.firstChild;
          element.focus();
        }
        break;
      case "ArrowUp":
        const lastRow = e.nativeEvent.path[4].previousSibling;
        if (lastRow) {
          const element = lastRow.cells[i].firstChild.firstChild.firstChild;
          element.focus();
        }
        break;
      case "ArrowRight":
        if (i < 5) {
          const element = e.nativeEvent.path[3].nextSibling.firstChild.firstChild.firstChild;
          element.focus();
        }
        break;
      case "ArrowLeft":
        if (i > 1) {
          const element = e.nativeEvent.path[3].previousSibling.firstChild.firstChild.firstChild;
          element.focus();
        }
        break;
    }
  }

  return (
    <TextField id={props.id} className={clsx({
      [classes.registerInput]: true, 
      [classes.green]: (state.color == "green"),
      [classes.blue]: (state.color == "blue"),
      [classes.yellow]: (state.color == "yellow"),
      [classes.orange]: (state.color == "orange"),
      [classes.red]: (state.color == "red"),
      [classes.grey]: (state.color == "grey")
    })
    } variant="outlined" size="small" defaultValue="-" onChange={changeHandler} onKeyDown={keyHandler} />
  );
}

function Entry(props) {
  return (
    <tr>
      <td>{props.lastName}, {props.firstName}</td>
      <td><RegisterInput id={props.id + "-1"} /></td>
      <td><RegisterInput id={props.id + "-2"} /></td>
      <td><RegisterInput id={props.id + "-3"} /></td>
      <td><RegisterInput id={props.id + "-4"} /></td>
      <td><RegisterInput id={props.id + "-5"} /></td>
    </tr>
  );
}

function TakeRegister() {
  const [state, setState] = useState({
    loading: true,
    students: []
  });

  useEffect(() => {
    axios.get("/api/data/").then(res => {
      setState({...state, loading: false, students: res.data});
    });
  }, []);

  if (state.loading) {
    return <CircularProgress />
  }

  return (
    <div className="TakeRegister">
      <table>
        <thead>
          <th>Name</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
        </thead>
        <tbody>
          { 
            state.students.map((student) => (
              <Entry key={student.id} id={student.id} firstName={student.firstName} lastName={student.lastName} />
            )) 
          }
        </tbody>
      </table>
    </div>
  );
}

export default TakeRegister;