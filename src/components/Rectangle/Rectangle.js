import React from 'react';

// Component to draw the rectangle
// params: x1 = indicates the position where the mouse went down
// rectWidht = the width for the rectangle
// rectHeight = the height for the rectangle
const Rectangle = ({ x1, rectWidth, rectHeight }) => {
    const styles = {
        rectangle: {
            fill: 'lightsteelblue',
            opacity: '50%',
        }
    }

    return (
        <svg style={{width:"100%", height:`${rectHeight}`,position: "absolute", top:0, left:0}}>
            <rect id="box" style={styles.rectangle} x={x1}  width={rectWidth} height={rectHeight}/>
        </svg>
    )
}

export default Rectangle;