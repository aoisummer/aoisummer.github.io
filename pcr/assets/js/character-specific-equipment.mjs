import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';

import Navbar from './component/navbar.mjs';

import characterCoreData from './data/character-core.mjs';
import characterSpecificEquipmentData from './data/character-specific-equipment.mjs';

const contentData = (() => {
    const map1 = new Map();
    characterCoreData.forEach((item) => {
        map1.set(item.id, item);
    });

    const map = new Map();
    const result = [];
    characterSpecificEquipmentData.forEach((item) => {
        if (!Array.isArray(map.get(item.addDate))) {
            map.set(item.addDate, []);
        }
        map.get(item.addDate).push({ ...map1.get(item.cid), equipmentName: item.equipmentName, addDate: item.addDate });
    });
    map.forEach((value, key) => {
        result.push({ date: key, list: value });
    });
    return result.reverse();
})();

function DataList({ arr }) {
    const getRarityCell = useCallback((number) => {
        const r = [];
        for (let i = 0; i < number; i++) {
            r.push(
                <i className="i-star" key={i}></i>
            );
        }
        return r;
    }, []);

    return (
        <>
        { arr.map((item, index) =>
            <div className="mb-3" key={index}>
                <div className="d-flex align-items-center mb-1 px-3">
                    <h3 className="flex-grow-1 h6">第{arr.length - index}批</h3>
                    <div className="ml-auto text-secondary">{item.date}</div>
                </div>
                <div className="row">
                { item.list.map((item2, index2) =>
                    <div className="col-md-6 mb-2" key={index2}>
                        <div className="card">
                            <div className="card-body x-card-body-sm">
                                <div className="row">
                                    <div className="col-6">{item2.name}</div>
                                    <div className="col-6 d-flex">
                                        <div className="d-none d-lg-flex align-items-center" title="稀有度">{getRarityCell(item2.rarity)}</div>
                                        <div className="ml-auto text-secondary">{item2.equipmentName}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) }
                </div>
            </div>
        ) }
        </>
    );
}

function App() {
    return (
        <div className="container my-3">
            <Navbar />
            <div className="d-flex align-items-center mb-3">
                <h2 className="h5">角色专属装备一览</h2>
            </div>
            <DataList arr={contentData} />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
