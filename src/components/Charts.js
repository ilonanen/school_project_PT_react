import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { groupBy, sumBy, map } from 'lodash'
import { BarChart, XAxis, YAxis, CartesianGrid, Bar, Tooltip } from 'recharts'


function Charts() {
    const [trainings, setTrainings] = useState([])
    
    useEffect(() => {
        getTrainings()
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then (response => response.json())
        .then (data => setTrainings(data))
        .catch (err => console.error(err))
    }

    const activities = useMemo(() => map(groupBy(trainings, 'activity'), (value, key) => ({
        activity: key, minutes: sumBy(value, 'duration')
    })), [trainings]
    )
    
    console.log(activities)

    
    return (
        <div style = {{margin: 'auto'}}>
           <BarChart
                width = {800}
                height = {600}
                data = {activities}
                margin = {10}
            >
                <XAxis dataKey="activity" />
                <YAxis dataKey="minutes" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" strokeDasharray = '2 2' />
                
                <Bar dataKey="minutes" fill="#5555FF" />

            </BarChart>
        </div>
    )

}

export default Charts