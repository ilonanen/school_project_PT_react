import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { groupBy, sumBy, map, orderBy } from 'lodash'
import { BarChart, XAxis, YAxis, CartesianGrid, Bar, Tooltip, ResponsiveContainer } from 'recharts'


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

    const activities = useMemo(() => 
        orderBy
            (map
                (groupBy(trainings, 'activity'), (value, key) => (
                    {
                        activity: key, minutes: sumBy(value, 'duration')
                    }
                )
            ), 'minutes', 'desc'), 
        [trainings]
    )
    
    console.log(activities)

    
    return (
        <div>
            <ResponsiveContainer width = '75%' height = {600}>
                <BarChart
                    data = {activities}
                    margin = {{ top: 20, left: 10, right: 10, bottom: 10 }}
                >
                    <XAxis dataKey = "activity" />
                    <YAxis 
                        dataKey = "minutes" 
                        unit = ' min'
                        ticks = {[30, 60, 90, 120, 150, 180, 210, 240]}
                        type = 'number'
                    />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" strokeDasharray = '5 5' />
                    <Bar dataKey="minutes" fill="#ba000d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )

}

export default Charts