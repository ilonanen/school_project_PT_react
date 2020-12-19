import React from 'react'
import { useState, useEffect } from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import moment from 'moment'
import { Dialog, DialogActions, DialogTitle, DialogContent, Button } from '@material-ui/core'


function Calendar() {
    const [trainings, setTrainings] = useState([])
        
    useEffect(() => {
        getTrainings()        
    }, [])
    
    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then (response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }
    
    const events = trainings.map(training => {
            return {
                title: training.activity + ' (' + training.duration + ' min)',
                description: training.customer.firstname + ' ' + training.customer.lastname,
                start: training.date,
                end: moment(training.date).add(training.duration, 'm')
            }
        })


    const [open, setOpen] = React.useState(false)
    const [dialogTitle, setdialogTitle] = React.useState('')
    const [popContent, setPopContent] = React.useState('')
    const [line2, setLine2] = React.useState('')

    const handleEventClick = (event) => {
      setPopContent(moment(event.event._instance.range.start).format('DD.MM.YYYY HH.mm'))
      setLine2(event.event._def.title + ', ' + event.event._def.extendedProps.description)
      setdialogTitle(event.event._def.title)
      console.log(event.event)
      setOpen(true)
    };
  
    const handleClose = () => {
      setOpen(false)
    };
  
    return (
        <div>
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView = "dayGridMonth"
            slotMinTime = '06:00:00'
            slotLabelFormat = {{
                hour: '2-digit',
                minute: '2-digit',
                meridiem: false,
                hour12: false
            }}
            events = {events}
            eventTimeFormat = {{
                hour: '2-digit',
                minute: '2-digit',
                meridiem: false,
                hour12: false
            }}
            eventClick = {handleEventClick}

            />

            <Dialog
                open = {open}
                onClose = {handleClose}
            >
                <DialogTitle>
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <div>{popContent}</div>
                    <div>{line2}</div>
                </DialogContent>
                <DialogActions>
                    <Button onClick = {handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Calendar