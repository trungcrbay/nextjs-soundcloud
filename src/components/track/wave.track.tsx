"use client";
import { useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import { Button, Container, Tooltip } from "@mui/material";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import "./wavetrack.css";
import { useTrackContext } from "@/lib/trackWrapper";
import ListComments from "./comments.profile";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

interface IProps {
  track: ITracksTop | null;
}
const WaveTrack = (props: IProps) => {
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const audio = searchParams.get("audio");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timeRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); 
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  const refPlayTrack =  useRef(true);
  console.log("check ref currrent: " , refPlayTrack.current);
  console.log("WAVE TRACK :", currentTrack);
  //@ts-ignore
  const { data, arrComments  } = props;
  console.log("CHECK WAVE DATA:", data);

  const optionsMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
    //Gradients.js
    const canvas = document.createElement("canvas");
    const ctx = document.createElement("canvas").getContext("2d")!;
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
    gradient.addColorStop(0, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, "#B1B1B1"); // Bottom color
    gradient.addColorStop(1, "#B1B1B1"); // Bottom color

    // Define the progress gradient
    const progressGradient = ctx.createLinearGradient(
      0,
      0,
      0,
      canvas.height * 1.35
    );
    progressGradient.addColorStop(0, "#EE772F"); // Top color
    progressGradient.addColorStop(
      (canvas.height * 0.7) / canvas.height,
      "#EB4926"
    ); // Top color
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 1) / canvas.height,
      "#ffffff"
    ); // White line
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 2) / canvas.height,
      "#ffffff"
    ); // White line
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 3) / canvas.height,
      "#F6B094"
    ); // Bottom color
    progressGradient.addColorStop(1, "#F6B094"); // Bottom color

    return {
      waveColor: gradient,
      progressColor: progressGradient,
      url: `/api?audio=${audio}`,
      barWidth: 2,
      height: 100,
    };
  }, []);
  const wavesurfer = useWavesurfer(containerRef, optionsMemo);

  const handleAddView = async () => {
    if(refPlayTrack.current) {
      const res = await sendRequest<IBackendRes<ITrackComments[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/increase-view`,
        method: "POST",
        body: {
          trackId: data._id,
        },    
        // headers: {
        //   Authorization: `Bearer ${session?.access_token}`,
        // },
      });
      router.refresh();
      refPlayTrack.current = false;
    }
  };

  // Current time & duration

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  const timeEl = timeRef.current;

  const durationEl = durationRef.current;
  if (wavesurfer) {
    wavesurfer.on(
      "decode",
      (duration) => (durationEl!.textContent = formatTime(duration))
    );
    wavesurfer.on(
      "timeupdate",
      (currentTime) => (timeEl!.textContent = formatTime(currentTime))
    );
  }

  console.log("TIMER CURRENT TIME:" , timeEl)
  

  // Hover effect

  const hover = hoverRef.current;
  const waveform = containerRef.current!;
  if (waveform) {
    waveform.addEventListener(
      "pointermove",
      (e) => (hover!.style.width = `${e.offsetX}px`)
    );
  }

  const onPlayClick = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
    }
  }, [wavesurfer]);

  useEffect(() => {
    if (!wavesurfer) return;

    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      // wavesurfer.on('timeupdate', (currentTime) => setCurrentTime(currentTime)),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <>
      <Container
        sx={{
          marginTop: "20px",
          background:
            "linear-gradient(135deg, rgb(106,112,67) 0%, rgb(11,15,20) 100%)",
          display: "flex",
          gap: "10px",
          height: "300px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "15px",
              paddingTop: "20px",
              alignItems: "center",
            }}
          >
            <div
              onClick={() => {
                onPlayClick();
                handleAddView();
              }}
            >
              {isPlaying ? (
                <BsPauseCircleFill
                  onClick={() => setCurrentTrack({ ...data, isPlaying: false })}
                  style={{ color: "orange", fontSize: "50px" }}
                />
              ) : (
                <BsFillPlayCircleFill
                  onClick={() => setCurrentTrack({ ...data, isPlaying: true })}
                  style={{ color: "orange", fontSize: "50px" }}
                />
              )}
            </div>
            <div>
              <div
                style={{
                  color: "#fff",
                  background: "black",
                  padding: "3px 5px",
                }}
              >
                <span>Trung CR7 Song</span>
              </div>
              <div
                style={{
                  color: "#fff",
                  background: "black",
                  padding: "3px 5px",
                  marginTop: "5px",
                }}
              >
                <span>Trung CR7</span>
              </div>
            </div>
          </div>

          <div ref={containerRef} id="waveform" style={{ width: "100%" }}>
            <div className="comments" style={{ position: "relative" }}>
              {/* @ts-ignore */}
              {arrComments.map((item, index) => {
                return (
                  <Tooltip title={`${item.content}`}>
                    <img
                      style={{
                        height: 20,
                        width: 20,
                        position: "absolute",
                        top: 70,
                        left: `${item.moment}%`,
                        zIndex: 20,
                      }}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/CHILL1.png`}
                    />
                  </Tooltip>
                );
              })}
            </div>
            <div ref={timeRef} id="time"></div>
            <div ref={durationRef} id="duration"></div>
            <div ref={hoverRef} id="hover"></div>
          </div>
        </div>
        <div style={{ background: "#ccc", height: "200px", width: "200px" }}>
          <img
            width={200}
            height={200}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${data.imgUrl}`}
          />
        </div>
      </Container>

      <Container>
        {/* @ts-ignore */}
        <ListComments arrComments={arrComments} data={data}  />
      </Container>
    </>
  );
};

export default WaveTrack;
