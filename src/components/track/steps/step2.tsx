import { useState, useEffect } from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Item from "antd/es/list/Item";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useToast } from "@/utils/toast";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface IProps {
  setValue?: (v: number) => void;
  trackUpload: any;
  setTrackUpload: any;
}

interface INewTracks {
  title: string;
  description: string;
  trackUrl: string;
  imgUrl: string;
  category: string;
}

const Step2 = (props: IProps) => {
  const [info, setInfo] = useState<INewTracks>({
    title: "",
    description: "",
    trackUrl: "",
    imgUrl: "",
    category: "",
  });
  const { trackUpload } = props;
  console.log("Test progress: ", trackUpload);
  const [progress, setProgress] = useState(0);
  const toast = useToast();
  useEffect(() => {
    setProgress(trackUpload.percent);
  }, [trackUpload.percent]);

  useEffect(() => {
    if (trackUpload && trackUpload.uploadedTrackName) {
      setInfo({
        ...info,
        trackUrl: trackUpload.uploadedTrackName,
      });
    }
  }, [trackUpload]);

  console.log("test info: ", info);

  const category = [
    {
      value: "CHILL",
      label: "CHILL",
    },
    {
      value: "WORKOUT",
      label: "WORKOUT",
    },
    {
      value: "PARTY",
      label: "PARTY",
    },
  ];
  const { data: session } = useSession();
  const handleUpload = async (image: any) => {
    const formData = new FormData();
    formData.append("fileUpload", image);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          target_type: "images",
        },
      }
    );
    setInfo({
      ...info,
      imgUrl: res.data.data.fileName,
    });
  };

  const handleSubmitForm = async () => {
    console.log("Check Infor:", info);
    const createTrack = await sendRequest<IBackendRes<ITracksTop[]>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks`,
      method: "POST",
      headers: {
        //@ts-ignore
        Authorization: `Bearer ${session.access_token}`,
      },
      body: {
        title: info.title,
        description: info.description,
        trackUrl: info.trackUrl,
        imgUrl: info.imgUrl,
        category: info.category,
      },
    });
    if(createTrack.data){
      toast.success("Thêm mới bài hát thành công!");
      //@ts-ignore
      props.setValue(0);
    }else{
      toast.error(createTrack.message);
    }
    setInfo({
      title: "",
      description: "",
      trackUrl: "",
      imgUrl: "",
      category: "",
    });
    console.log("check track up load: ", createTrack);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        {trackUpload.fileName}
        <LinearProgressWithLabel value={progress} />
      </Box>
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        <Grid item xs={4}>
          <Item style={{ listStyle: "none" }}>
            <div style={{ height: 250, width: 250, background: "#ccc" }}>
              <img
                width={250}
                height={250}
                src={
                  info.imgUrl
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${info.imgUrl}`
                    : "https://w7.pngwing.com/pngs/953/599/png-transparent-add-add-photo-plus-upload-instagram-ui-twotone-icon-thumbnail.png"
                }
              />
            </div>

            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: "20px" }}
              onChange={(e) => {
                const event = e.target as HTMLInputElement;
                if (event.files) {
                  handleUpload(event.files[0]);
                  setInfo({
                    ...info,
                    imgUrl: event.files[0].name,
                  });
                }
              }}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item style={{ listStyle: "none" }}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="standard-basic"
                  label="Title"
                  variant="standard"
                  value={info?.title}
                  onChange={(e) =>
                    setInfo({
                      ...info,
                      title: e.target.value,
                    })
                  }
                  style={{ width: "100%" }}
                />
                <TextField
                  id="standard-basic"
                  label="Description"
                  variant="standard"
                  value={info?.description}
                  onChange={(e) =>
                    setInfo({
                      ...info,
                      description: e.target.value,
                    })
                  }
                  style={{ width: "100%" }}
                />
                <TextField
                  id="outlined-select-currency"
                  value={info?.category}
                  onChange={(e) =>
                    setInfo({
                      ...info,
                      category: e.target.value,
                    })
                  }
                  select
                  label="Category"
                  style={{ width: "100%" }}
                  variant="standard"
                >
                  {category.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Button variant="contained" onClick={handleSubmitForm}>
                  Save
                </Button>
              </div>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default Step2;
