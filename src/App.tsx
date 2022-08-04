import React from 'react';
import Slider from '@mui/material/Slider';
import './App.css';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

export default function App() {
  const [topValue, setTopValue] = React.useState<number[]>([10, 90]);
  const [topThumbSwitch, setTopThumbSwitch] = React.useState<boolean>(false);
  const [currentActiveThumb, setCurrentActiveThumb] = React.useState<number>(0);
  const [pastTarget, setPastTarget] = React.useState<string>("bottom-slider");
  const [bottomValue, setBottomValue] = React.useState<number[]>([10, 90]);
  const [borderRadius, setBorderRadius] = React.useState<string[]>(['10%', '10%', '0%', '0%', '/', '40%', '40%', '0%', '0%']);
  const handleChange = (event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[], activeThumb?: number) => {
    let [topLeft, topRight, bottomRight, bottomLeft, slash, leftTop, rightTop, rightBottom, leftBottom] = borderRadius;
    let targetName = (event.target as HTMLInputElement).name;
    let eventValue = (event.target as HTMLInputElement).value as unknown as number[];
    if (event.type === "mousedown" && activeThumb !== undefined) {
      setCurrentActiveThumb(activeThumb);
    } else if (activeThumb != undefined && activeThumb !== currentActiveThumb) {
      setCurrentActiveThumb(currentActiveThumb === 0 ? 1 : 0);
      if (targetName === "top-slider" || pastTarget === "top-slider") setTopThumbSwitch(!topThumbSwitch);
    }
    if (targetName === "top-slider" || pastTarget === "top-slider") {
      // console.log(eventValue);
      // console.log(topValue);
      // console.log("")
      setTopValue(newValue as number[]);
      if (!topThumbSwitch) {
        topLeft = topValue[0].toString() + '%';
        topRight = (100 - topValue[1]).toString() + '%';
      } else {
        topLeft = topValue[1].toString() + '%';
        topRight = (100 - topValue[0]).toString() + '%';
      }
      // if (topLeft < '0') topLeft = '0%';
      // if (topRight < '0') topRight = '0%';
    } else if (targetName === "bottom-slider") {
      setBottomValue(newValue as number[]);
    }
    let x = newValue as number[];
    if (x[0] < 0) {setTopValue([0, x[1]]);}
    if (x[1] < 0) setTopValue([x[0], 0]);
    console.log(topValue)
    console.log(newValue)
    console.log("")
    setBorderRadius([topLeft, topRight, bottomRight, bottomLeft, slash, leftTop, rightTop, rightBottom, leftBottom]);
    setPastTarget(targetName);
  };

  return (
    <div className="h-screen flex justify-center content-center bg-slate-300 flex-wrap">
      <div className='w-full flex justify-center flex-wrap'>
        <div className='w-[60rem] h-min flex justify-center'>
          <Slider id="top-slider" name="top-slider" value={topValue} onChange={handleChange} onChangeCommitted={handleChange} size="medium" step={1} min={-100} max={200} marks={[{value: 0},{value: 100}]} valueLabelDisplay='on' sx={{
            padding: '0',
            '& .MuiSlider-thumb': {
              '&:hover, &.Mui-focusVisible, &.Mui-active': {
                boxShadow: `0px 0px 0px 0px`,
              },
              '&:after': {
                borderRadius: '0px',
                width: '0px',
                height: '0px'
              },
              borderRadius: '0px',
              height: '16px',
              width: '16px',
            },
            '& .MuiSlider-track, .MuiSlider-rail': {
              // opacity: 0
            },
            '& .MuiSlider-mark':{
              height: '5px',
              width: '5px'
            }
          }} />
        </div>
        <div className='w-full h-min'></div>
        <Box className='bg-orange-400 w-80 aspect-square flex flex-wrap' sx={{ borderRadius: borderRadius.join(' ') }}/>
        <div className='w-full flex justify-center mt-4'>
          <TextField label="border-radius" size="small" defaultValue={"hello world"} InputProps={{ readOnly: true }} />
        </div>
      </div>

    </div>
  );
}