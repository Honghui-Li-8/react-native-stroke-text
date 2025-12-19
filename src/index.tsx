import React from "react";
import { requireNativeComponent } from "react-native";

const ComponentName = "StrokeTextView";

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

// Use requireNativeComponent which works reliably for both old and new architectures
// This avoids "Could not find component config" errors that occur when codegen hasn't run
const NativeStrokeText = requireNativeComponent<StrokeTextProps>(ComponentName);

export const StrokeText = (props: StrokeTextProps) => {
  return <NativeStrokeText {...props} />;
};
