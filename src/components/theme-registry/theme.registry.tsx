"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./emotion.cache";
import theme from "./theme";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ProgressBar
          height="4px"
          color="#FF0000"
          options={{ showSpinner: false }}
          shallowRouting
        />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
