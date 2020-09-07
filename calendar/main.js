function Sidebar({ sources, onSourceClick }) {
    return (
        <div className="x-sidebar">
            <div className="x-sidebar-title">日历</div>
            <ul className="x-sidebar-list">
                { sources.map((es) => (
                    <li key={es.id}>
                        <div className="x-sidebar-item">
                            <span className="x-sidebar-item-text">{es._text}</span>
                            <input type="checkbox" value={es.id} className="x-sidebar-item-checkbox" checked={es._checked} onChange={onSourceClick} />
                        </div>
                    </li>
                )) }
            </ul>
        </div>
    );
}

function Calendar({ sources }) {
    const calEl = React.useRef(null);
    const _calendar = React.useRef(null);

    React.useEffect(() => {
        _calendar.current = new FullCalendar.Calendar(calEl.current, {
            locale: 'zh-cn',
            displayEventEnd: true,
            eventTimeFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
            eventSources: [],
        });
        _calendar.current.render();
        return () => {
            _calendar.current.destory();
        };
    }, []);

    React.useEffect(() => {
        const oldArr = _calendar.current.getEventSources().map((es) => es.id);
        const newArr = sources.filter((es) => es._checked).map((es) => es.id);
        const removeArr = oldArr.filter((id) => newArr.indexOf(id) === -1);
        const addArr = newArr.filter((id) => oldArr.indexOf(id) === -1);

        removeArr.forEach((id) => {
            _calendar.current.getEventSourceById(id).remove();
        });
        sources.forEach((es) => {
            addArr.indexOf(es.id) !== -1 && _calendar.current.addEventSource(es);
        });
    }, [sources]);

    return (
        <div className="x-calendar" ref={calEl}></div>
    );
}

function App() {
    const [sources, setSources] = React.useState([]);
    const onSourceClick = (e) => {
        const id = e.target.value;
        setSources((prevState) => {
            return prevState.map((es) => es.id === id ? { ...es, _checked: !es._checked } : es);
        });
    };

    React.useEffect(() => {
        const group = new URLSearchParams(location.search).get('group');
        setSources(getSourceGroup(group || 'pcrcn'));
    }, []);

    return (
        <>
            <Sidebar sources={sources} onSourceClick={onSourceClick} />
            <Calendar sources={sources} />
        </>
    );
}

function getSourceGroup(name) {
    const sources = {
        'pcrcn': [
            { id: 'pcr-cn', color: '#f08', _text: '剧情活动' },
            { id: 'pcr-cn-clan-battle', color: '#f08', _text: '行会战' },
        ],
        'imas': [
            { id: 'slstage', color: '#6ff', _text: '星光舞台' },
            { id: 'theaterdays', color: '#f66', _text: '剧场时光' },
        ]
    };
    return sources.hasOwnProperty(name) ? sources[name].map((item) => {
        // return { ...item, url: `data/${item.id}.json`, _checked: true };
        return { ...item, url: `https://cdn.jsdelivr.net/gh/aoisummer/ics-collection@master/dist/${item.id}.json`, _checked: true };
    }) : [];
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
