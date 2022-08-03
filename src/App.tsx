import React from 'react';
import Slider from '@mui/material/Slider';
import { alpha, styled } from '@mui/material/styles';
import './App.css';

export default function App() {
  const [value, setValue] = React.useState<number>(50);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    console.log(newValue)
  };
  return (
    <div className="h-screen flex justify-center content-center bg-slate-300 flex-wrap">
      <div className='w-full flex justify-center'>
        <div className='bg-orange-400 h-24 w-24 rounded-[30%40%30%40%/20%20%30%30%] flex'>
          <div className='w-full self-start -mt-4'>
            <Slider value={value} onChange={handleChange} size="small" step={10} sx={{
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
                height: '5px',
                width: '5px',
              },
            }} />
          </div>
        </div>
      </div>

      <div className='w-24 '>

      </div>

    </div>
  );
}