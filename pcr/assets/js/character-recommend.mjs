import React, { useState, useCallback, useEffect, useMemo, memo} from 'react';
import ReactDOM from 'react-dom';

import Navbar from './component/navbar.mjs';
import Checkbox from './component/checkbox.mjs';

import characterCoreData from './data/character-core.mjs';
import characterDebutData from './data/character-debut.mjs';
import recommendData from './data/recommend.mjs';

const repeatItem = (n, s = '') => {
    const result = [];
    for (let i = 0; i < n; i += 1) {
        result.push(s);
    }
    return result;
};
const contentData = (() => {
    const currentDate = new Date();
    const sizeGroup = [];
    const outdatedGroup = [];
    const rowGroup = [];
    const charList = [];
    const debutCharCN = characterDebutData.filter((item) => !!item.debutDateCN).map((item) => item.cid);

    recommendData.forEach((item1) => {
        const size = item1.row.length;
        const itemMap = new Map();
        const contentDate = new Date(item1.lastModified);

        sizeGroup.push(size);
        Array.prototype.push.apply(outdatedGroup, repeatItem(size, currentDate.getFullYear() * 100 + currentDate.getMonth() > contentDate.getFullYear() * 100 + contentDate.getMonth()));
        item1.data.forEach((item2) => {
            itemMap.set(item2.cid, item2.row);
        });
        rowGroup.push(itemMap);
    });

    characterCoreData.forEach((char) => {
        const rows = [];
        sizeGroup.forEach((size, index) => {
            const row = rowGroup[index].get(char.id) || [];
            Array.prototype.push.apply(rows, row.slice(0, size));
            Array.prototype.push.apply(rows, repeatItem(size - row.length));
        });
        charList.push({ ...char, row: rows });
    });
    charList.sort((char1, char2) => char1.position - char2.position);
    return { charList, debutCharCN, outdatedGroup };
})();

const DataTableHead = memo(function DataTableHead({ extra }) {
    const handleAuthorClick = (e) => e.preventDefault();

    const col1 = useMemo(() => {
        const col1 = [];
        extra.forEach((item, index) => {
            col1.push(
                <th colSpan={item.row.length} key={index}>
                    { item.source ?
                        <a href={item.source} target="_blank" rel="noopener" title={'更新时间：' + item.lastModified}>{item.author}</a> :
                        <a href="#" onClick={handleAuthorClick}>{item.author}</a> }
                </th>
            );
        });
        return col1;
    }, [extra]);
    const col2 = useMemo(() => {
        const col2 = [];
        extra.forEach((item, index) => {
            item.row.forEach((col, index2) => {
                col2.push(
                    <th key={[index, index2].join(',')}>{col}</th>
                );
            });
        });
        return col2;
    }, [extra]);

    return (
        <thead>
            <tr>
                <th rowSpan="2"></th>
                <th rowSpan="2">距离</th>
                <th rowSpan="2">名字</th>
                <th rowSpan="2">稀有度</th>
                {col1}
            </tr>
            <tr>{col2}</tr>
        </thead>
    );
});

const DataTableRow = memo(function DataTableRow({ data, type, outdated }) {
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
            {type.text ? <td rowSpan={type.count}>{type.text}</td> : null}
            <td>{data.position}</td>
            <td>{data.name}</td>
            <td>
                <div className="d-flex align-items-center" style={{ height: '1.5em' }}>{getRarityCell(data.rarity)}</div>
            </td>
            {data.row.map((item2, index2) =>
                <td className={outdated[index2] ? 'x-table-cell-outdated' : null} key={index2}>{item2}</td>
            )}
        </tr>
    );
});

function DataTableBody({ data, outdated }) {
    const typeCount = useMemo(() => {
        const arr = [0, 0, 0];
        data.forEach((item) => {
            if (item.position <= 300) {
                arr[0] += 1;
            } else if (item.position <= 600) {
                arr[1] += 1;
            } else {
                arr[2] += 1;
            }
        });
        return arr;
    }, [data]);

    const getTypeCol = useCallback((index) => {
        switch (index) {
            case 0:
                return { text: '前卫', count: typeCount[0] };
            case typeCount[0]:
                return { text: '中卫', count: typeCount[1] };
            case typeCount[0] + typeCount[1]:
                return { text: '后卫', count: typeCount[2] };
            default:
                return { text: null, count: 0 };
        }
    }, [typeCount]);

    return (
        <tbody>
        {data.map((item, index) =>
            <DataTableRow key={item.id} data={item} type={getTypeCol(index)} outdated={outdated} />
        )}
        </tbody>
    );
}

function App() {
    const [showUpcoming, setShowUpcoming] = useState(false);
    const [dataList, setDataList] = useState(() => [...contentData.charList].filter((item) => contentData.debutCharCN.indexOf(item.id) > -1));

    const handleUpcomingChange = useCallback((e) => setShowUpcoming((prev) => !prev), []);

    useEffect(() => {
        setDataList(showUpcoming ? [...contentData.charList] : [...contentData.charList].filter((item) => contentData.debutCharCN.indexOf(item.id) > -1));
    }, [showUpcoming]);

    return (
        <div className="container my-3">
            <Navbar />
            <div className="d-flex align-items-center mb-3">
                <h2 className="h5 mb-0">角色 Rank、星级推荐</h2>
                <div className="ml-auto">
                    <span className="mr-2 align-middle"><del className="mr-1 text-secondary">千里眼</del>亚里莎</span>
                    <Checkbox isChecked={showUpcoming} onChange={handleUpcomingChange} />
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-sm x-table">
                            <DataTableHead extra={recommendData} />
                            <DataTableBody data={dataList} outdated={contentData.outdatedGroup} />
                        </table>
                    </div>
                </div>
            </div>
            <div className="mt-2 text-secondary x-text-sm">※ 各推荐皆统计于各位作者文章，点击名字可以查看来源</div>
            <div className="text-secondary x-text-sm">※ 灰色背景表示该数据可能过期，仅供参考</div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
