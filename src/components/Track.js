import React, {
    useCallback,
    useRef,
} from "react";
import styled from "styled-components";
import {WaveSurfer, WaveForm} from "wavesurfer-react";


const AppWrapper = styled.div`
  font-family: sans-serif;
  text-align: center;
  width: 90vw;
  // display: inline-block;
  border: 1px dotted;
  padding: 1rem 1rem;
`;

const Button = styled.button`
  // width: 3rem;
  // padding: .5rem;
`;


export default function Track({url, count}) {
    const wavesurferRef = useRef();
    const handleWSMount = useCallback(
        (waveSurfer) => {
            wavesurferRef.current = waveSurfer;
            if (wavesurferRef.current) {
                wavesurferRef.current.load(url);


                wavesurferRef.current.on("ready", () => {
                    console.log("WaveSurfer is ready");
                });


                wavesurferRef.current.on("loading", data => {
                    console.log("loading --> ", data);
                });

                if (window) {
                    window.surferidze = wavesurferRef.current;
                }
            }
        },
        [url]
    );


    const play = useCallback(() => {
        wavesurferRef.current.playPause();
    }, []);

    return (
        <AppWrapper>
            <Button onClick={play}>Play / Pause</Button>
            <WaveSurfer onMount={handleWSMount}>
                <WaveForm cursorColor={'#00000000'} height={10} id={ `waveform-${count}` }>
                </WaveForm>
            </WaveSurfer>
        </AppWrapper>
    );
}

