import Navbar from './component/navbar.mjs';

import characterData from './data/character-core.mjs';
import characterStar6Data from './data/character-star-6.mjs';

const parseDataList = (field) => {
    const result = characterStar6Data.filter((item) => !!item[field]).map((item1) => {
        const cData = characterData.filter((item2) => item2.id === item1.cid)[0];
        return { ...cData, date: item1[field] };
    });
    result.sort((item1, item2) => new Date(item1.date) - new Date(item2.date));
    return result;
};
const contentData = (() => {
    const listCN = [];
    const listJP = parseDataList('star6DateJP');
    return { listCN, listJP };
})();

function DataList({ arr }) {
    return (
        <ul className="list-group">
        { arr.map((item, index) =>
            <li className="list-group-item" key={index}>
                <div className="row">
                    <div className="col-8 col-lg-5 text-nowrap text-truncate" title="角色名称">{item.name}</div>
                    <DataListRarityCol number={item.rarity} />
                    <div className="col-4 col-lg-4 text-nowrap text-truncate text-right text-secondary" title="开放日期">{item.date}</div>
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

function App() {
    return (
        <div className="container my-3">
            <Navbar />
            <div className="row mb-2">
                <div className="col-md-6">
                    <h2 className="h5 mb-3">简体字版进度</h2>
                    <div className="alert alert-warning">
                        <strong>注意：</strong>本项功能尚未实装。
                    </div>
                </div>
                <div className="col-md-6">
                    <h2 className="h5 mb-3">日版进度</h2>
                    <DataList arr={contentData.listJP} />
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
