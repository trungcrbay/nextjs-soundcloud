// Import css files
"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Button, Box, Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Image from "next/image";
import Link from "next/link";
import { convertSlugUrl } from "@/utils/api";

interface IProps {
  data: ITracksTop[];
  title: string;
}

const MainSlider = (props: IProps) => {
  const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <Button
        onClick={props.onClick}
        sx={{
          position: "absolute",
          right: "0",
          top: "50%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronRightIcon />
      </Button>
    );
  };

  const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <Button
        onClick={props.onClick}
        sx={{
          position: "absolute",
          left: "0",
          top: "50%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronLeftIcon />
      </Button>
    );
  };
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Box
      sx={{
        margin: "0 50px",
        img: {
          width: "200px",
          height: "200px",
        },
        a:{
          color:"unset",
          textDecoration:'none'
        }
      }}
    >
      <h1>{props.title}</h1>
      <Slider {...settings}>
        {props.data.map((item, index) => {
          return (
            <div>
              <img
                className="img"
                alt={`image-key-${index}`}
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
              />
              <Link href={`/track/${convertSlugUrl(item.title)}-${item._id}.html?audio=${item.trackUrl}&id=${item._id}`}>
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {item.title}
                </p>
                <h5>{item.description}</h5>
              </Link>
            </div>
          );
        })}
      </Slider>
      <Divider />
    </Box>
  );
};

export default MainSlider;
