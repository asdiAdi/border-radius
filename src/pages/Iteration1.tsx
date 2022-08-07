import React, { BaseSyntheticEvent } from 'react';
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
// test
let first = false;
let value = {
  'top-slider': [20, 80],
  'bottom-slider': [20, 80],
  'left-slider': [20, 80],
  'right-slider': [20, 80]
};
let thumbSwitch = {
  'top-slider': false,
  'bottom-slider': false,
  'left-slider': false,
  'right-slider': false
};
let currentActiveThumb = 0;
// endTest

export default function Iteration1() {
  // const [value, setValue] = React.useState<sliderType>({
  //   'top-slider': [20, 80],
  //   'bottom-slider': [20, 80],
  //   'left-slider': [20, 80],
  //   'right-slider': [20, 80]
  // });
  // const [thumbSwitch, setThumbSwitch] = React.useState<sliderType>({
  //   'top-slider': false,
  //   'bottom-slider': false,
  //   'left-slider': false,
  //   'right-slider': false
  // });
  // const [currentActiveThumb, setCurrentActiveThumb] = React.useState<number>(0);
  const [how, setHow] = React.useState(['Hello World']);
  const [boxWidth, setBoxWidth] = React.useState(320);
  const [boxHeight, setBoxHeight] = React.useState(320);
  React.useEffect(() => {
    //([topLeft, topRight, bottomRight, bottomLeft, slash, leftTop, rightTop, rightBottom, leftBottom]);
    // test
    // if (!first) {
    //   console.log(value['top-slider']);
    //   console.log(thumbSwitch['top-slider']);
    //   console.log(currentActiveThumb);
    //   if (value['top-slider'][1] !== 90)first = true;
    // }
    // endTest
    document.getElementById('box')!.style.borderRadius = `${value['top-slider'][0]}% ${100 - value['top-slider'][1]}% ${100 - value['bottom-slider'][1]}% ${value['bottom-slider'][0]}% / ${100 - value['left-slider'][1]}% ${100 - value['right-slider'][1]}% ${value['right-slider'][0]}% ${value['left-slider'][0]}%`;
    document.getElementById('box')!.innerText = value['top-slider'].toString();
    document.getElementById('box')!.style.width = `${boxWidth}px`;
    document.getElementById('box')!.style.height = `${boxHeight}px`;
    document.getElementById('box-container')!.style.maxHeight = `${boxHeight}px`;
    document.getElementById('slider-container-top')!.style.width = `${boxWidth*3}px`;
    document.getElementById('slider-container-bottom')!.style.width = `${boxWidth*3}px`;
    document.getElementById('slider-container-left')!.style.height = `${boxHeight*3}px`;
    document.getElementById('slider-container-right')!.style.height = `${boxHeight*3}px`;
    let mainContainerElement = document.getElementById('main-container')!;
    console.log(parseInt(getComputedStyle(mainContainerElement).height))
    if(boxHeight*3 > parseInt(getComputedStyle(mainContainerElement).height)) mainContainerElement.style.height = `${boxHeight*4}px`;
    else mainContainerElement.style.height = `100vh`;
  });
  const handleChange = (event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[], target: keyof (sliderType), activeThumb?: number) => {
    newValue = newValue as number[];
    if (event.type === "mousedown" && activeThumb !== undefined) {
      // setCurrentActiveThumb(activeThumb);
      currentActiveThumb = activeThumb;
    }
    else if (activeThumb !== currentActiveThumb && activeThumb !== undefined) {
      thumbSwitch[target] = !thumbSwitch[target];
      // setThumbSwitch(thumbSwitch);
      // setCurrentActiveThumb(activeThumb);
      currentActiveThumb = activeThumb;
    }
    if (thumbSwitch[target]) [newValue[0], newValue[1]] = [newValue[1], newValue[0]];
    value[target] = newValue;
    if (newValue[0] < 0) value[target] = [0, newValue[1]];
    if (newValue[1] > 100) value[target] = [newValue[0], 100];
    // setValue(value);
    setHow(['Idk why but it needs this to work']);
  };

  const handleWidthChange = (event: BaseSyntheticEvent) => setBoxWidth(event.target.value);
  const handleHeightChange = (event: BaseSyntheticEvent) => setBoxHeight(event.target.value);
  
  return (
    <div id='main-container' className="h-screen flex justify-center content-center bg-slate-300 flex-wrap">
      <div className='w-full flex justify-center flex-wrap'>
        <div id='slider-container-top' className='h-min flex justify-center'>
          <Slider value={value['top-slider']} onChange={(e, v, a) => handleChange(e, v, 'top-slider', a)} onChangeCommitted={(e, v) => handleChange(e, v, 'top-slider')} size="medium" step={1} min={-100} max={200} marks={[{ value: 0 }, { value: 100 }]} sx={{
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
            '& .MuiSlider-mark': {
              height: '5px',
              width: '5px'
            }
          }} />
        </div>
        <div className='w-full h-min'></div>
        {/*box*/}
        <div id='box-container' className='flex justify-center w-full max-h-80'>
          <div id='slider-container-left' className='w-min flex justify-center self-center'>
            <Slider value={value['left-slider']} onChange={(e, v, a) => handleChange(e, v, 'left-slider', a)} onChangeCommitted={(e, v) => handleChange(e, v, 'left-slider')} size="medium" step={1} min={-100} max={200} marks={[{ value: 0 }, { value: 100 }]} orientation="vertical" sx={{
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
              '& .MuiSlider-mark': {
                height: '5px',
                width: '5px'
              }
            }} />
          </div>
          <Box id='box' className='bg-orange-400 w-80 flex flex-wrap' />
          <div id='slider-container-right' className='w-min flex justify-center self-center'>
            <Slider value={value['right-slider']} onChange={(e, v, a) => handleChange(e, v, 'right-slider', a)} onChangeCommitted={(e, v) => handleChange(e, v, 'right-slider')} size="medium" step={1} min={-100} max={200} marks={[{ value: 0 }, { value: 100 }]} orientation="vertical" sx={{
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
              '& .MuiSlider-mark': {
                height: '5px',
                width: '5px'
              }
            }} />
          </div>
        </div>
        <div className='w-full h-min'></div>
        <div id='slider-container-bottom' className='h-min flex justify-center'>
          <Slider value={value['bottom-slider']} onChange={(e, v, a) => handleChange(e, v, 'bottom-slider', a)} onChangeCommitted={(e, v) => handleChange(e, v, 'bottom-slider')} size="medium" step={1} min={-100} max={200} marks={[{ value: 0 }, { value: 100 }]} sx={{
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
            '& .MuiSlider-mark': {
              height: '5px',
              width: '5px'
            }
          }} />
        </div>
        <div className='w-full flex justify-center mt-4'>
          <TextField label="border-radius" size="small" defaultValue={`Hello World!`} InputProps={{ readOnly: true }} />
        </div>
        <div className='w-64 flex justify-center mt-4'>
          <TextField label="width(px)" size="small" value={boxWidth.toString()} onChange={handleWidthChange}/>
          <div className='w-4 h-min'></div>
          <TextField label="height(px)" size="small" value={boxHeight.toString()} onChange={handleHeightChange}/>
        </div>
      </div>

    </div>
  );
}