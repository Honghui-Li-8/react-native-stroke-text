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

// Use Codegen component for New Architecture support
// The codegenNativeComponent function works with both architectures
// For Old Architecture, it will still work but Codegen may not have generated native code
// In that case, the old architecture manager will handle it
let NativeStrokeText: React.ComponentType<StrokeTextProps>;

try {
  // Import Codegen component - this will work when Codegen has processed the spec
  const CodegenComponent = require("./StrokeTextViewNativeComponent").default;
  NativeStrokeText = CodegenComponent;
} catch (e) {
  // Fallback to requireNativeComponent if Codegen component fails to load
  // This handles cases where Codegen hasn't run or there's an error
  NativeStrokeText = requireNativeComponent<StrokeTextProps>(ComponentName);
}

export const StrokeText = (props: StrokeTextProps) => {
  return <NativeStrokeText {...props} />;
};
