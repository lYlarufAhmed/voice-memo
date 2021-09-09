import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {List, Paper, Typography, useScrollTrigger} from "@material-ui/core";
import RecorderBar from "./RecorderBar";
import {useReactMediaRecorder} from "react-media-recorder";
import Track from "./Track";

const formattedDateTime = () => {
    let currentDateObj = new Date()
    return `${currentDateObj.getMonth()}-${currentDateObj.getDate()}-${currentDateObj.getFullYear()}_${currentDateObj.getHours().toString().padStart(2, '0')}:${currentDateObj.getMinutes().toString().padStart(2, '0')}`
}

function ElevationScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles((theme) => ({
    hide: {
        display: 'none',
    },
    // Paper
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },


}));
let milliSecElapsed = 0

export default function App() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    let [tracks, setTracks] = React.useState({
        'test_track': {url: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'}
    })
    let [paused, setPaused] = React.useState(false)
    let [durationMilliSec, setDurationMilliSec] = React.useState(milliSecElapsed)

    const recordingName = `New_Idea_${Object.entries(tracks).length + 1}_${formattedDateTime()}`
    const {
        status,
        startRecording,
        pauseRecording,
        stopRecording,
        resumeRecording,
        // mediaBlobUrl,
    } = useReactMediaRecorder(
        {
            audio: true, onStop: (blobUrl) => setTracks(prevState => {
                console.log(blobUrl, prevState)
                // console.log('pushed', prevState)
                prevState[recordingName] = {
                    url: blobUrl
                }
                return JSON.parse(JSON.stringify(prevState))
            })
        });

    const deleteTrack = (title) => {
        setTracks(prevState => {
            delete prevState[title]
            return JSON.parse(JSON.stringify(prevState))
        })
    }

    const handleDrawerOpen = () => {
        setOpen(true);
        startRecording()
    };

    const handleDrawerClose = () => {
        setOpen(false);
        stopRecording()
        setPaused(false)
    };
    const handlePause = async () => {
        try {
            await pauseRecording()
            setPaused(true)
            milliSecElapsed = durationMilliSec
        } catch (e) {
            console.log(e.message)
        }

    }
    const handleResume = async () => {
        try {
            await resumeRecording()
            setPaused(false)
            setDurationMilliSec(milliSecElapsed)
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div
            // className={classes.root}
        >

            <CssBaseline/>
            <Paper square classeName={classes.paper}>

                {/*{status}*/}
                <ElevationScroll>
                    <RecorderBar open={open} status={status}
                                 handleDrawerClose={handleDrawerClose}
                                 paused={paused}
                                 handleDrawerOpen={handleDrawerOpen}
                                 pauseRecording={handlePause}
                                 resumeRecording={handleResume}
                                 durationMilliSec={durationMilliSec}
                                 setDurationMilliSec={setDurationMilliSec}
                                 recordingName={recordingName}
                    />
                </ElevationScroll>

                <List className={classes.list}>
                    {Object.entries(tracks).map(
                        ([title, {url}], i) => <Track url={url} title={title}
                                                      key={title}
                                                      count={i}
                                                      handleDelete={deleteTrack}
                        />)}
                    {!Object.entries( tracks ).length && <Typography variant={'h4'} align={'center'}>No items</Typography>}
                </List>
            </Paper>
        </div>
    );
}
