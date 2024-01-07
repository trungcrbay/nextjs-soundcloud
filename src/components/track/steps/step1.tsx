import React, { useCallback, useState, useEffect } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./theme.css";
import { sendRequest, sendRequestFile } from "@/utils/api";
import { useSession } from "next-auth/react";
import axios from "axios";

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

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "300px",
  height: "100%",
};

interface IProps {
  setValue: (v : number) => void;
  setTrackUpload:any,
  trackUpload:any
}

const Step1 = (props: IProps) => {
  const { trackUpload } = props;
  const [percent,setPercent] = useState<number>(0);
  const [file, setFile] = useState([]);
  const { data: session } = useSession();
  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      setFile(
        //@ts-ignore
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      if (acceptedFiles) {
        props.setValue(1);
        const audio = acceptedFiles[0];
        console.log(audio);
        const formData = new FormData();
        formData.append("fileUpload", audio);
        // const getAudio = await sendRequestFile<IBackendRes<ITracksTop[]>>({
        //   url: "http://localhost:8000/api/v1/files/upload",
        //   method: "POST",
        //   body: formData,
        //   headers: {
        //     Authorization: `Bearer ${session?.access_token}`,
        //     target_type: "tracks",
        //     // 'Content-Type': 'application/json',
        //   },
        // });

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
              target_type: "tracks",
            },
            onUploadProgress: (progressEvent) => {

              let percentCompleted = Math.floor(
                (progressEvent.loaded * 100) / progressEvent.total!
              );
              props.setTrackUpload({
                ...trackUpload,
                fileName:acceptedFiles[0].name,
                percent:percentCompleted
              })
              console.log("percent complete: ", percentCompleted);
              // do whatever you like with the percentage complete
              // maybe dispatch an action that will update a progress bar or something
            },
          }
        );
        props.setTrackUpload({
          ...trackUpload,
          uploadedTrackName: res.data.data.fileName
        })
        console.log("check res: ", res.data.data.fileName);
      }
    },
    [session]
  );
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      // "image/*": [],
      "video/mp4": [".mp4", ".MP4", ".mp3", ".MP3"],
    },
    onDrop,
  });

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const thumbs = file.map((file) => (
    //@ts-ignore
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          //@ts-ignore
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            //@ts-ignore
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    //@ts-ignore
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Upload file
          <VisuallyHiddenInput type="file" {...getInputProps()} />
        </Button>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside className="thumbsContainer">
        <h4>Files</h4>
        <ul>{files}</ul>
        {thumbs}
      </aside>
    </section>
  );
};

export default Step1;
