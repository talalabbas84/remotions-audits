import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import ImageWithText from '../../components/ImageWithText'; 

interface RectCoords {
  startX: number;
  startY: number;
  width: number;
  height: number;
}

interface SequenceData {
  image: string;
  rectCoords: RectCoords;
  imageWidth: number;
  imageHeight: number;
  text: string;
}

const sequences: SequenceData[] = [
  {
    image:
      'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720833281/Nicky/5140920_ryrhax.jpg?_s=public-apps',
    text: 'Full Image without Focus',
    rectCoords: { startX: 0, startY: 0, width: 1500, height: 1000 },
    imageWidth: 1500,
    imageHeight: 1000

  },
  {
    image:
      'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720833883/Nicky/best_days_with_us_qgmlyc.jpg?_s=public-apps',
    text: 'Enjoy your best days with us',
    rectCoords: {
      startX: 148.001953125,
      startY: 400.00390625,
      width: 415,
      height: 121
    }, // Correct
    imageWidth: 1500,
    imageHeight: 1000
  },
  {
    image:
      'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720833896/Nicky/logo_focus_ecajvz.jpg?_s=public-apps',
    text: 'Logo Focus',
    rectCoords: {
      startX: 150.001953125,
      startY: 156.00390625,
      width: 115,
      height: 90
    },
    imageWidth: 1500,
    imageHeight: 1000
  },
  {
    image:
      'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720833902/Nicky/nav_bar_focus_qr2r8c.jpg?_s=public-apps',
    text: 'Nav Bar Focus',
    rectCoords: {
      startX: 655.001953125,
      startY: 124.00390625,
      width: 745,
      height: 60
    }, // Correct
    imageWidth: 1500,
    imageHeight: 1000
  },
  {
    image:
      'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720833909/Nicky/person_focus_fvdgfs.jpg?_s=public-apps',
    text: 'Person Focus',
    rectCoords: {
      startX: 703.001953125,
      startY: 187.00390625,
      width: 485,
      height: 578
    }, // Correct
    imageWidth: 1500,
    imageHeight: 1000
  },
  {
    image:
      'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720833914/Nicky/fb_logo_focus_hbpjso.jpg?_s=public-apps',
    text: 'FB Logo Focus',
    rectCoords: {
      startX: 1334.001953125,
      startY: 798.00390625,
      width: 48,
      height: 42
    }, // Correct
    imageWidth: 1500,
    imageHeight: 1000
  },
  {
    image:
      'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720833936/Nicky/all_image_focus_nh5yoi.jpg?_s=public-apps',
    text: 'Most Image Focus',
    rectCoords: {
      startX: 23.001953125,
      startY: 36.37890625,
      width: 1450,
      height: 933
    }, // Correct
    imageWidth: 1500,
    imageHeight: 1000
  }
];

