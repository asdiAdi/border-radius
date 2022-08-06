import React from 'react';
import Slider from '@mui/material/Slider';
import './App.css';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

type sliderType = {
  'top-slider': any,
  'bottom-slider': any,
  'left-slider': any,
  'right-slider': any
}

export default function AppUserReducer() {
  const [value, setValue] = React.useState<sliderType>({
    'top-slider': [10, 90],
    'bottom-slider': [10,10],
    'left-slider': [10,10],
    'right-slider': [10,10]
  });
  // const [thumbSwitch, setThumbSwitch] = React.useState<sliderType>({
  //   'top-slider': false,
  //   'bottom-slider': false,
  //   'left-slider': false,
  //   'right-slider': false
  // });
  // const [currentActiveThumb, setCurrentActiveThumb] = React.useState<number>(0);
  const [topValue, setTopValue]= React.useState(value['top-slider']);
  React.useEffect(()=> {
    // setBorderRadius([topLeft, topRight, bottomRight, bottomLeft, slash, leftTop, rightTop, rightBottom, leftBottom]);
    // let borderRadius = `${value['top-slider'][0]}% ${100-value['top-slider'][1]}% ${100-value['bottom-slider'][1]}% ${value['bottom-slider'][0]}% / ${value['left-slider'][0]}% ${100-value['right-slider'][1]}% ${value['right-slider'][0]}% ${100-value['left-slider'][1]}%`;
    // document.getElementById('box')!.style.borderRadius = `${value['top-slider'][0]}% ${100-value['top-slider'][1]}% 10% 10% / 10% 10% 10% 10%`;
    document.getElementById('box')!.innerHTML = value['top-slider']
  });
  const handleChange = (event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[], target:keyof(sliderType), activeThumb?: number) => {
    newValue = newValue as number[]; 
    // if (event.type === "mousedown" && activeThumb !== undefined) {
    //   setCurrentActiveThumb(activeThumb);
    // } 
    // else if (activeThumb !== currentActiveThumb && activeThumb !== undefined) {
    //   thumbSwitch[target]  = !thumbSwitch[target];
    //   setThumbSwitch(thumbSwitch);
    //   setCurrentActiveThumb(activeThumb);
    // }
    // if(thumbSwitch[target]) [newValue[0], newValue[1]] = [newValue[1], newValue[0]];
    // if (newValue[0] < 0) value[target] = [0, newValue[1]];
    // else if (newValue[1] > 100) value[target] = [newValue[0], 100];
    // else value[target] = newValue;
    value[target] = newValue;
    
    setValue(value);
    setTopValue(value['top-slider'])
  };

  return (
    <div className="h-screen flex justify-center content-center bg-slate-300 flex-wrap">
      <div className='w-full flex justify-center flex-wrap'>
        <div className='w-[60rem] h-min flex justify-center'>
          <Slider value={value['top-slider']} onChange={(e, v, a) => handleChange(e, v, 'top-slider', a)}  onChangeCommitted={(e, v) => handleChange(e, v, 'top-slider')} size="medium" step={1} min={-100} max={200} marks={[{value: 0},{value: 100}]}  sx={{
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
        <Box id='box' className='bg-orange-400 w-80 aspect-square flex flex-wrap'/>
        <div className='w-full flex justify-center mt-4'>
          <TextField label="border-radius" size="small" defaultValue={`Hello World!`} InputProps={{ readOnly: true }} />
        </div>
      </div>

    </div>
  );
}