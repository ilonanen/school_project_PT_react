import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { IconButton } from '@material-ui/core'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import Tooltip from '@material-ui/core/Tooltip'

function EditCustomer(props) {

    const [open, setOpen] = useState(false)
    const [customer, setCustomer] = useState({
        lastname: '',
        firstname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    })

    const handleClickOpen = () => {
        setCustomer({
            lastname: props.params.data.lastname,
            firstname: props.params.data.firstname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone: props.params.data.phone
        })
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setCustomer({
            lastname: '',
            firstname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''
        })
    }

    const handleSave = () => {
        props.editCustomer(props.params.data.links[0].href, customer)
        handleClose()
    }

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <Tooltip title = 'Edit customer'>
                <IconButton color = 'default' aria-label = 'edit-customer' onClick = {handleClickOpen}>
                    <EditOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Dialog open = {open} onClose = {handleClose}>
                <DialogTitle>Edit customer</DialogTitle>
                <DialogContent>
                <TextField
                    margin = "dense"
                    label = "First name"
                    name = 'firstname'
                    value = {customer.firstname}
                    onChange = {inputChanged}
                    fullWidth
                />
                <TextField
                    margin = "dense"
                    label = "Last name"
                    name = 'lastname'
                    value = {customer.lastname}
                    onChange = {inputChanged}
                    fullWidth
                />
                <TextField
                    margin = "dense"
                    label = "Address"
                    name = 'streetaddress'
                    value = {customer.streetaddress}
                    onChange = {inputChanged}
                    fullWidth
                />
                <TextField
                    margin = "dense"
                    label = "Post code"
                    name = 'postcode'
                    value = {customer.postcode}
                    onChange = {inputChanged}
                    fullWidth
                />
                <TextField
                    margin = "dense"
                    label = "City"
                    name = 'city'
                    value = {customer.city}
                    onChange = {inputChanged}
                    fullWidth
                />
                <TextField
                    margin = "dense"
                    label = "E-mail"
                    name = 'email'
                    value = {customer.email}
                    onChange = {inputChanged}
                    fullWidth
                />
                <TextField
                    margin = "dense"
                    label = "Phone number"
                    name = 'phone'
                    value = {customer.phone}
                    onChange = {inputChanged}
                    fullWidth
                />
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

export default EditCustomer