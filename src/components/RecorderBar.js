import clsx from "clsx";
import RecordingDashboard from "./RecordingDashboard";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {ReactComponent as Stop} from "../svgs/Stop.svg";
import {ReactComponent as Record} from "../svgs/Record.svg";
import AppBar from "@material-ui/core/AppBar";
// import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
// import {PlayCircleOutline} from "@material-ui/icons";
import {ReactComponent as Play} from "../svgs/Play.svg";
import {ReactComponent as Pause} from "../svgs/Pause.svg";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const openDrawer = (status, paused) => status === 'recording' || paused
const drawerHeight = 300;
const useStyles = makeStyles((theme) => ({
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
        // height: `calc(100% - ${drawerHeight}px)`,
        // marginBottom: drawerHeight,
        height: drawerHeight,
        transition: theme.transitions.create(['margin', 'height'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },


}));
export default function RecorderBar({
                                        paused,
                                        status, open, pauseRecording, resumeRecording,
                                        handleDrawerClose, handleDrawerOpen,
                                        durationMilliSec, setDurationMilliSec, recordingName
                                    }) {

    const classes = useStyles()
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            {openDrawer(status, paused) && <RecordingDashboard
                paused={paused} setDurationMilliSec={setDurationMilliSec}
                durationMilliSec={durationMilliSec} open={open} recordingName={recordingName}

            />}

            <Toolbar>
                <IconButton
                    color="secondary"
                    aria-label={open ? "Stop Recording" : "Start Recording"}
                    onClick={open ? handleDrawerClose : handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton)}
                    size={'small'}
                >
                    {openDrawer(status, paused) ?
                        <Stop/>
                        :
                        <Record/>}
                </IconButton>

                {openDrawer(status, paused) &&
                < IconButton
                    color="secondary"
                    aria-label={open ? "Stop Recording" : "Start Recording"}
                    // onClick={open ? handleDrawerClose : handleDrawerOpen}
                    onClick={paused ? resumeRecording : pauseRecording}
                    edge="start"
                    className={clsx(classes.menuButton)}
                    size={'small'}
                >
                    {paused ? <Play/> : <Pause/>}

                </IconButton>
                }
            </Toolbar>
        </AppBar>
    )
}