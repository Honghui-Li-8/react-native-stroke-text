import React from "react";

import NativeStrokeText, { type NativeProps } from "./NativeStrokeTextView";

export type StrokeTextProps = NativeProps;

export const StrokeText = (props: StrokeTextProps) => {
  return <NativeStrokeText {...props} />;
};
