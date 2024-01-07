// app/context/theme.js

"use client";

import { createContext, useContext, useState } from "react";

export const TrackContext = createContext({});

export const TrackContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialValue = {
    _id: "",
    title: "",
    description: "",
    category: "",
    imgUrl: "",
    trackUrl: "",
    countLike: 0,
    countPlay: 0,
    uploader: {
      _id: "",
      email: "",
      name: "",
      role: "",
      type: "",
    },
    isDeleted: false,
    isPlaying: false,
    // __v: 0,
    createdAt: "",
    updatedAt: "",
  };
  const [currentTrack, setCurrentTrack] = useState<IShareTrack>(initialValue);

  return (
    <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackContext = () => useContext(TrackContext);
