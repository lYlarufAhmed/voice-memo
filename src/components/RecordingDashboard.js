import React from "react";
import {Typography} from "@material-ui/core";
import Recorder from "./Recorder";

const formattedDateTime = () => {
    let currentDateObj = new Date()
    return `${currentDateObj.getMonth()}-${currentDateObj.getDate()}-${currentDateObj.getFullYear()}_${currentDateObj.getHours()}:${currentDateObj.getMinutes()}`
}

const getTimeComponents = (milliSec) => {
    let newMilliSec = milliSec % 100
    let sec = Math.floor(milliSec / 100)
    let min = Math.floor(sec / 60)
    return [min, sec, newMilliSec]
}

export default function RecordingDashboard({paused, open, durationMilliSec, setDurationMilliSec, count}) {
    // let [durationMilliSec, setDurationMilliSec] = React.useState(0)
    React.useEffect(() => {
        let intervalHandler = setInterval(
            () => !paused && setDurationMilliSec(prev => !paused && prev + 1), 10
        )
        return () => clearInterval(intervalHandler)
    }, [paused, setDurationMilliSec])
    const recordingName = `New Idea_${count+1}_${formattedDateTime()}`
    return (
        <React.Fragment>
            <Typography variant={'h6'} color={'textPrimary'} gutterBottom>
                {recordingName}
            </Typography>
            <Typography variant={'subtitle2'} color={'textPrimary'}>
                {getTimeComponents(durationMilliSec)
                    .map(c => c.toString().padStart(2, '0'))
                    .join(':')}
                <Recorder open={open} paused={paused}/>
            </Typography>
        </React.Fragment>
    )
}