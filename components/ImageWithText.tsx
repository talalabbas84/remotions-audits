import React, { useEffect, useState } from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig
} from 'remotion';

// Global configuration values
const VERY_BIG_RECT_SCALE = 0.9; // Scale out for very big rectangle
const VERY_SMALL_RECT_SCALE = 3; // Zoom in for very small rectangle
const NORMAL_RECT_SCALE = 1.4; // Slight zoom in for normal rectangle
const VERY_BIG_RECT_THRESHOLD = 0.8; // Threshold for very big rectangle
const VERY_SMALL_RECT_THRESHOLD = 0.01; // Threshold for very small rectangle

interface RectCoords {
  startX: number;
  startY: number;
  width: number;
  height: number;
}

interface ImageWithTextProps {
  image: string;
  rectCoords: RectCoords;
  imageWidth: number;
  imageHeight: number;
  text: string;
  nextRectCoords: RectCoords;
  prevRectCoords: RectCoords;
  index: number;
  holdDuration: number;
  transitionDuration: number;
  initialDuration: number;
  fadeTransitionDuration: number;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({
  image,
  rectCoords,
  imageWidth,
  imageHeight,
  text,
  nextRectCoords,
  prevRectCoords,
  index,
  holdDuration,
  transitionDuration,
  initialDuration,
  fadeTransitionDuration
}) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const [loaded, setLoaded] = useState<boolean>(false);

  // Calculate scaling factors to fit the image within the video dimensions
  const scaleX = width / imageWidth;
  const scaleY = height / imageHeight;
  const scale = Math.min(scaleX, scaleY);

  // Calculate the size of the scaled image
  const scaledWidth = imageWidth * scale;
  const scaledHeight = imageHeight * scale;

  // Calculate the area of the rectangle and the image
  const rectArea = rectCoords.width * rectCoords.height;
  const imageArea = imageWidth * imageHeight;

  // Determine the scaling factor based on the rectangle's area
  let rectScale = 1;
  if (rectArea > VERY_BIG_RECT_THRESHOLD * imageArea) {
    rectScale = VERY_BIG_RECT_SCALE; // Scale out for very big rectangle
  } else if (rectArea < VERY_SMALL_RECT_THRESHOLD * imageArea) {
    rectScale = VERY_SMALL_RECT_SCALE; // Zoom in for very small rectangle
  } else {
    rectScale = NORMAL_RECT_SCALE; // Slight zoom in for normal rectangle
  }

  // Calculate the center of the rectangle
  const rectCenterX = rectCoords.startX + rectCoords.width / 2;
  const rectCenterY = rectCoords.startY + rectCoords.height / 2;

  // Calculate the center of the next and previous rectangles
  const nextRectCenterX = nextRectCoords.startX + nextRectCoords.width / 2;
  const nextRectCenterY = nextRectCoords.startY + nextRectCoords.height / 2;
  const prevRectCenterX = prevRectCoords.startX + prevRectCoords.width / 2;
  const prevRectCenterY = prevRectCoords.startY + prevRectCoords.height / 2;

  // Calculate the offset to center the rectangle within the video frame
  const offsetX = width / 2 - rectCenterX * scale * rectScale;
  const offsetY = height / 2 - rectCenterY * scale * rectScale;
  const nextOffsetX = width / 2 - nextRectCenterX * scale * rectScale;
  const nextOffsetY = height / 2 - nextRectCenterY * scale * rectScale;
  const prevOffsetX = width / 2 - prevRectCenterX * scale * rectScale;
  const prevOffsetY = height / 2 - prevRectCenterY * scale * rectScale;

  // Calculate interpolated values for the transition
  const interpolatedX = interpolate(
    frame,
    [0, transitionDuration],
    [prevOffsetX, offsetX],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.ease
    }
  );

  const interpolatedY = interpolate(
    frame,
    [0, transitionDuration],
    [prevOffsetY, offsetY],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.ease
    }
  );

  // Calculate fade transition
  const opacity = interpolate(frame, [0, fadeTransitionDuration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.ease
  });

  // Debugging logs to check calculated values
  useEffect(() => {
    console.log(`Video dimensions: ${width}x${height}`);
    console.log(`Image dimensions: ${imageWidth}x${imageHeight}`);
    console.log(`Scaled image dimensions: ${scaledWidth}x${scaledHeight}`);
    console.log(
      `Rectangle coordinates: (${rectCoords.startX}, ${rectCoords.startY}), width: ${rectCoords.width}, height: ${rectCoords.height}`
    );
    console.log(
      `Scaled rectangle coordinates: (${rectCenterX}, ${rectCenterY}), offsetX: ${offsetX}, offsetY: ${offsetY}`
    );
  }, [
    width,
    height,
    imageWidth,
    imageHeight,
    rectCoords,
    scale,
    offsetX,
    offsetY,
    rectCenterX,
    rectCenterY,
    text
  ]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Img
        src={image}
        alt='Emphasized Image'
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          objectFit: 'contain',
          position: 'absolute',
          top: `${interpolatedY}px`,
          left: `${interpolatedX}px`,
          transform: `scale(${rectScale})`,
          transformOrigin: 'top left',
          opacity: opacity // Apply fade transition
        }}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />

      {loaded && text && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            textAlign: 'center',
            fontSize: '24px',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '10px 0'
          }}
        >
          {text}
        </div>
      )}
    </AbsoluteFill>
  );
};

export default ImageWithText;
