import RecordingDashboard from "./RecordingDashboard";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import {ReactComponent as Stop} from "../svgs/Stop.svg";
import {ReactComponent as Record} from "../svgs/Record.svg";
import {ReactComponent as Play} from "../svgs/Play.svg";
import {ReactComponent as Pause} from "../svgs/Pause.svg";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useClasses = makeStyles((theme)=>({
    menuButton: {
        marginRight: theme.spacing(2),
    },
}))

export default function RecorderContainer({
                                              setDurationMilliSec, durationMilliSec,
                                              open, recordingName, paused, isDrawerOpen,
                                              handleDrawerClose, handleDrawerOpen, resumeRecording,
                                              pauseRecording

                                          }) {
    const classes = useClasses()
    return (
        <React.Fragment>
            {isDrawerOpen && <RecordingDashboard
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
                    {isDrawerOpen ?
                        <Stop/>
                        :
                        <Record/>}
                </IconButton>

                {isDrawerOpen &&
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
        </React.Fragment>
    )
}