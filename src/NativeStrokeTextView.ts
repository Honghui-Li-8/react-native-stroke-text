import type { ViewProps } from "react-native";
import type {
  Float,
  Int32,
  WithDefault,
} from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

type TextAlign = "center" | "left" | "right";

export interface NativeProps extends ViewProps {
  width?: Float;
  text: string;
  fontSize?: Float;
  color?: string;
  strokeColor?: string;
  strokeWidth?: Float;
  fontFamily?: string;
  align?: WithDefault<TextAlign, "center">;
  numberOfLines?: Int32;
  ellipsis?: boolean;
}

export default codegenNativeComponent<NativeProps>("StrokeTextView");
