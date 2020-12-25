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
        const arr2 = arr.map((item) => {
            return { ...item, character: item.character.map((item2) => map.get(item2).name) };
        });
        return arr2.reverse();
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
                        <div className="col-8" title="活动名称">{item.name}</div>
                        <div className="col-4 text-right text-secondary" title="活动日期">{dateField}</div>
                        <div className="col mt-1 x-text-sm text-secondary">角色碎片：{item.character.join('、')}</div>
                    </div>
                </li>
            )
        }) }
        </ul>
    );
}

function App() {
    return (
        <div className="container my-3">
            <Navbar />
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <h2 className="h5 mb-3">简体字版</h2>
                    <DataList data={contentData[0]} />
                </div>
                <div className="col-lg-6">
                    <h2 className="h5 mb-3">日版</h2>
                    <DataList data={contentData[1]} />
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
