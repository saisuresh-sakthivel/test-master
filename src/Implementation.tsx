import { useEffect, useMemo, useRef, useState } from 'react';
import FloorPlan from './FloorPlan';
import { getRandomHexColor, hexColorToGeneralName } from './utils/colors';
type color = {
    hexcolor:string,
    label:string
}
const Implementation = () =>{ 
    const [floorPanelStyle,setfloorPaneStyle] = useState('floor_panel');
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [randomColors,setRandomColors] = useState<color[]>([]);
    const handleClick = () => {
        setfloorPaneStyle(floorPanelStyle === 'floor_panel' ? 'floor_panel rotate' : 'floor_panel');
    }
    const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        setSelectedColor(event.target.value);
    }
    useEffect(() => {
        const arr:color[] = Array.from({ length: 5 }, () => {
            const hexcolor = getRandomHexColor();
            const label = hexColorToGeneralName(hexcolor);
            return { hexcolor, label };
        });
        setRandomColors(arr);
    }, []);
    const generateSelect = useMemo(() => {
        if(randomColors.length === 0){
            return null;
        }
        return (
            <select value={selectedColor} onChange={handleChange}>
                {randomColors.map((item)=>{
                    return (<option key={item.hexcolor} value={item.hexcolor}>{item.label}</option>)
                })}
            </select>
        )
    },[randomColors,selectedColor]);
    return (
        <div className="impl">
            <div className="tool_panel">
                <div className = "tool_box">
                <div className = "tool_left">
                <div>Rotate Floor Plan</div>
                <div><button className="tool_button" onClick={handleClick}>toggle</button></div>
                </div>
                <div className = "tool_right">
                    <div>locationcolor</div>
                    {generateSelect}
                </div>
                </div>
            </div>
            <div className={floorPanelStyle}>
               <FloorPlan col={selectedColor}/>
            </div>
        </div>
    )
}
export default Implementation;