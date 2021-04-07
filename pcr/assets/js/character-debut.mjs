import Navbar from './component/navbar.mjs';

import characterData from './data/character-core.mjs';
import characterDebutData from './data/character-debut.mjs';

const getDataList = (arr, map, field) => {
    const result = [];
    arr.forEach((item) => {
        if (map.has(item.id) && !!map.get(item.id)[field]) {
            result.push({ ...item, date: map.get(item.id)[field] });
        }
    });
    result.sort((item1, item2) => {
        const diff = new Date(item2.date) - new Date(item1.date);
        return diff !== 0 ? diff : item2.id - item1.id;
    });
    return result;
};
const contentData = (() => {
    const debutDataMap = new Map();
    characterDebutData.forEach((item) => {
        debutDataMap.set(item.cid, item);
    });
    const listCN = getDataList(characterData, debutDataMap, 'debutDateCN');
    const listJP = getDataList(characterData, debutDataMap, 'debutDateJP');
    return { listCN, listJP };
})();

const DataListRow = React.memo(({ data }) => {
    const getRarityCell = React.useCallback((number) => {
        const r = [];
        for (let i = 0; i < number; i++) {
            r.push(
                <i className="i-star" key={i}></i>
            );
        }
        return r;
    }, []);

    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-8 col-lg-5 text-nowrap text-truncate" title="角色名称">{data.name}</div>
                <div className="d-none d-lg-flex d-xl-flex align-items-center col-lg-3" title="稀有度">{getRarityCell(data.rarity)}</div>
                <div className="col-4 col-lg-4 text-nowrap text-truncate text-right text-secondary" title="实装日期">{data.date}</div>
            </div>
        </li>
    );
});

function Tabs({ current, onTabClick }) {
    const tabs = ['全部', '前卫', '中卫', '后卫'];

    const handleItemClick = React.useCallback((e) => {
        e.preventDefault();
        typeof onTabClick === 'function' && onTabClick(Number(e.currentTarget.getAttribute('data-index')));
    }, []);

    return (
        <div className="x-tabs-nav x-tabs-nav-block mb-3">
        { tabs.map((item, index) => {
            const className = ['x-tabs-nav-item'];
            current === index && className.push('active');
            return <a className={className.join(' ')} href="#" data-index={index} key={index} onClick={handleItemClick}>{item}</a>
        }) }
        </div>
    );
}

function App() {
    const [filterIndex, setFilterIndex] = React.useState(0);

    const data1 = React.useMemo(() => {
        const arr = [...contentData.listCN];
        switch (filterIndex) {
            case 1:
                return arr.filter((item) => item.position <= 300);
            case 2:
                return arr.filter((item) => item.position > 300 && item.position <= 600);
            case 3:
                return arr.filter((item) => item.position > 600);
            default:
                return arr;
        }
    }, [filterIndex]);
    const data2 = React.useMemo(() => {
        const arr = [...contentData.listJP];
        switch (filterIndex) {
            case 1:
                return arr.filter((item) => item.position <= 300);
            case 2:
                return arr.filter((item) => item.position > 300 && item.position <= 600);
            case 3:
                return arr.filter((item) => item.position > 600);
            default:
                return arr;
        }
    }, [filterIndex]);

    const handleFilterClick = React.useCallback((index) => {
        setFilterIndex(index);
    }, []);

    return (
        <div className="container my-3">
            <Navbar />
            <h2 className="h5 mb-3">角色登场顺序一览</h2>
            <Tabs current={filterIndex} onTabClick={handleFilterClick} />
            <div className="row mb-3">
                <div className="col-md-6">
                    <h3 className="h6 mx-3 mb-3">简体字版</h3>
                    <ul className="list-group mb-3">
                    {data1.map((item) =>
                        <DataListRow data={item} key={item.id} />
                    )}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h3 className="h6 mx-3 mb-3">日版</h3>
                    <ul className="list-group mb-3">
                    {data2.map((item) =>
                        <DataListRow data={item} key={item.id} />
                    )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
