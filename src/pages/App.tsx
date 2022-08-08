import React from 'react';
import './App.css';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import RangeSlider from '../components/RangeSlider';
import Button from '@mui/material/Button';

function scaleSlider(num: number[]) {
  // mutable
  num[1] = 100 - num[1];
  // from -50 to 150 && from 150 to 200 or -50 to -100
  if (num[0] <= 150) num[0] = Math.round((num[0] + 50) * 100 / 200);
  else num[0] = (num[0] - 100) * 2;
  if (num[1] <= 150) num[1] = Math.round((num[1] + 50) * 100 / 200);
  else num[1] = (num[1] - 100) * 2;
}

function combineScaleSlider([...top]: number[], [...left]: number[], [...right]: number[], [...bottom]: number[]): string {
  scaleSlider(top);
  scaleSlider(left);
  scaleSlider(right);
  scaleSlider(bottom);
  return `${top[0]}%${top[1]}%${bottom[1]}%${bottom[0]}%/${left[1]}%${right[1]}%${right[0]}%${left[0]}%`;
}
 
export default function App() {
  // state hooks
  const [topSlider, setTopSlider] = React.useState([-30, 130]);
  const [leftSlider, setLeftSlider] = React.useState([-30, 130]);
  const [rightSlider, setRightSlider] = React.useState([-30, 130]);
  const [bottomSlider, setBottomSlider] = React.useState([-30, 130]);
  const [combinedBorderRadius, setCombinedBorderRadius] = React.useState(combineScaleSlider(topSlider, leftSlider, rightSlider, bottomSlider));
  const [boxWidth, setBoxWidth] = React.useState(450);
  const [boxHeight, setBoxHeight] = React.useState(450);
  const [initialDocumentHeight, setInitialDocumentHeight] = React.useState<number>();
  const [initialDocumentWidth, setInitialDocumentWidth] = React.useState<number>();
  

  // effect hooks
  React.useEffect(() => {
    setInitialDocumentHeight(document.body.clientHeight);
    setInitialDocumentWidth(document.body.clientWidth);
  },[]) //allows useEffect to only run once
  React.useEffect(() => {
    let boxElement = document.getElementById('box')!;
    setCombinedBorderRadius(combineScaleSlider(topSlider, leftSlider, rightSlider, bottomSlider));
    if (combinedBorderRadius) boxElement.style.borderRadius = combinedBorderRadius;
  }, [topSlider, bottomSlider, leftSlider, rightSlider, combinedBorderRadius]);
  React.useEffect(() => {
    let boxElement = document.getElementById('box')!;
    document.getElementById('box-container')!.style.maxHeight = `${boxHeight}px`;
    boxElement.style.width = `${boxWidth}px`;
    boxElement.style.height = `${boxHeight}px`;
    document.getElementById('top-slider')!.style.width = `${boxWidth * 1.5}px`;
    document.getElementById('bottom-slider')!.style.width = `${boxWidth * 1.5}px`;
    document.getElementById('left-slider')!.style.height = `${boxHeight * 1.5}px`;
    document.getElementById('right-slider')!.style.height = `${boxHeight * 1.5}px`;

    // height
    let mainContainerElement = document.getElementById('main-container')!;
    let mainContainerHeight = parseInt(getComputedStyle(mainContainerElement).height);
    if(boxHeight * 1.5 +208 > mainContainerHeight) mainContainerElement.style.height = `${boxHeight * 1.5 +250}px`;
    else if(boxHeight * 1.5 +250 < mainContainerHeight && initialDocumentHeight && boxHeight * 1.5 +208 > initialDocumentHeight) mainContainerElement.style.height = `${boxHeight * 1.5 +208}px`;
    else if(initialDocumentHeight) mainContainerElement.style.height = `${initialDocumentHeight}px`;

    // width
    let mainContainerWidth = parseInt(getComputedStyle(mainContainerElement).width);
    if(boxWidth * 1.5 + 10> mainContainerWidth) mainContainerElement.style.width = `${boxWidth * 1.5 +50}px`;
    else if(boxWidth * 1.5 + 50 < mainContainerWidth && initialDocumentWidth && boxWidth * 1.5 + 10 > initialDocumentWidth) mainContainerElement.style.width = `${boxWidth * 1.5 +10}px`;
    else if(initialDocumentWidth) mainContainerElement.style.width = `${initialDocumentWidth}px`;
  }, [boxWidth, boxHeight, document.body.clientHeight]);

  // callback functions
  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let targetVal = parseInt(event.target.value);
    setBoxWidth(targetVal >= 0 ? targetVal : 0);
    event.target.value = "0";
  };
  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let targetVal = parseInt(event.target.value);
    setBoxHeight(targetVal >= 0 ? targetVal : 0)
    event.target.value = "0";
  };
  async function copyToClipboard() {
    await navigator.clipboard.writeText(combinedBorderRadius);
    // alert
  }

  return (
    <div id='main-container' className="h-screen flex justify-center content-center bg-slate-300 flex-wrap">
      <div className='w-full flex justify-center flex-wrap'>
        <RangeSlider id='top-slider' className='h-min flex justify-center' initValue={topSlider} onChange={setTopSlider} />
        <div id='box-container' className='flex justify-center w-full -mt-[2px]'>
          <RangeSlider id='left-slider' className='h-min flex justify-center self-center -mr-[2px]' initValue={leftSlider} onChange={setLeftSlider} orientation='vertical' />
          <Box id='box' className='bg-orange-400 w-80 flex flex-wrap' />
          <RangeSlider id='right-slider' className='h-min flex justify-center self-center -ml-[2px]' initValue={rightSlider} onChange={setRightSlider} orientation='vertical' />
        </div>
        <RangeSlider id='bottom-slider' className='h-min flex justify-center -mt-[2px]' initValue={bottomSlider} onChange={setBottomSlider} />
      </div>
      <div className='w-full flex justify-center mt-28'>
          <TextField className='w-80' label="border-radius" size="small" multiline={true} value={combinedBorderRadius} InputProps={{ readOnly: true }} sx={{
            '& .MuiInputBase-root': {
              borderRadius: '4px 0% 0% 4px / 4px 0% 0% 4px'
            },
            '& .MuiInputBase-input': {
              textAlign: 'center'
            }
          }} />
          <Button variant="contained" onClick={copyToClipboard} sx={{ borderRadius: '0% 4px 4px 0% / 0% 4px 4px 0%', width: '2rem' }}>COPY</Button>
        </div>
        <div className='w-72 flex justify-center mt-4'>
          <TextField label="width(px)" size="small" type="number" value={boxWidth} onChange={handleWidthChange} />
          <div className='w-4 h-min'></div>
          <TextField label="height(px)" size="small" type="number" value={boxHeight} onChange={handleHeightChange} />
        </div>
    </div>
  );
}