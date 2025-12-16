import { useEffect, useRef, useState } from "react";
import "./VideoCapture.css";
const Capture = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [stream, setStream] = useState(null);
  const [second, setsecond] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true,
      })
      .then((str) => {
        setStream(str);
        videoRef.current.srcObject = str;
      });
  }, []);

  const startRecording = () => {
    setRecordedChunks([]);
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) setRecordedChunks((prev) => [...prev, e.data]);
    };
    setRunning(true);
    recorder.start();
    mediaRecorderRef.current = recorder;
  };
  useEffect(() => {
    let inertval;
    if (running) {
      inertval = setInterval(() => {
        setsecond((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(inertval);
  }, [running]);
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRunning(false);
  };

  const download = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "video.webm";
    a.click();
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "100%", height: "auto" }}
      />

      <button type="button" className="VideoButtons" onClick={startRecording}>
        Start
      </button>
      <button type="button" className="VideoButtons" onClick={stopRecording}>
        Stop
      </button>
      <button type="button" className="VideoButtons" onClick={download}>
        Download
      </button>
      <b className="VideoButtons">Rec: {second}</b>
    </>
  );
};
export default Capture;
