import React, {
    useCallback, useEffect, useMemo,
    useRef, useState,
} from "react";
import {WaveSurfer, WaveForm} from "wavesurfer-react";
import MicrophonePlugin from "wavesurfer.js/src/plugin/microphone";



const ContainerStyle = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    width: '100%'
}


export default function Recorder({open, paused}) {
    let [resume, setResume] = useState(false)

    const plugins = useMemo(() => {
        return [
            {
                plugin: MicrophonePlugin,
            }
        ]
    }, [])
    const wavesurferRef = useRef();
    const handleWSMount = useCallback(
        waveSurfer => {
            wavesurferRef.current = waveSurfer;
            if (wavesurferRef.current) {

                if (window) {
                    window.surferidze = wavesurferRef.current;
                }
            }
        },
        []
    );
    useEffect(() => {
        open ? wavesurferRef.current.microphone.start() : wavesurferRef.current.microphone.stop()
    }, [open])

    useEffect(() => {
        if (paused) {
            wavesurferRef.current.microphone.pause()
            setResume(true)
        } else {
            if (resume) {
                wavesurferRef.current.microphone.play()
                setResume(false)
            }
        }
    }, [paused, resume])


    return (
        <div style={ContainerStyle}>
            <WaveSurfer plugins={plugins} onMount={handleWSMount}>
                <WaveForm cursorColor={'#00000000'} height={100} barGap={2} barWidth={3} id="rec-waveform"
                    fillParent={true} responsive={true} barMinHeight={1}
                    barHeight={30}
                >
                </WaveForm>
            </WaveSurfer>
        </div>
    );
}

