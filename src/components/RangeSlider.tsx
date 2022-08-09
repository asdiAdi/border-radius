import React, { SyntheticEvent } from 'react';
import Slider from '@mui/material/Slider';

interface IRangeSlider {
    initValue: number[];
    onChange: (borderVal: number[]) => void;
    id: string;
    className: string;
    orientation: 'horizontal'|'vertical';
}

export default function RangeSlider({initValue = [10, 90], onChange, id, className, orientation = 'horizontal'}: Partial<IRangeSlider>) {
    const [value, setValue] = React.useState(initValue)
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
        if (newValue[0] < -50) newValue = [-50, newValue[1]];
        if (newValue[1] > 150) newValue = [newValue[0], 150];
        setValue(newValue);
        if (onChange !== undefined && value !== undefined) onChange([value[0], value[1]]);
    }

    return (
        <div id={id} className={className}>
            <Slider value={value} onChange={handleChange} onChangeCommitted={handleChange} track={false} orientation={orientation} size="medium" step={1} min={-100} max={200} marks={[{ value: -50 }, { value: 150 }, {value:-100}, {value:200}]} sx={{
                padding: '0px',
                height: orientation === 'horizontal' ? '4px': null,
                width: orientation === 'vertical' ? '4px': null,
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
                    backgroundColor: '#0ff'
                },
                '& .MuiSlider-track': {
                    // opacity: 0,
                    // height: orientation === 'horizontal' ? '4px': null,
                    // width: orientation === 'vertical' ? '4px': null,
                },
                '& .MuiSlider-mark': {
                    height: '5px',
                    width: '5px'
                }             
            }} />
        </div>
    );
}

// default props for functional components
// RangeSlider.defaultProps ={
//     value: [40,80], 
//     orientation: 'horizontal'
// }