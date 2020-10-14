import Navbar from './component/navbar.mjs';

import characterData from './data/character-core.mjs';
import characterDebutData from './data/character-debut.mjs';

function DataList({ arr }) {
    return (
        <ul className="list-group mb-3">
        { arr.map((item, index) =>
            <li className="list-group-item" key={item.id}>
                <div className="row">
                    <div className="col-8 col-lg-6 text-nowrap text-truncate" title="角色名称">{item.name}</div>
                    <DataListRarityCol number={item.rarity} />
                    <div className="col-4 col-lg-3 text-nowrap text-truncate text-right text-secondary" title="实装日期">{item.date}</div>
                </div>
            </li>
        ) }
        </ul>
    );
}

function DataListRarityCol({ number }) {
    const str = '<i class="i-star"></i>';
    let result = '';
    for (let i = 0; i < number; i++) {
        result += str;
    }
    return (
        <div className="d-none d-lg-flex d-xl-flex align-items-center col-lg-3" title="稀有度" dangerouslySetInnerHTML={{ __html: result }}></div>
    );
}

function Tabs({ current, onTabClick }) {
    const tabs = ['全部', '前卫', '中卫', '后卫'];
    return (
        <div className="x-tabs-nav x-tabs-nav-block mb-3">
        { tabs.map((item, index) => {
            const className = ['x-tabs-nav-item'];
            current === index && className.push('active');
            return <a className={className.join(' ')} href="#" data-index={index} key={index} onClick={onTabClick}>{item}</a>
        }) }
        </div>
    );
}

function App() {
    const [filterIndex, setFilterIndex] = React.useState(0);
    const handleFilterClick = (e) => {
        e.preventDefault();
        setFilterIndex(Number(e.currentTarget.getAttribute('data-index')));
    };

    const parseDataList = (arr, field) => {
        const result = arr.filter((item) => !!item[field]).map((item1) => {
            const cData = characterData.filter((item2) => item2.id === item1.cid)[0];
            return { ...cData, date: item1[field] };
        });
        result.sort((item1, item2) => {
            const diff = new Date(item2.date) - new Date(item1.date);
            return diff !== 0 ? diff : item2.id - item1.id;m
        });
        return result;
    };
    let data1 = parseDataList(characterDebutData, 'debutDateCN');
    let data2 = parseDataList(characterDebutData, 'debutDateJP');

    switch (filterIndex) {
        case 1:
            data1 = data1.filter((item) => item.position <= 300);
            data2 = data2.filter((item) => item.position <= 300);
            break;
        case 2:
            data1 = data1.filter((item) => item.position > 300 && item.position <= 600);
            data2 = data2.filter((item) => item.position > 300 && item.position <= 600);
            break;
        case 3:
            data1 = data1.filter((item) => item.position > 600);
            data2 = data2.filter((item) => item.position > 600);
            break;
    }

    return (
        <div className="container my-3">
            <Navbar current="3" />
            <Tabs current={filterIndex} onTabClick={handleFilterClick} />
            <div className="row mb-3">
                <div className="col-md-6">
                    <h2 className="h5 mb-3">简体字版</h2>
                    <DataList arr={data1} />
                </div>
                <div className="col-md-6">
                    <h2 className="h5 mb-3">日版</h2>
                    <DataList arr={data2} />
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