export const Main: React.FC = () => {
  const { fps } = useVideoConfig();
  const holdDuration = 3 * fps; // Duration to hold the image and text visible after transition
  const transitionDuration = 0.3 * fps; // Duration for quick transition
  const initialDuration = 1 * fps; // Duration for the initial transition

  return (
    <AbsoluteFill className='bg-white'>
      {sequences.map((seq, index) => {
        const fromFrame = index * holdDuration;
        const toFrame = fromFrame + holdDuration;

        const nextSeq = sequences[index + 1];
        const prevSeq = sequences[index - 1];

        return (
          <Sequence
            key={index}
            from={fromFrame}
            durationInFrames={toFrame - fromFrame}
          >
            <ImageWithText
              image={seq.image}
              rectCoords={seq.rectCoords}
              nextRectCoords={nextSeq ? nextSeq.rectCoords : seq.rectCoords}
              prevRectCoords={prevSeq ? prevSeq.rectCoords : seq.rectCoords}
              imageWidth={seq.imageWidth}
              imageHeight={seq.imageHeight}
              text={seq.text}
              index={index}
              holdDuration={holdDuration}
              transitionDuration={transitionDuration}
              initialDuration={initialDuration}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export default Main;







// const sequences: SequenceData[] = [
//   {
//     image:
//       'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720832602/Nicky/center_focus_hpwkf5.jpg?_s=public-apps',
//     text: 'Center Focus',
//     rectCoords: {
//       startX: 356.001953125,
//       startY: 232.37890625,
//       width: 208,
//       height: 159
//     }, // Correct
//     imageWidth: 960,
//     imageHeight: 540
//   },
//   {
//     image:
//       'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720832599/Nicky/center-right-focus_qusmma.jpg?_s=public-apps',
//     text: 'Center Right Focus',
//     rectCoords: {
//       startX: 762.001953125,
//       startY: 152.37890625,
//       width: 168,
//       height: 246
//     },
//     imageWidth: 960,
//     imageHeight: 540
//   },
//   {
//     image:
//       'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720832597/Nicky/top-left-corner_kbjttu.jpg?_s=public-apps',
//     text: 'Top left corner',
//     rectCoords: {
//       startX: 13.001953125,
//       startY: 17.37890625,
//       width: 87,
//       height: 206
//     }, // Correct
//     imageWidth: 960,
//     imageHeight: 540
//   },
//   {
//     image:
//       'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720472897/pexels-eberhardgross-26853148_e5bydj_c_crop_w_1920_h_1080_nwbru0.jpg?_s=public-apps',
//     text: 'Bottom Left Corner',
//     rectCoords: { startX: 10, startY: 1020, width: 100, height: 50 }, // Correct
//     imageWidth: 1920,
//     imageHeight: 1080
//   },
//   {
//     image:
//       'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720472897/pexels-eberhardgross-26853148_e5bydj_c_crop_w_1920_h_1080_nwbru0.jpg?_s=public-apps',
//     text: 'Bottom Right Corner',
//     rectCoords: { startX: 1810, startY: 1020, width: 100, height: 50 }, // Correct
//     imageWidth: 1920,
//     imageHeight: 1080
//   },
//   {
//     image:
//       'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720472897/pexels-eberhardgross-26853148_e5bydj_c_crop_w_1920_h_1080_nwbru0.jpg?_s=public-apps',
//     text: 'Very Small Rectangle Top Center',
//     rectCoords: { startX: 910, startY: 50, width: 100, height: 50 }, // Correct
//     imageWidth: 1920,
//     imageHeight: 1080
//   },
//   {
//     image:
//       'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720472897/pexels-eberhardgross-26853148_e5bydj_c_crop_w_1920_h_1080_nwbru0.jpg?_s=public-apps',
//     text: 'Edge Case at Bottom Center',
//     rectCoords: { startX: 910, startY: 980, width: 100, height: 100 }, // Correct
//     imageWidth: 1920,
//     imageHeight: 1080
//   },
//   {
//     image:
//       'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720472897/pexels-eberhardgross-26853148_e5bydj_c_crop_w_1920_h_1080_nwbru0.jpg?_s=public-apps',
//     text: 'Top Center Narrow Focus',
//     rectCoords: { startX: 910, startY: 100, width: 100, height: 300 }, // Correct
//     imageWidth: 1920,
//     imageHeight: 1080
//   },
//   {
//     image:
//       'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720472897/pexels-eberhardgross-26853148_e5bydj_c_crop_w_1920_h_1080_nwbru0.jpg?_s=public-apps',
//     text: 'Center Right Narrow Vertical',
//     rectCoords: { startX: 1700, startY: 340, width: 100, height: 400 }, // Correct
//     imageWidth: 1920,
//     imageHeight: 1080
//   },
//   {
//     image:
//       'https://res.cloudinary.com/ddue2t3ue/image/upload/fl_preserve_transparency/v1720472897/pexels-eberhardgross-26853148_e5bydj_c_crop_w_1920_h_1080_nwbru0.jpg?_s=public-apps',
//     text: 'Center Left Narrow Vertical',
//     rectCoords: { startX: 120, startY: 340, width: 100, height: 400 }, // Correct
//     imageWidth: 1920,
//     imageHeight: 1080
//   }
// ];