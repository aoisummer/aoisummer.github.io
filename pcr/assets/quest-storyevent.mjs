import Navbar from './component/navbar.mjs';

import characterCoreData from './data/character-core.mjs';
import storyeventData from './data/quest-storyevent.mjs';

const contentData = (() => {
    const map = new Map();
    characterCoreData.forEach((item) => {
        map.set(item.id, item);
    });
    return storyeventData.map((item) => {
        return { ...item, character: item.character.map((item2) => map.get(item2).name) };
    });
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

function App() {
    return (
        <div className="container my-3">
            <Navbar />
            <h2 className="h5 mb-3">剧情活动一览</h2>
            <DataList data={contentData} />
            <div className="mt-2 text-secondary x-text-sm">※ 以日版作为基础数据，若简体字版已开展过则替换为对应名字</div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
