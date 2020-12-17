import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

import { IconButton } from '@material-ui/core'
import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined'
import Tooltip from '@material-ui/core/Tooltip'

import moment from 'moment'

function ShowTrainings(props) {

    const [open, setOpen] = useState(false)
    const [trainings, setTrainings] = useState([])

    const url = props.params.data.links[2].href


    const handleClickOpen = () => {
        getTrainings()
        console.log(trainings)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const getTrainings = () => {
        fetch(url)
        .then (response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        {
            headerName: 'Date and time',
            valueGetter: params => {
                return moment(params.data.date).format("DD.MM.YYYY HH:mm")
            },
            sort: 'desc'
        },
        {field: 'activity'},
        {field: 'duration'}
    ]

    return (
        <div>
            <Tooltip title = "Show customer's trainings">
                <IconButton color = 'default' aria-label = 'show-trainings' onClick = {handleClickOpen}>
                    <DirectionsRunOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Dialog open = {open} onClose = {handleClose} maxWidth = 'sm' fullWidth>
                <DialogTitle>Trainings for {props.params.data.firstname} {props.params.data.lastname}</DialogTitle>
                <DialogContent>
                    <div className = 'ag-theme-material' style = {{height: 300, width: '100%', margin: 'auto'}}>
                        <AgGridReact
                            rowData = {trainings}
                            columnDefs = {columns}>
                        </AgGridReact>
                    </div>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    close
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ShowTrainings