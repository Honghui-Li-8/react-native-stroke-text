import type { ViewProps } from 'react-native';
import type { HostComponent } from 'react-native';
import { codegenNativeComponent } from 'react-native';

export interface NativeProps extends ViewProps {
  width?: number;
  text: string;
  fontSize?: number;
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  fontFamily?: string;
  align?: 'center' | 'left' | 'right';
  numberOfLines?: number;
  ellipsis?: boolean;
}

export default codegenNativeComponent<NativeProps>('StrokeTextView', {
  interfaceOnly: false,
  excludedPlatforms: [],
}) as HostComponent<NativeProps>;

