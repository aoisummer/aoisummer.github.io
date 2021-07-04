import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from 'fullcalendar';

import Navbar from './component/navbar.mjs';

function Calendar({ sources }) {
    const el = useRef(null);
    const calendar = useRef(null);

    useEffect(() => {
        calendar.current = new FullCalendar.Calendar(el.current, {
            locale: 'zh-cn',
            displayEventEnd: true,
            eventTimeFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
            eventSources: sources,
        });
        calendar.current.render();
        return () => {
            calendar.current.destory();
        };
    }, []);

    return (
        <div className="x-calendar" ref={el}></div>
    );
}

function App() {
    const sources = [
        { id: 'pcr-cn', color: '#f08', _text: '剧情活动' },
        { id: 'pcr-cn-clan-battle', color: '#f08', _text: '行会战' },
        { id: 'pcr-cn-luna-tower', color: '#f08', _text: '露娜塔' },
    ].map((item) => ({ ...item, url: `https://cdn.jsdelivr.net/gh/aoisummer/ics-collection@master/dist/${item.id}.json` }));

    return (
        <div className="container my-3">
            <Navbar current="0" />
            <Calendar sources={sources} />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
