import { useState, useEffect } from "react";
import { startRecording, saveRecording } from "../helpers/recorder-controls";

// sounds state object structure
const initialState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null
};

export default function useRecorder() {
  const [recorderState, setRecorderState] = useState(initialState);

  // this useEffect was made just to handle the time counter display, modified to auto-save once 15 seconds reached
  useEffect(() => {
    const MAX_RECORDER_TIME = 15;
    let recordingInterval = null;

    if (recorderState.initRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState) => {
          if (
            prevState.recordingSeconds === MAX_RECORDER_TIME
          ) {
            clearInterval(recordingInterval);
            saveRecording(recorderState.mediaRecorder);
            return prevState;
          }

          if (prevState.recordingSeconds >= 0 && prevState.recordingSeconds < 59)
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1
            };

          // if (prevState.recordingSeconds === 59)
          //   return {
          //     ...prevState,
          //     recordingMinutes: prevState.recordingMinutes + 1,
          //     recordingSeconds: 0,
          //   };
        });
      }, 1000);
    else clearInterval(recordingInterval);

    return () => clearInterval(recordingInterval);
  });

  useEffect(() => {
    if (recorderState.mediaStream) 
      setRecorderState((prevState) => {
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream)
        };
      });
  }, [recorderState.mediaStream]);

  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks = [];

    if (recorder && recorder.state === "inactive") {
      recorder.start();

      recorder.ondataavailable = (ev) => {
        chunks.push(ev.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: chunks[0].type }); // edited from type: "audio/ogg; codecs=opus"
        chunks = [];

        setRecorderState((prevState) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              audio: window.URL.createObjectURL(blob),
            };
          else return initialState;
        });
      };
    }

    return () => {
      if (recorder) recorder.stream.getAudioTracks().forEach((track) => track.stop());
    };
  }, [recorderState.mediaRecorder]);

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder)
  };
}