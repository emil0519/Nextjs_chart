"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState } from "react";

export const Slider = ({
  imageList,
}: {
  imageList: string[];
}): React.ReactElement => {
  const [currentImgCount, setCurrentImgCount] = useState<number>(0);
  const changeImage = (direction: "right" | "left") => {
    let currentImage = currentImgCount;
    const getNextImageId = (direction: "right" | "left") => {
      if (direction === "right" && currentImgCount !== imageList.length - 1) {
        return (currentImage += 1);
      }
      if (direction === "left" && currentImgCount !== 0) {
        return (currentImage -= 1);
      }
    };
    getNextImageId(direction);
    const nextImage = document.querySelector(`#slider-img-${currentImage}`);
    setCurrentImgCount(currentImage);
    nextImage?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };
  return (
    <Box
      sx={{
        position: "relative",
        width: "500px",
      }}
    >
      <ChevronLeftIcon
        onClick={() => changeImage("left")}
        sx={{
          position: "absolute",
          top: "50%",
          left: "0",
          cursor: "pointer",
          color: "white",
        }}
        id="slider-right-icon"
      />
      <ChevronRightIcon
        onClick={() => changeImage("right")}
        sx={{
          position: "absolute",
          top: "50%",
          right: "0",
          cursor: "pointer",
          color: "white",
        }}
        id="slider-right-icon"
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          width: "500px",
          overflow: "hidden",
        }}
      >
        {imageList.map((image, index) => (
          <Box key={index} sx={{ width: "500px" }} id={`slider-img-${index}`}>
            <Image
              width={500}
              height={300}
              src={image}
              alt={`slider image ${index}`}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
