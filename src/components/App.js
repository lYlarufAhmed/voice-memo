import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
    Box,
    List,
    ListItemText,
    Paper,
    Typography,
    useScrollTrigger,
} from "@material-ui/core";
import {useReactMediaRecorder} from "react-media-recorder";
import Track from "./Track";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import RecorderContainer from "./RecorderContainer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const formattedDateTime = () => {
    let currentDateObj = new Date();
    return `${currentDateObj.getMonth()}-${currentDateObj.getDate()}-${currentDateObj.getFullYear()}_${currentDateObj
        .getHours()
        .toString()
        .padStart(2, "0")}:${currentDateObj
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
};

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

const openDrawer = (status, paused) => status === "recording" || paused;
const drawerHeight = 300;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: "yellow",
        height: "100vh",
    },
    hide: {
        display: "none",
    },
    // Paper
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        // paddingBottom: 50,
        flexBasis: "50%",
        flexGrow: 1,
        overflowY: "scroll",
        overflowX: "hidden",
    },
    list: {
        position: "relative",
    },
    listPadding: {
        paddingBottom: 70,
    },
    flexGrow: {
        flexGrow: 1,
        display: "grid",
        placeItems: "center",
        flexBasis: "50%",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "height"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        bottom: 0,
        top: "auto",
        alignItems: "center",
        backgroundColor: "white",
    },
    appBarShift: {
        height: drawerHeight,
        transition: theme.transitions.create(["margin", "height"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    overlay: {
        height: "100%",
        backgroundColor: "black",
        padding: "4rem",
        position: "absolute",
        width: "100%",
        top: 0,
        display: "none",
        opacity: ".4",
    },
    overlayShow: {
        display: "block",
    },
}));
let milliSecElapsed = 0;

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function App() {
    const matches = useMediaQuery("(min-width:769px)");
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    let [tracks, setTracks] = React.useState(new Map());

    let [paused, setPaused] = React.useState(false);
    let [durationMilliSec, setDurationMilliSec] = React.useState(milliSecElapsed);

    const [recordingName, setRecordingName] = React.useState('');
    const [snackOpen, setSnackOpen] = React.useState(false);
    const {
        status,
        startRecording,
        pauseRecording,
        stopRecording,
        resumeRecording,
        mediaBlobUrl,
        clearBlobUrl
    } = useReactMediaRecorder({
        audio: true,
    });
    React.useEffect(() => {
        if (mediaBlobUrl) {
            setTracks((prev) => {
                if (!prev.has(mediaBlobUrl))
                    prev.set(mediaBlobUrl, {title: recordingName});
                return new Map([...prev.entries()]);
            });
            clearBlobUrl();
        }
    }, [mediaBlobUrl, clearBlobUrl, recordingName]);

    const deleteTrack = (url) => {
        setTracks((prevState) => {
            prevState.delete(url)
            return new Map([...prevState.entries()]);
        });
    };

    const handleDrawerOpen = () => {
        setOpen(true);
        setRecordingName(
            // `New_Idea_${Object.entries(tracks).length + 1}_${formattedDateTime()}`
            `New_Idea_${tracks.size + 1}_${formattedDateTime()}`
        );
        startRecording();
    };

    const handleDrawerClose = () => {
        setOpen(false);
        stopRecording();
        setPaused(false);
        setDurationMilliSec(0);
        setSnackOpen(true);
    };
    const handlePause = async () => {
        try {
            await pauseRecording();
            setPaused(true);
            milliSecElapsed = durationMilliSec;
        } catch (e) {
            console.log(e.message);
        }
    };
    const handleResume = async () => {
        try {
            await resumeRecording();
            setPaused(false);
            setDurationMilliSec(milliSecElapsed);
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleSnackClose = () => setSnackOpen(false);

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Snackbar
                // anchorOrigin={{ vertical, horizontal }}
                open={snackOpen}
                onClose={handleSnackClose}
                autoHideDuration={3000}
            >
                <Alert severity="success" onClose={handleSnackClose}>
                    Recording Saved!
                </Alert>
            </Snackbar>
            <Paper square className={classes.paper}>
                <List
                    className={clsx(classes.list, {[classes.listPadding]: !matches})}
                >
                    {matches && <ListItemText>Desktop View</ListItemText>}
                    {tracks.size > 0 ? [...tracks.entries()].map(([url, {title}], index) => (
                            <Track
                                key={url}
                                url={url}
                                count={index}
                                title={title}
                                handleDelete={() => deleteTrack(url)}
                            />
                        ))
                        : (
                            <Typography variant={"h4"} align={"center"}>
                                No items
                            </Typography>
                        )}
                    {!matches && (
                        <Box
                            className={clsx(classes.overlay, {
                                [classes.overlayShow]: open,
                            })}
                        />
                    )}
                </List>
            </Paper>
            {matches ? (
                <Paper className={classes.flexGrow}>
                    <RecorderContainer
                        open={open}
                        paused={paused}
                        handleDrawerOpen={handleDrawerOpen}
                        handleDrawerClose={handleDrawerClose}
                        pauseRecording={handlePause}
                        recordingName={recordingName}
                        durationMilliSec={durationMilliSec}
                        setDurationMilliSec={setDurationMilliSec}
                        resumeRecording={handleResume}
                        isDrawerOpen={openDrawer(status, paused)}
                    />
                </Paper>
            ) : (
                <ElevationScroll>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <RecorderContainer
                            open={open}
                            paused={paused}
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
            )}
        </div>
    );
}
