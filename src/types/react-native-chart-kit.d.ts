declare module 'react-native-chart-kit' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  export interface ChartConfig {
    backgroundColor?: string;
    backgroundGradientFrom?: string;
    backgroundGradientTo?: string;
    color?: (opacity?: number) => string;
    labelColor?: (opacity?: number) => string;
    strokeWidth?: number;
    barPercentage?: number;
    useShadowColorFromDataset?: boolean;
    propsForBackgroundLines?: object;
    decimalPlaces?: number;
    propsForLabels?: object;
    propsForVerticalLabels?: TextStyle; 
    propsForHorizontalLabels?: TextStyle;
  }

  export interface BarChartProps {
    data: any;
    width: number;
    height: number;
    fromZero?: boolean;
    chartConfig: ChartConfig;
    style?: ViewStyle;
    showValuesOnTopOfBars?: boolean;
    flatColor?: boolean;
    withInnerLines?: boolean;
    withCustomBarColorFromData?: boolean;
  }

  export class BarChart extends Component<BarChartProps> {}
}
