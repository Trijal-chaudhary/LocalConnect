import { useEffect, useRef, useState } from "react";

const Capture = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [stream, setStream] = useState(null);

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

    recorder.start();
    mediaRecorderRef.current = recorder;
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
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
      <video ref={videoRef} autoPlay muted playsInline />

      <button type="button" onClick={startRecording}>
        Start
      </button>
      <button type="button" onClick={stopRecording}>
        Stop
      </button>
      <button type="button" onClick={download}>
        Download
      </button>
    </>
  );
};
export default Capture;
