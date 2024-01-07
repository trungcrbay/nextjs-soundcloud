import * as React from "react";
import { Button, Container } from "@mui/material";
import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session= await getServerSession(authOptions);
  console.log("check session server: ", session); //promise
  
  // const res = await fetch("http://localhost:8000/api/v1/tracks/top",{
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: JSON.stringify({
  //     category:"CHILL",
  //     limit:10
  //   })
  // })
  // console.log("check res: ",await res.json())

  //data la mot array
  const chills = await sendRequest<IBackendRes<ITracksTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: "POST",
    body: {
      category: "CHILL",
      limit: 10,
    },
  });

  const workout = await sendRequest<IBackendRes<ITracksTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: "POST",
    body: {
      category: "WORKOUT",
      limit: 10,
    },
  });

  const party = await sendRequest<IBackendRes<ITracksTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: "POST",
    body: {
      category: "PARTY",
      limit: 10,
    },
  });

  return (
    <div>
      <Container>
        <MainSlider title="Top Chill" data={chills?.data ? chills.data : []}/>
        <MainSlider title="Work Out" data={workout?.data ? workout.data : []}/>
        <MainSlider title="Party" data={party?.data ? party.data : []}/>
      </Container>
    </div>
  );
}
