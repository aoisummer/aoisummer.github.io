import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from './component/navbar.mjs';

import characterData from './data/character-core.mjs';
import characterStar6Data from './data/character-star-6.mjs';

const parseDataList = (field) => {
    const result = characterStar6Data.filter((item) => !!item[field]).map((item1) => {
        const cData = characterData.filter((item2) => item2.id === item1.cid)[0];
        return { ...cData, date: item1[field] };
    });
    result.sort((item1, item2) => new Date(item2.date) - new Date(item1.date));
    return result;
};
const contentData = (() => {
    const listCN = parseDataList('star6DateCN');
    const listJP = parseDataList('star6DateJP');
    return { listCN, listJP };
})();

function DataList({ data }) {
    const getRarityCell = (number) => {
        const r = [];
        for (let i = 0; i < number; i++) {
            r.push(
                <i className="i-star" key={i}></i>
            );
        }
        return r;
    };

    return (
        <ul className="list-group">
        {data.map((item, index) =>
            <li className="list-group-item" key={index}>
                <div className="row">
                    <div className="col-8 col-lg-5 text-nowrap text-truncate" title="角色名称">{item.name}</div>
                    <div className="d-none d-lg-flex d-xl-flex align-items-center col-lg-3" title="稀有度">{getRarityCell(item.rarity)}</div>
                    <div className="col-4 col-lg-4 text-nowrap text-truncate text-right text-secondary" title="开放日期">{item.date}</div>
                </div>
            </li>
        )}
        </ul>
    );
}

function App() {
    return (
        <div className="container my-3">
            <Navbar />
            <div className="d-flex align-items-center mb-3">
                <h2 className="h5">6星角色一览</h2>
            </div>
            <div className="row mb-2">
                <div className="col-md-6">
                    <h3 className="h6 mx-3 mb-3">简体字版</h3>
                    <DataList data={contentData.listCN} />
                </div>
                <div className="col-md-6">
                    <h3 className="h6 mx-3 mb-3">日版</h3>
                    <DataList data={contentData.listJP} />
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
