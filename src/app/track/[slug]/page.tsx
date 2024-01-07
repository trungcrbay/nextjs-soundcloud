import WaveTrack from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";

import type { Metadata } from "next";
import slugify from "slugify";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  // read route params
  const str = params.slug;
  const slugUrl = str.split(".html");
  console.log("check wword 3", slugUrl[0]); //song-cho-[id]
  const slugUrlSplit = slugUrl[0].split("-");
  console.log(slugUrlSplit[slugUrlSplit.length - 1]);

  const detailTrack = await sendRequest<IBackendRes<ITracksTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${
      slugUrlSplit[slugUrlSplit.length - 1]
    }`,
    method: "GET",
  });

  return {
    //@ts-ignore
    title: detailTrack.data.title,
    //@ts-ignore
    description: detailTrack.data.description,
  };
}

export async function generateStaticParams() {
  return [
    { slug: "xi-mang-pho-6548c2e1615fd9cfe6d30e9c.html" },
    { slug: "le-luu-ly-6548c2e1615fd9cfe6d30e9a.html" },
    { slug: "nu-hon-bisou-6548c2e1615fd9cfe6d30e97.html" },
  ];
}

export function Page({ params }: Props) {}

const DetailTrackPage = async ({ params }: { params: { slug: string } }) => {
  console.log(params.slug);
  const str = params.slug;
  const slugUrl = str.split(".html");
  console.log("check wword 3", slugUrl[0]); //song-cho-[id]
  const slugUrlSplit = slugUrl[0].split("-");
  console.log(slugUrlSplit[slugUrlSplit.length - 1]);
  const {slug} = params;

  const detailTrack = await sendRequest<IBackendRes<ITracksTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${
      slugUrlSplit[slugUrlSplit.length - 1]
    }`,
    method: "GET",
  });

  const res = await sendRequest<IBackendRes<ITracksTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
    method: "POST",
    queryParams: {
      current: 1,
      pageSize: 20,
      trackId: slugUrlSplit[slugUrlSplit.length - 1],
      sort: "-createdAt",
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));

  //@ts-ignore
  const arrComments = res.data.result;

  const data = detailTrack;

  return (
    <div>
      {/* @ts-ignore */}
      <WaveTrack data={data.data} arrComments={arrComments} />
    </div>
  );
};

export default DetailTrackPage;
