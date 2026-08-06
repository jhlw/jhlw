import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';

export const MyComp: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #7f00ff, #e100ff)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{fontSize: 96, margin: 0}}>Hello Remotion</h1>
      <p style={{fontSize: 40, opacity: 0.85}}>
        Frame {frame} / 150 ・ {fps} fps
      </p>
    </AbsoluteFill>
  );
};
