import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { IconButton } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip'

import moment from 'moment'
import MomentUtils from '@date-io/moment'
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'

function AddTraining(props) {

    const [open, setOpen] = useState(false)
    const [newDate, setDate] = useState(new Date())
    const [training, setTraining] = useState({
        date: newDate,
        activity: '',
        duration: 0,
        customer: props.params.data.links[0].href
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setTraining({
            activity: '',
            duration: 0,
        })
    }

    const handleSave = () => {
        props.addTraining(training)
        handleClose()
    }
    
    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }
    
    const dateChanged = (newDate) => {
        setDate(newDate)
        console.log(newDate) 
        setDate(moment(newDate).toISOString())
        setTraining({...training, date: newDate})   
    }

    return (
        <div>
            <Tooltip title = 'Add a training to customer'>
                <IconButton color = 'primary' aria-label = 'add-training' onClick = {handleClickOpen}>
                    <AddCircleOutlineOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Dialog open = {open} onClose = {handleClose}>
                <DialogTitle>New training for {props.params.data.firstname} {props.params.data.lastname}</DialogTitle>
                <DialogContent>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker 
                        autoOk = {true}
                        value = {newDate} 
                        onChange = {newDate => dateChanged(newDate)} 
                        ampm = {false}
                        showTodayButton
                    />
                </MuiPickersUtilsProvider>
                <TextField
                    margin = "dense"
                    type = 'text'
                    label = "Activity"
                    name = 'activity'
                    value = {training.activity}
                    onChange = {inputChanged}
                    fullWidth
                    select
                >
                    <MenuItem value="Gym training">Gym Training</MenuItem>
                    <MenuItem value="Running">Running</MenuItem>
                    <MenuItem value="Spinning">Spinning</MenuItem>
                    <MenuItem value="Cycling">Cycling</MenuItem>
                    <MenuItem value="Walking">Walking</MenuItem>
                    <MenuItem value="Swimming">Swimming</MenuItem>
                    <MenuItem value="Cardio">Cardio</MenuItem>
                    <MenuItem value="Yoga">Yoga</MenuItem>
                </TextField>
                <TextField
                    margin = "dense"
                    type = 'int'
                    label = "Duration"
                    name = 'duration'
                    value = {training.duration}
                    onChange = {inputChanged}
                    fullWidth
                    select
                    >
                    <MenuItem value='15'>15 min</MenuItem>
                    <MenuItem value='30'>30 min</MenuItem>
                    <MenuItem value='45'>45 min</MenuItem>
                    <MenuItem value='60'>1 hour</MenuItem>
                    <MenuItem value='75'>75 min</MenuItem>
                    <MenuItem value='90'>1,5 hours</MenuItem>
                    <MenuItem value='120'>2 hours</MenuItem>
                </TextField>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="default">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddTraining