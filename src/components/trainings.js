import React, { useState, useEffect } from 'react'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

import { IconButton } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import Tooltip from '@material-ui/core/Tooltip'

import moment from 'moment'

function Trainings() {
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

    const deleteTraining = (params) => {
        if (window.confirm('Delete training?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + params.value, 
            {
                method: 'DELETE'
            })
            .then (_ => getTrainings())
            .catch(err => console.error(err))
        }
    }

    const columns = [
        {
            headerName: 'Date and time',
            valueGetter: params => {
                return moment(params.data.date).format("DD.MM.YYYY HH:mm")
            },
            suppressSizeToFit: false,
            sortable: true,
            filter: true,
            sort: 'desc'
        },
        {field: 'activity', width: 160, sortable: true, suppressSizeToFit: false, filter: true},
        {field: 'duration', width: 160, sortable: true, suppressSizeToFit: false, filter: true},
        {
            headerName: 'Customer', 
            valueGetter: params => {
                return params.data.customer.lastname + ' ' + params.data.customer.firstname
            },
            suppressSizeToFit: false,
            sortable: true,
            filter: true
        },
        {
            headerName: '',
            field: 'id',
            suppressSizeToFit: false,
            cellRendererFramework: params =>
                <Tooltip title = "Delete training">
                    <IconButton color = 'secondary' onClick = {() => deleteTraining(params)}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Tooltip>
        }
    ]

    return (
        <div>
            <div>
                <h1>Trainings</h1>
            </div>
            <div className = 'ag-theme-material' style = {{height: 640, width: '75%', margin: 'auto'}}>
                <AgGridReact
                    rowData = {trainings}
                    columnDefs = {columns}
                    pagination = 'true'
                    paginationAutoPageSize = 'true'
                    resizable = 'true'
                    sizeColumnsToFit
                    autoSizeAllColumns
                    skipHeaderOnAutoSize
                    >
                </AgGridReact>
            </div>
        </div>
    )
}

export default Trainings