import React, { BaseSyntheticEvent } from 'react';
import './App.css';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import RangeSlider from '../components/RangeSlider';
import Button from '@mui/material/Button';

export default function App() {
  // state hooks
  const [topSlider, setTopSlider] = React.useState([10, 10]);
  const [leftSlider, setLeftSlider] = React.useState([10, 10]);
  const [rightSlider, setRightSlider] = React.useState([10, 10]);
  const [bottomSlider, setBottomSlider] = React.useState([10, 10]);
  const [combinedBorderRadius, setCombinedBorderRadius] = React.useState('10%10%10%10%/10%10%10%10%');
  const [boxWidth, setBoxWidth] = React.useState(320);
  const [boxHeight, setBoxHeight] = React.useState(320);
  // const textAreaRef = React.useRef(null);

  React.useEffect(() => {
    let boxElement = document.getElementById('box')!;
    setCombinedBorderRadius(`${topSlider[0]}%${topSlider[1]}%${bottomSlider[1]}%${bottomSlider[0]}%/${leftSlider[1]}%${rightSlider[1]}%${rightSlider[0]}%${leftSlider[0]}%`);
    if (combinedBorderRadius) boxElement.style.borderRadius = combinedBorderRadius;
    boxElement.style.width = `${boxWidth}px`;
    boxElement.style.height = `${boxHeight}px`;
    document.getElementById('box-container')!.style.maxHeight = `${boxHeight}px`;
    document.getElementById('top-slider')!.style.width = `${boxWidth * 1.5}px`;
    document.getElementById('bottom-slider')!.style.width = `${boxWidth *  1.5}px`;
    document.getElementById('left-slider')!.style.height = `${boxHeight * 1.5}px`;
    document.getElementById('right-slider')!.style.height = `${boxHeight * 1.5}px`;
    // let mainContainerElement = document.getElementById('main-container')!;
    // if(boxHeight*3 > parseInt(getComputedStyle(mainContainerElement).height)) mainContainerElement.style.height = `${boxHeight*4}px`;
    // else mainContainerElement.style.height = `100vh`;
  }, [topSlider, bottomSlider, leftSlider, rightSlider, boxWidth, boxHeight]);


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

  
  async function copyToClipboard ()  {
    await navigator.clipboard.writeText(combinedBorderRadius);

    // alert
  }

  return (
    <div id='main-container' className="h-screen flex justify-center content-center bg-slate-300 flex-wrap">
      <div className='w-full flex justify-center flex-wrap'>

        <RangeSlider id='top-slider' className='h-min flex justify-center' value={topSlider} onChange={setTopSlider} />
        <div id='box-container' className='flex justify-center w-full -mt-[2px]'>
          <RangeSlider id='left-slider' className='h-min flex justify-center self-center -mr-[2px]' value={leftSlider} onChange={setLeftSlider} orientation='vertical' />
          <Box id='box' className='bg-orange-400 w-80 flex flex-wrap' />
          <RangeSlider id='right-slider' className='h-min flex justify-center self-center -ml-[2px]' value={rightSlider} onChange={setRightSlider} orientation='vertical' />
        </div>
        <RangeSlider id='bottom-slider' className='h-min flex justify-center -mt-[2px]' value={bottomSlider} onChange={setBottomSlider} />

        <div className='w-full flex justify-center mt-8'>
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
    </div>
  );
}