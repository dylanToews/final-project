import { v4 as uuid } from "uuid";

export function formatMinutes(minutes) {
  return minutes < 10 ? `0${minutes}` : minutes;
}

export function formatSeconds(seconds) {
  return seconds < 10 ? `0${seconds}` : seconds;
}


export function generateKey() {
  return uuid();
}

export async function startRecording(setRecorderState) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    setRecorderState((prevState) => {
      return {
        ...prevState,
        initRecording: true,
        mediaStream: stream
      };
    });
  } catch (err) {
    console.log(err);
  }
}

export function saveRecording(recorder) {
  if (recorder.state !== "inactive") recorder.stop();
}

export function deleteAudio(audioKey, setRecordings) {
  setRecordings((prevState) => prevState.filter((record) => record.key !== audioKey));
}