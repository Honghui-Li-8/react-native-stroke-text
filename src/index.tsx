import React from "react";
import StrokeTextViewNativeComponent from "./StrokeTextViewNativeComponent";

type TextAlign = "center" | "left" | "right"

export interface StrokeTextProps {
  width?: number;
  text: string;
  fontSize?: number;
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  fontFamily?: string;
  align?: TextAlign;
  numberOfLines?: number;
  ellipsis?: boolean;
}

export const StrokeText = (props: StrokeTextProps) => {
  return <StrokeTextViewNativeComponent {...props} />;
};
