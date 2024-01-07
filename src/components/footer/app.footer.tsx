"use client";
import { useContext, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import AppBar from "@mui/material/AppBar";
import { useHasMounted } from "@/utils/customHook";
import { Container } from "@mui/material";
import {
  TrackContext,
  TrackContextProvider,
  useTrackContext,
} from "@/lib/trackWrapper";

const AppFooter = () => {
  const hasMounted = useHasMounted();
  const playerRef = useRef(null);
  if (!hasMounted) return <></>;
  console.log("check be:", process.env.NEXT_PUBLIC_BACKEND_URL);
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  if (currentTrack?.isPlaying) {
    //@ts-ignore
    playerRef?.current?.audio?.current?.play();
  } else {
    //@ts-ignore
    playerRef?.current?.audio?.current?.pause();
  }
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
      >
        <Container>
          <div style={{ display: "flex", gap: "20px" }}>
            <AudioPlayer
              //@ts-ignore
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
              style={{ boxShadow: "unset" }}
              layout="horizontal-reverse"
              ref={playerRef}
              onPause={() => {
                setCurrentTrack({ ...currentTrack, isPlaying: false });
              }}
              onPlay={() => {
                setCurrentTrack({ ...currentTrack, isPlaying: true });
              }}
            />
            <div>
              <div>
                <span style={{ color: "#000" }}>TRUNGCR7</span>
              </div>
              <div>
                <span style={{ color: "#000" }}>Who am I?</span>
              </div>
            </div>
          </div>
        </Container>
      </AppBar>
    </>
  );
};

export default AppFooter;
