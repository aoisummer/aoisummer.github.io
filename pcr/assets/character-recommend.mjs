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
        Array.prototype.push.apply(outdatedGroup, repeatItem(size, !(currentDate.getFullYear() === contentDate.getFullYear() && currentDate.getMonth() === contentDate.getMonth())));
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

function DataTableHead({ extra }) {
    const col1 = [];
    const col2 = [];
    const onAuthorClick = (e) => e.preventDefault();

    extra.forEach((item, index) => {
        col1.push(
            <th colSpan={item.row.length} key={index}>
                { item.source ?
                    <a href={item.source} target="_blank" rel="noopener" title={'更新时间：' + item.lastModified}>{item.author}</a> :
                    <a href="#" onClick={onAuthorClick}>{item.author}</a> }
            </th>
        );
        item.row.forEach((col, index2) => {
            col2.push(
                <th key={[index, index2].join(',')}>{col}</th>
            );
        });
    });

    return (
        <thead>
            <tr>
                <th rowSpan="2"></th>
                <th rowSpan="2">位置</th>
                <th rowSpan="2">名字</th>
                <th rowSpan="2">稀有度</th>
                {col1}
            </tr>
            <tr>{col2}</tr>
        </thead>
    );
}

function DataTableTypeCell({ typeCount, index }) {
    switch (index) {
        case 0:
            return <td rowSpan={typeCount[0]}>前卫</td>;
        case typeCount[0]:
            return <td rowSpan={typeCount[1]}>中卫</td>;
        case typeCount[0] + typeCount[1]:
            return <td rowSpan={typeCount[2]}>后卫</td>;
        default:
            return null;
    }
}

function DataTableRarityCell({ number }) {
    const str = '<i class="i-star"></i>';
    let result = '';
    for (let i = 0; i < number; i++) {
        result += str;
    }
    return (
        <td>
            <div className="d-flex align-items-center" style={{ height: '1.5em' }} dangerouslySetInnerHTML={{ __html: result }}></div>
        </td>
    );
}

function DataTableBody({ charList, outdated }) {
    const typeCount = [0, 0, 0];
    charList.forEach((item, index) => {
        if (item.position <= 300) {
            typeCount[0] += 1;
        } else if (item.position <= 600) {
            typeCount[1] += 1;
        } else {
            typeCount[2] += 1;
        }
    });

    return (
        <tbody>
        { charList.map((item, index) =>
            <tr key={item.id}>
                <DataTableTypeCell typeCount={typeCount} index={index} />
                <td>{item.position}</td>
                <td>{item.name}</td>
                <DataTableRarityCell number={item.rarity} />
                { item.row.map((item2, index2) => {
                    const className = [];
                    outdated[index2] && className.push('x-table-cell-outdated');
                    return (
                        <td className={className.join(' ')} key={index2}>{item2}</td>
                    );
                }) }
            </tr>
        ) }
        </tbody>
    );
}

function App() {
    const [showUpcoming, setShowUpcoming] = React.useState(false);
    const handleUpcomingChange = (e) => setShowUpcoming((state) => !state);

    return (
        <div className="container my-3">
            <Navbar current="1" />
            <div className="mb-3 text-right">
                <span className="mr-2 align-middle"><del className="mr-1 text-secondary">千里眼</del>亚里莎</span>
                <Checkbox isChecked={showUpcoming} onChange={handleUpcomingChange} />
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-sm x-table">
                            <DataTableHead extra={recommendData} />
                            <DataTableBody charList={showUpcoming ? contentData.charList : contentData.charList.filter((item) => contentData.debutCharCN.indexOf(item.id) > 0)} outdated={contentData.outdatedGroup} />
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
