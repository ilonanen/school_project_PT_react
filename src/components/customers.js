import React, { useState, useEffect } from 'react'

import { IconButton } from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import Tooltip from '@material-ui/core/Tooltip'

import AddCustomer from './AddCustomer'
import AddTraining from './AddTraining'
import EditCustomer from './EditCustomer'
import ShowTrainings from './ShowTrainings'



function Customers() {
    const [customers, setCustomers] = useState([])
    
    useEffect(() => {
        getCustomers()
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then (response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (params) => {
        if (window.confirm('Delete customer and all their trainings?')) {
            fetch(params.value[0].href, {
                method: 'DELETE'
            })
            .then (_ => fetch(params.value[2].href, {
                method: 'DELETE'
            }))
            .then (_ => getCustomers())
            .catch(err => console.error(err))
        }
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        .then (_ => getCustomers())
        .catch (err => console.error(err))
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        })
        .then (_ => getCustomers())
        .catch (err => console.error(err))
    }

    const editCustomer = (link, editedCustomer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(editedCustomer)
        })
        .then (_ => getCustomers())
        .catch (err => console.error(err))
    }

    const columns = [
        {
            headerName: '',
            field: 'data',
            width: 60,
            cellRendererFramework: params => <AddTraining addTraining = {addTraining} params = {params} />
        },
        {
            headerName: '',
            field: 'data',
            width: 60,
            cellRendererFramework: params => <EditCustomer editCustomer = {editCustomer} params = {params} />
        },
        {
            headerName: '',
            field: 'links',
            width: 60,
            cellRendererFramework: params =>
            <Tooltip title = 'Delete customer'>
                    <IconButton color = 'secondary' onClick = {() => deleteCustomer(params)}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Tooltip>
        },
        {
            headerName: '',
            field: 'data',
            width: 60,
            cellRendererFramework: params => <ShowTrainings params = {params} />
        },
        {headerName: 'Last name', field: 'lastname', width: 160, sortable: true, sort: 'asc', filter: true, suppressSizeToFit: false},
        {headerName: 'First Name', field: 'firstname', width: 160, sortable: true, filter: true, suppressSizeToFit: false},
        {field: 'email', sortable: true, filter: true, suppressSizeToFit: false},
        {field: 'phone', sortable: true, filter: true, suppressSizeToFit: false},
        {headerName: 'Address', field: 'streetaddress', sortable: true, filter: true, suppressSizeToFit: false},
        {headerName: 'Zip', field: 'postcode', width: 120, sortable: true, filter: true, suppressSizeToFit: false},
        {field: 'city', width: 120, sortable: true, filter: true, suppressSizeToFit: false}
    ]

    return (
        <div>
            <h1>Customers</h1>
            <div className = 'ag-theme-material' style = {{height: 600, width: '95%', margin: 'auto'}}>
                <AgGridReact
                    rowData = {customers}
                    columnDefs = {columns}
                    pagination = 'true'
                    paginationAutoPageSize = 'true'
                    resizable = 'true'
                    sizeColumnsToFit
                    skipHeaderOnAutoSize
                    autoSizeAllColumns
                    >
                </AgGridReact>
            </div>
            <AddCustomer addCustomer = {addCustomer} />
        </div>
    )
}

export default Customers