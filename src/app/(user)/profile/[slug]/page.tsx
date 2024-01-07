import TracksProfile from "@/components/track/tracks.profile";
import { sendRequest } from "@/utils/api";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
  const trackList = await sendRequest<IModelPaginate<ITracksTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/users?current=1&pageSize=10`,
    method: "POST",
    body: {
      id: params.slug,
    },
  });
  //@ts-ignore
  const data = trackList.data.result;
  console.log("check data: ", data);
  return (
    <>
      <Container style={{ marginTop: "50px" }}>
        {/* @ts-ignore */}
        <Box sx={{ flexGrow: 1 }}>
          {/* @ts-ignore */}
          <Grid container spacing={5}>
            {/* @ts-ignore */}
            {data.map((item: ITracksTop, index: number) => {
              return (
                <Grid item xs={6} md={6}>
                  {/* @ts-ignore */}
                  <TracksProfile data={item} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ProfilePage;
