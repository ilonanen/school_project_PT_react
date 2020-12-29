import './App.css';
import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Customers from './components/customers'
import Trainings from './components/trainings'
import Calendar from './components/Calendar'
import Charts from './components/Charts'

function App() {
  const  [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <AppBar position = 'static' color = 'primary'>
          <Tabs value = {value} onChange = {handleChange} centered>
            <Tab label = "Calendar" to = "/calendar" component = {Link} />
            <Tab label = "Customers" to = "/customers" component = {Link} />
            <Tab label = "Trainings" to = "/trainings" component = {Link} />
            <Tab label = "Statistics" to = "/stats" component = {Link} />
          </Tabs>
        </AppBar>
        <Switch>
          <Route exact path = "/school_project_PT_react" component = {Calendar}></Route>
          <Route path = "/calendar" component = {Calendar} />
          <Route path = "/customers" component = {Customers} />
          <Route path = "/trainings" component = {Trainings} />
          <Route path = "/stats" component = {Charts} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
