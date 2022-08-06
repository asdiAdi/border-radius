import React, { SyntheticEvent } from 'react';
import Slider from '@mui/material/Slider';

// let currentActiveThumb = 0;
// let thumbSwitch = false;
export default function RangeSlider(prop: {onChange?: (borderVal: number[]) => void, id?: string, className?: string }) {
    const [value, setValue] = React.useState([20, 80])
    const [currentActiveThumb, setCurrentActiveThumb] = React.useState(0)
    const [thumbSwitch, setThumbSwitch] = React.useState(false)
    const handleChange = (event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[], activeThumb?: number) => {
        newValue = newValue as number[];
        if (event.type === "mousedown" && activeThumb !== undefined) setCurrentActiveThumb(activeThumb);
        else if (activeThumb !== currentActiveThumb && activeThumb !== undefined) {
            setThumbSwitch(!thumbSwitch);
            setCurrentActiveThumb(activeThumb);
        }
        if (thumbSwitch) [newValue[0], newValue[1]] = [newValue[1], newValue[0]];
        if (newValue[0] < 0) newValue = [0, newValue[1]];
        if (newValue[1] > 100) newValue = [newValue[0], 100];
        setValue(newValue);
        if(prop.onChange!==undefined) {
            // borderVal= [1,3];
        }
    }
    
    return (
        <div id={prop.id} className={`h-min flex justify-center ${prop.className}`}>
            <Slider value={value} onChange={handleChange} onChangeCommitted={handleChange} size="medium" step={1} min={-100} max={200} marks={[{ value: 0 }, { value: 100 }]} sx={{
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
    );
}