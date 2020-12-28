import React from 'react'
import { useState, useEffect } from 'react'
import { groupBy, sumBy, map, Object, Array } from 'lodash'


function Charts() {
    const [trainings, setTrainings] = useState([])
    // const [activities, setActivities] = useState([])
    
    useEffect(() => {
        getTrainings()
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then (response => response.json())
        .then (data => setTrainings(data))
        .catch (err => console.error(err))
    }
        

    
    var activities = groupBy(trainings, 'activity')
    console.log(activities)

    var sums = map(activities, (value, key) => ({
        activity: key, totalamount: sumBy(value, 'duration')
    }))
    
    console.log(sums)

    return (
        <div>
           
        </div>
    )

}

export default Charts