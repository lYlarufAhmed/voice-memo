import React from "react";
import {Typography, Container} from "@material-ui/core";
import Recorder from "./Recorder";



const getTimeComponents = (milliSec) => {
    let newMilliSec = milliSec % 100
    let sec = Math.floor(milliSec / 100)
    let min = Math.floor(sec / 60)
    sec %= 60
    return [min, sec, newMilliSec]
}

export default function RecordingDashboard({paused, open, durationMilliSec, setDurationMilliSec, recordingName}) {
    // let [durationMilliSec, setDurationMilliSec] = React.useState(0)
    React.useEffect(() => {
        let intervalHandler = setInterval(
            () => !paused && setDurationMilliSec(prev => !paused && prev + 1), 10
        )
        return () => clearInterval(intervalHandler)
    }, [paused, setDurationMilliSec])
    return (
        <Container maxWidth={'sm'} style={{'textAlign': 'center'}}>
            <Typography variant={'h6'} color={'textPrimary'} gutterBottom>
                {recordingName}
            </Typography>
            <Typography variant={'h1'} color={'textPrimary'}>
                {getTimeComponents(durationMilliSec)
                    .map(c => c.toString().padStart(2, '0'))
                    .join(':')}
                {/*<Recorder open={open} paused={paused}/>*/}
            </Typography>
        </Container>
    )
}