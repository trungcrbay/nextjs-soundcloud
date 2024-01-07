"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Container, Grid } from "@mui/material";
import { useTrackContext } from "@/lib/trackWrapper";
import PauseIcon from "@mui/icons-material/Pause";
import Link from 'next/link'

const TracksProfile = (props: ITracksTop) => {
  const theme = useTheme();
  //@ts-ignore
  const { data } = props;
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  
  return (
    <Card sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            <Link style={{color:'#000',textDecoration:'none'}} href={`/track/${data._id}?audio=${data.trackUrl}&id=${data._id}`}>{data.title}</Link>
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {data.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          {/* data._id : id minh dang click vao */}
          {/* @ts-ignore */}
          {(data._id !== currentTrack._id || (data._id === currentTrack._id &&
              currentTrack.isPlaying === false)) && (
            <IconButton
              aria-label="play/pause"
              onClick={() => setCurrentTrack({ ...data, isPlaying: true })}
            >
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          )}

          {/* @ts-ignore */}
          {data._id === currentTrack._id && currentTrack.isPlaying === true && (
            <IconButton
              aria-label="play/pause"
              onClick={() => setCurrentTrack({ ...data, isPlaying: false })}
            >
              <PauseIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          )}

          {/**right icon */}
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151, right: 0 }}
        image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${data.imgUrl}`}
        alt="Live from space album cover"
      />
    </Card>
  );
};

export default TracksProfile;
