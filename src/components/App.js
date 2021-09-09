import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Box, List, Paper, Typography, useScrollTrigger} from "@material-ui/core";
import {useReactMediaRecorder} from "react-media-recorder";
import Track from "./Track";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import RecorderContainer from "./RecorderContainer";

const formattedDateTime = () => {
    let currentDateObj = new Date()
    return `${currentDateObj.getMonth()}-${currentDateObj.getDate()}-${currentDateObj.getFullYear()}_${currentDateObj.getHours().toString().padStart(2, '0')}:${currentDateObj.getMinutes().toString().padStart(2, '0')}`
}

function ElevationScroll(props) {
    const {children, window} = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const openDrawer = (status, paused) => status === 'recording' || paused
const drawerHeight = 300;
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
        paddingBottom: 70,
        position: 'relative'
    },

    appBar: {
        transition: theme.transitions.create(['margin', 'height'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        bottom: 0,
        top: 'auto',
        alignItems: 'center',
        backgroundColor: 'white',

    },
    appBarShift: {
        height: drawerHeight,
        transition: theme.transitions.create(['margin', 'height'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    overlay: {
        height: '100%',
        backgroundColor: 'black',
        padding: '4rem',
        position: 'absolute',
        width: '100%',
        top: 0,
        display: 'none',
        opacity: '.4'
    },
    overlayShow: {
        display: 'block'
    }

}));
let milliSecElapsed = 0

export default function App() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    let [tracks, setTracks] = React.useState({
        'test_track': {url: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'},
        'test_track_1': {url: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'},
        'test_track_2': {url: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'},
        'test_track_3': {url: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'},
        'test_track_4': {url: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'},
        'test_track_5': {url: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'},
        'test_track_6': {url: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'},
        'test_track_7': {url: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'},
        'test_track_8': {url: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'},
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
        setDurationMilliSec(0)
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

    // const handleCloseDialogue=() => setOpenDialogue(false)

    return (
        <div
        >

            <CssBaseline/>
            <Paper square classeName={classes.paper}>

                <ElevationScroll>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <RecorderContainer open={open} paused={paused}
                                           handleDrawerOpen={handleDrawerOpen}
                                           handleDrawerClose={handleDrawerClose}
                                           pauseRecording={handlePause}
                                           recordingName={recordingName}
                                           durationMilliSec={durationMilliSec}
                                           setDurationMilliSec={setDurationMilliSec}
                                           resumeRecording={handleResume}
                                           isDrawerOpen={openDrawer(status, paused)}
                        />
                    </AppBar>
                </ElevationScroll>

                <List className={classes.list}>
                    {Object.entries(tracks).map(
                        ([title, {url}], i) => <Track url={url} title={title}
                                                      key={title}
                                                      count={i}
                                                      handleDelete={deleteTrack}
                        />)}
                    {!Object.entries(tracks).length &&
                    <Typography variant={'h4'} align={'center'}>No items</Typography>}
                    {/* TODO: overlay should only be in mobile view*/}
                    <Box className={clsx(classes.overlay, {
                        [classes.overlayShow]: open,
                    })}/>
                </List>

            </Paper>
        </div>
    );
}
