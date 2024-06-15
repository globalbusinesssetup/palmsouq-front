declare module 'react-stepper-horizontal' {
  import * as React from 'react';

  interface Step {
    title: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  }

  interface StepperProps {
    steps: Step[];
    activeStep: number;
    activeColor?: string;
    completeColor?: string;
    defaultColor?: string;
    completeBarColor?: string;
    defaultBarColor?: string;
    activeBorderColor?: string;
    completeBorderColor?: string;
    barStyle?: 'solid' | 'dotted' | 'dashed';
    size?: number;
    circleTop?: number;
    defaultBorderWidth?: number;
    completeBorderWidth?: number;
    activeBorderWidth?: number;
    defaultTitleColor?: string;
    completeTitleColor?: string;
    activeTitleColor?: string;
    defaultOpacity?: string;
    completeOpacity?: string;
    activeOpacity?: string;
    titleFontSize?: number;
    lineMarginOffset?: number;
    defaultBorderColor?: string;
  }

  const Stepper: React.FC<StepperProps>;

  export default Stepper;
}
