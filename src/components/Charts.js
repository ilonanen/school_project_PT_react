import React from 'react'
import { useState, useEffect } from 'react'
import { groupBy, sumBy, Object, Array } from 'lodash'


function Charts() {
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

    const activities = trainings.map(training => {
        return {
            activity: training.activity,
            duration: training.duration
        }
    })

    console.log(activities)

    const groups = groupBy(activities, 'activity')
    console.log(groups)


    return (
        <div>
           
        </div>
    )

}

export default Charts