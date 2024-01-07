import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { fetchDefaultImages, sendRequest } from "@/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
dayjs.extend(relativeTime);
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWavesurfer } from "@/utils/customHook";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface IProps {
  track: ITracksTop | null;
}

const ListComments = (props: IProps) => {
  const { data: session } = useSession();
  const [dataLike, setDataLike] = useState([]);
  const [yourComment, setYourComment] = useState<string>("");
  const router = useRouter();
  const timeElRef = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const { arrComments, data } = props;

  // const fetchData = async () => {
  //   const res2 = await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
  //     url: `http://localhost:8000/api/v1/likes`,
  //     method: "GET",
  //     queryParams: {
  //       current: 1,
  //       pageSize: 100,
  //       sort: "-createdAt",
  //     },
  //     headers: {
  //       Authorization: `Bearer ${session?.access_token}`,
  //     },
  //   });
  //   //@ts-ignore
  //   console.log("check res2 : ", res2.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [session]);

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  

  const handleAddComment = async () => {
    const res = await sendRequest<IBackendRes<ITrackComments[]>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments`,
      method: "POST",
      body: {
        content: yourComment,
        moment: 20,
        track: data._id,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    console.log(res);
    if (res.data) {
      setYourComment("");
      router.refresh();
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          
          sx={{
            background: "#fff",
            color: "#000",
            border: "1px solid #000",
            display: "flex",
            gap: "5px",
            height: "30px",
          }}
        >
          <FavoriteIcon />
          Like
        </Button>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            color: "#C0C0C0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <PlayArrowIcon />
            {data.countPlay}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FavoriteIcon />
            {data.countLike}
          </div>
        </div>
      </div>
      <TextField
        style={{ width: "100%" }}
        value={yourComment}
        onChange={(e) => setYourComment(e.target.value)}
        label="Comments"
        variant="standard"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddComment();
          }
        }}
      />
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={2}>
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 130, height: 130 }}
            src={fetchDefaultImages("USER")}
          />
          <p></p>
        </Grid>
        <Grid item xs={10}>
          {/* @ts-ignore */}
          {arrComments.map((comment) => (
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                sx={{ width: 40, height: 40 }}
                src={fetchDefaultImages("GITHUB")}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <span style={{ color: "#888888" }}>
                    {comment.user.name
                      ? comment.user.name
                      : comment.user.username}{" "}
                    <span style={{ fontSize: "15px" }}>
                      at {formatTime(comment.moment)}
                    </span>
                  </span>
                  <span>{comment.content}</span>
                </div>
                <div>
                  <p>{dayjs(comment.createdAt).fromNow()}</p>
                </div>
              </div>
            </div>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default ListComments;
