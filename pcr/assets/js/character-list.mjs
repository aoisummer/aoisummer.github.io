import React, { useState, useCallback, useEffect, memo } from 'react';
import ReactDOM from 'react-dom';

import Navbar from './component/navbar.mjs';

import characterCoreData from './data/character-core.mjs';
import characterDebutData from './data/character-debut.mjs';
import characterPersonData from './data/character-person.mjs';

const createMap = (data, field = 'cid') => {
    const map = new Map();
    data.forEach((item) => {
        map.set(item[field], item);
    });
    return map;
};
const allData = (() => {
    const debutMap = createMap(characterDebutData);
    const personMap = createMap(characterPersonData, 'name');
    return characterCoreData.map((item) => {
        const debutItem = debutMap.get(item.id);
        let personItem = {};
        for (const item2 of personMap.keys()) {
            if (item.name.replace(/（.+$/, '') === item2) {
                personItem = personMap.get(item2);
                break;
            }
        }
        return {
            ...item,
            debutDateCN: debutItem.debutDateCN,
            debutDateJP: debutItem.debutDateJP,
            guild: personItem.guild,
            race: personItem.race,
            age: personItem.age,
            height: personItem.height,
            weight: personItem.weight,
        };
    })
})();

const DataTableRow = memo(({ data }) => {
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
        <tr>
            <td className="x-table2-icon">
                <i className={`i-char i-char-${data.id}`}></i>
            </td>
            <td hidden>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.guild}</td>
            <td>{data.race}</td>
            <td>{data.age || '？'}</td>
            <td>{data.height || '？'}</td>
            <td>{data.weight || '？'}</td>
            <td>
                <div className="d-flex align-items-center" style={{ height: '1.5em' }}>{getRarityCell(data.rarity)}</div>
            </td>
            <td>{data.position}</td>
            <td>{data.debutDateCN}</td>
            <td>{data.debutDateJP}</td>
        </tr>
    );
});

/**
 * @param {object} attr
 * @param {array} attr.data
 * @param {string} attr.sort
 * @param {function} attr.onSort
 * @returns 
 */
function DataTable({ data, sort, onSort }) {
    const cols = [
        { name: 'id', text: 'ID' },
        { name: 'name', text: '名称' },
        { name: 'guild', text: '公会' },
        { name: 'race', text: '种族' },
        { name: 'age', text: '年龄' },
        { name: 'height', text: '身高' },
        { name: 'weight', text: '体重' },
        { name: 'rarity', text: '稀有度' },
        { name: 'position', text: '攻击距离' },
        { name: 'debutDateCN', text: '实装时间（简）' },
        { name: 'debutDateJP', text: '实装时间（日）' },
    ];

    const handleSortClick = useCallback((e) => {
        e.preventDefault();
        onSort(e.currentTarget.getAttribute('data-sort'));
    }, []);

    return (
        <div className="table-responsive mb-2 bg-white shadow-sm">
            <table className="table table-sm table-striped- border-left border-right mb-0 x-table2">
                <thead>
                    <tr>
                    {cols.map((item, index) =>
                        <th key={index}>
                            { item.text && <a className={sort === item.name ? 'active' : null} href="#" data-sort={item.name} onClick={handleSortClick}>{item.text}</a> }
                        </th>
                    )}
                    </tr>
                </thead>
                <tbody>
                {data.map((item) =>
                    <DataTableRow key={item.id} data={item} />
                )}
                </tbody>
            </table>
        </div>
    );
}

function App() {
    const [sortType, setSortType] = useState('id');
    const [dataList, setDataList] = useState(() => [...allData]);

    const onTableSort = useCallback((type) => {
        setSortType(type);
    }, []);

    useEffect(() => {
        const sort = new URLSearchParams(location.search).get('sort');
        sort && setSortType(sort);
    }, []);

    useEffect(() => {
        const arr = [...allData];
        switch (sortType) {
            // case 'id':
            case 'position':
                arr.sort((a, b) => (Number(a[sortType]) || -1) - (Number(b[sortType]) || -1));
                break;
            case 'age':
            case 'height':
            case 'weight':
            case 'rarity':
                arr.sort((a, b) => (Number(b[sortType]) || -1) - (Number(a[sortType]) || -1));
                break;
            case 'name':
            case 'guild':
            case 'race':
                arr.sort((a, b) => String(a[sortType]).localeCompare(String(b[sortType])));
                break;
            case 'debutDateCN':
            case 'debutDateJP':
                arr.sort((a, b) => new Date(b[sortType]) - new Date(a[sortType]));
                break;
        }
        setDataList(arr);
    }, [sortType]);

    return (
        <div className="container my-3">
            <Navbar />
            <h2 className="h5 mb-3">角色列表总览</h2>
            <DataTable data={dataList} sort={sortType} onSort={onTableSort} />
            <div className="text-secondary x-text-sm">※ 部分较新角色由于数据尚未确认可能显示不正常</div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
