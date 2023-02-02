import React, { useRef, useState  } from 'react';
import styled from 'styled-components';
import { SineWave, Rectangle } from 'components';


const Container = styled.div`
    position: relative;
`;

// The Overlay is a div that lies on top of the chart to capture mouse events
const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: 'blue';
`;

// The chart canvas will be the same height/width as the ChartWrapper
// https://www.chartjs.org/docs/3.2.1/configuration/responsive.html#important-note
const ChartWrapper = styled.div``;

const SignalView = () => {
    const [events, setEvents] = useState([])
    let currentEvent = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        height: 0
    }
    // Access the height of the chart as chartWrapperRef.current?.clientHeight to determine the height to set on events
    const chartWrapperRef = useRef();

    const handleOverlayClick = (event) => {
        // Prevent the event from bubbling up to the chart
        event.stopPropagation();
        event.preventDefault();
    };

    const handleOverlayMouseDown = (event) => {
        // Prevent the event from bubbling up to the chart
        event.stopPropagation();
        event.preventDefault();
        currentEvent.x1 = event.clientX;
        currentEvent.y1 = event.clientY;
        currentEvent.height = chartWrapperRef.current?.clientHeight;
    };

    const handleOverlayMouseUp = (event) => {
        // Prevent the event from bubbling up to the chart
        event.stopPropagation();
        event.preventDefault();
        currentEvent.x2 = event.clientX;
       
        let auxEvents = [...events];
        auxEvents.push(currentEvent);
        setEvents([...auxEvents]);
        currentEvent = {
            x1: 0,
            x2: 0,
            height: 0
        }   
    };

    return (
        <Container>
            <ChartWrapper ref={chartWrapperRef}>
                <SineWave samplingRate={50} lowerBound={0} upperBound={10} events={events}/>
            </ChartWrapper>
            {/* The overlay covers the same exact area the sine wave chart does */}
            <Overlay  onClick={handleOverlayClick} onMouseDown={handleOverlayMouseDown} onMouseUp={handleOverlayMouseUp} events={events}>
                {/* You can place events in here as children if you so choose */}
                {events && 
                    events.map((drawEvent, index) => {
                        return <Rectangle key={index} x1={drawEvent.x1} y1={drawEvent.y1} rectWidth={drawEvent.x2 - drawEvent.x1} rectHeight={drawEvent.height} index={index}></Rectangle>
                    })
                }
            </Overlay>
        </Container>
    );
};

export default SignalView;