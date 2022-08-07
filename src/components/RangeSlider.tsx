import React, { SyntheticEvent } from 'react';
import Slider from '@mui/material/Slider';

// let currentActiveThumb = 0;
// let thumbSwitch = false;

interface IRangeSlider {
    value: number[];
    onChange: (borderVal: number[]) => void;
    id: string;
    className: string;
    orientation: 'horizontal'|'vertical';
}

// type RangeSliderType =  {
//     value: number[];
//     onChange: (borderVal: number[]) => void;
//     id: string;
//     className: string;
//     orientation: 'horizontal'|'vertical';
// }    

function scaleFunction(num: number[]): number[] {
    console.log(num)
    return [num[0],100- num[1]];
}

export default function RangeSlider({value = [10, 10], onChange, id, className, orientation = 'horizontal'}: Partial<IRangeSlider>) {
    // const [val, setVal] = React.useState([value[0], 100-value[1]])
    const [val, setVal] = React.useState(scaleFunction([0,0]))
    const [currentActiveThumb, setCurrentActiveThumb] = React.useState(0)
    const [thumbSwitch, setThumbSwitch] = React.useState(false)
    // useEffect that runs only once since orientation doesnt change
    // React.useEffect(() => {
    //     if (orientation == 'horizontal') document.getElementById('bottom-slider')!.style.width = `${boxWidth*3}px`;
    // },[orientation]);

    const handleChange = (event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[], activeThumb?: number) => {
        newValue = newValue as number[];

        let test  = newValue.map((num) => Math.round((num+50)/2));
        // console.log(test)
        // console.log(newValue)
        // console.log("")

        if (event.type === "mousedown" && activeThumb !== undefined) setCurrentActiveThumb(activeThumb);
        else if (activeThumb !== currentActiveThumb && activeThumb !== undefined) {
            setThumbSwitch(!thumbSwitch);
            setCurrentActiveThumb(activeThumb);
        }
        if (thumbSwitch) [newValue[0], newValue[1]] = [newValue[1], newValue[0]];
        if (newValue[0] < -50) newValue = [-50, newValue[1]];
        if (newValue[1] > 150) newValue = [newValue[0], 150];
        setVal(newValue);
        if (onChange !== undefined && value !== undefined) onChange([test[0], 100-test[1]]);
    }

    return (
        <div id={id} className={className}>
            <Slider valueLabelDisplay={'on'} value={val} onChange={handleChange} onChangeCommitted={handleChange} orientation={orientation} size="medium" step={1} min={-100} max={200} marks={[{ value: -50 }, { value: 150 }]} sx={{
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
                },
                '& .MuiSlider-track, .MuiSlider-rail': {
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