import React from 'react';

const Rectangle = ({ x1, y1, rectWidth, rectHeight, index }) => {
    const styles = {
        rectangle: {
            fill: 'lightsteelblue',
            opacity: '50%',
        }
    }

    return (
        <svg key={`rect-${index}`} style={{width:"100%", height:`${rectHeight}`,position: "absolute", top:0, left:0}}>
            <rect id="box" style={styles.rectangle} x={x1} y={y1} width={rectWidth} height={rectHeight}/>
        </svg>
    )
}

export default Rectangle;