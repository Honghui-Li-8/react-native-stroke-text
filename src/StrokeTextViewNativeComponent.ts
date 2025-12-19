import type { ViewProps } from 'react-native';
import type { HostComponent } from 'react-native';
import { Double, Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  width?: Double;
  text: string;
  fontSize?: Double;
  color?: string;
  strokeColor?: string;
  strokeWidth?: Double;
  fontFamily?: string;
  align?: 'center' | 'left' | 'right';
  numberOfLines?: Int32;
  ellipsis?: boolean;
}

export default codegenNativeComponent<NativeProps>('StrokeTextView', {
  interfaceOnly: false,
  excludedPlatforms: [],
}) as HostComponent<NativeProps>;

