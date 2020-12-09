import Navbar from './component/navbar.mjs';

import characterCoreData from './data/character-core.mjs';
import storyeventDataJP from './data/quest-storyevent-jp.mjs';
import storyeventDataCN from './data/quest-storyevent-cn.mjs';

const contentData = (() => {
    const map = new Map();
    characterCoreData.forEach((item) => {
        map.set(item.id, item);
    });
    const parseData = (arr) => {
        return arr.map((item) => {
            return { ...item, character: item.character.map((item2) => map.get(item2).name) };
        })
    };
    return [parseData(storyeventDataCN), parseData(storyeventDataJP)];
})();

function DataList({ data }) {
    return (
        <ul className="list-group">
        { data.map((item, index) => {
            const dateField = item.startDate.split('T')[0] + ' +' + Math.round((new Date(item.endDate) - new Date(item.startDate)) / 1000 / 86400) + 'd';
            return (
                <li className="list-group-item" key={index}>
                    <div className="row">
                        <div className="col-sm-6" title="活动名称">{item.name}</div>
                        <div className="col-sm-4" title="角色碎片">{item.character.join('、')}</div>
                        <div className="col-sm-2 text-right text-secondary" title="活动日期">{dateField}</div>
                    </div>
                </li>
            );
        }) }
        </ul>
    );
}

function Tabs({ current, onTabClick }) {
    const tabs = ['简体字版', '日版'];
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

    return (
        <div className="container my-3">
            <Navbar />
            <h2 className="h5 mb-3">剧情活动一览</h2>
            <Tabs current={filterIndex} onTabClick={handleFilterClick} />
            <DataList data={contentData[filterIndex]} />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
