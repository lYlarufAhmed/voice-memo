import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useScrollTrigger} from "@material-ui/core";
import RecorderBar from "./RecorderBar";
import {useReactMediaRecorder} from "react-media-recorder";
import Track from "./Track";


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
    root: {
        display: 'flex',
    },
    hide: {
        display: 'none',
    },

}));
let milliSecElapsed = 0

export default function App() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    let [blobs, setBlobs] = React.useState([])
    let [paused, setPaused] = React.useState(false)
    let [durationMilliSec, setDurationMilliSec] = React.useState(milliSecElapsed)

    const {
        status,
        startRecording,
        pauseRecording,
        stopRecording,
        resumeRecording,
        // mediaBlobUrl,
    } = useReactMediaRecorder(
        {
            audio: true, onStop: (blobUrl) => setBlobs(prevState => {
                console.log(blobUrl, prevState)
                if (!prevState.includes(blobUrl))
                    prevState.push(blobUrl)
                // console.log('pushed', prevState)
                return prevState.slice()
            })
        });

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
        <div className={classes.root}>
            <CssBaseline/>

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
                             count={blobs.length}
                />
            </ElevationScroll>
            <main
                // className={clsx(classes.content, {
                //     [classes.contentShift]: open,
                // })}
            >
                {/*<Recorder/>*/}
                {/*{blobs.map((b, i) =>  key={i}/>)}*/}
                <Track url={'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'} count={-1}/>
                {blobs.map((b, i) => <Track url={b} key={i} count={i?i+1:1}/>)}
            </main>
        </div>
    );
}
