
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Accordion from 'react-bootstrap/Accordion';
import './accordion.css';

const AccrodionComponent = () => {
    return(
        <div style={{width:"100%"}}>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Sample Light Exercises</Accordion.Header>
                    <Accordion.Body>
                        <iframe width="100%" height="600" src="https://www.youtube.com/embed/s6yv8Ag-PHg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Sample Moderate Exercises</Accordion.Header>
                    <Accordion.Body>
                        <iframe width="100%" height="600" src="https://www.youtube.com/embed/DOtr16U8V2M" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Sample Heavy Exercises</Accordion.Header>
                    <Accordion.Body>
                        <iframe width="100%" height="600" src="https://www.youtube.com/embed/gyHUvbVfhdw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default AccrodionComponent;