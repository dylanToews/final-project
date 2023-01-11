import { useState, useEffect } from "react";
import { deleteAudio } from "../helpers/recordings-list";
import generateKey from "../helpers/generate-key";

export default function useRecordingsList(audio) {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    if (audio)
      setRecordings((prevState) => {
        return [...prevState, {key: generateKey(), audio }];
      });
  }, [audio]);

  return {
    recordings,
    deleteAudio: (audioKey) => deleteAudio(audioKey, setRecordings)
  }
}