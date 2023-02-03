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
    // this is the array that will hold all the events
    const [events, setEvents] = useState([])
    // event obj to hold the current event being created
    let currentEvent = {
        x1: 0,
        width: 0,
        height: 0
    }
    // Access the height of the chart as chartWrapperRef.current?.clientHeight to determine the height to set on events
    const chartWrapperRef = useRef();

    const handleOverlayClick = (event) => {
        // Prevent the event from bubbling up to the chart
        event.stopPropagation();
        event.preventDefault();
    };

    // when the mouse is press down start the event
    const handleOverlayMouseDown = (event) => {
        // Prevent the event from bubbling up to the chart
        event.stopPropagation();
        event.preventDefault();
        if(event.clientX >= 0){
            currentEvent.x1 = event.clientX;
            currentEvent.height = chartWrapperRef.current?.clientHeight;
        }
    };

    // when the mouse is up finish the event and draw the rectangle
    const handleOverlayMouseUp = (event) => {
        // Prevent the event from bubbling up to the chart
        event.stopPropagation();
        event.preventDefault();
        if(event.clientX >= 0){
            currentEvent.width = event.clientX - currentEvent.x1;
       
            let auxEvents = [...events];
            auxEvents.push(currentEvent);
            setEvents([...auxEvents]);
            currentEvent = {
                x1: 0,
                width: 0,
                height: 0
            }   
    }
    };

    // This is the event that should take care of the logig to draw the rectangle while the mouse is moving, didn't have time to implement it
    // const handleOverlayMouseMove = (event) => {
    // }

    return (
        <Container>
            <ChartWrapper ref={chartWrapperRef}>
                <SineWave samplingRate={50} lowerBound={0} upperBound={10} events={events}/>
            </ChartWrapper>
            {/* The overlay covers the same exact area the sine wave chart does */}
            <Overlay  onClick={handleOverlayClick} onMouseDown={handleOverlayMouseDown} onMouseUp={handleOverlayMouseUp} events={events}>
                {/* You can place events in here as children if you so choose */}
                {/* iterate thru the events and draw them       */}
                {events && 
                    events.map((drawEvent, index) => {
                        return <Rectangle key={`rect-${index}`} x1={drawEvent.x1} rectWidth={drawEvent.width} rectHeight={drawEvent.height}></Rectangle>
                    })
                }
            </Overlay>
        </Container>
    );
};

export default SignalView;