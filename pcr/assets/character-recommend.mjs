import Navbar from './component/navbar.mjs';
import Checkbox from './component/checkbox.mjs';

import characterCoreData from './data/character-core.mjs';
import characterDebutData from './data/character-debut.mjs';
import recommendData from './data/recommend.mjs';

function DataTable({ character, extra }) {
    return (
        <div className="table-responsive">
            <table className="table table-sm x-table">
                <DataTableHead extra={extra} />
                <DataTableBody character={character} extra={extra} />
            </table>
        </div>
    );
}

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

function DataTableBody({ character, extra }) {
    const chars = character.slice();
    chars.sort((char1, char2) => char1.position - char2.position);

    const typeCount = [0, 0, 0];
    chars.forEach((item, index) => {
        if (item.position <= 300) {
            typeCount[0]++;
        } else if (item.position <= 600) {
            typeCount[1]++;
        } else {
            typeCount[2]++;
        }
    });

    return (
        <tbody>
        { chars.map((item, index) =>
            <tr key={item.id}>
                <DataTableTypeCell typeCount={typeCount} index={index} />
                <td>{item.position}</td>
                <td>{item.name}</td>
                <DataTableRarityCell number={item.rarity} />
                <DataTableValueCells extra={extra} id={item.id} />
            </tr>
        ) }
        </tbody>
    );
}

function DataTableValueCells({ extra, id }) {
    const cols = [];
    const currentDate = new Date();

    extra.forEach((item1, index1) => {
        const row = item1.data.filter((item1Child) => item1Child.cid === id);
        const className = [];
        const colSize = item1.row.length;
        const contentDate = new Date(item1.lastModified);
        const isOutdated = !(currentDate.getFullYear() === contentDate.getFullYear() && currentDate.getMonth() === contentDate.getMonth());
        let empty = 0;
        
        isOutdated && className.push('x-table-cell-outdated');
        if (row.length > 0) {
            row[0].row.slice(0, colSize).forEach((item2, index2) => {
                cols.push(
                    <td className={className.join(' ')} key={[id, index1, index2].join(',')}>{item2}</td>
                );
            });
            empty = colSize - row[0].row.length;
        } else {
            empty = colSize;
        }
        if (empty > 0) {
            className.push('x-table-cell-empty');
            for (let emptyIndex = 0; emptyIndex < empty; emptyIndex++) {
                cols.push(
                    <td className={className.join(' ')} key={[id, index1, emptyIndex - empty].join(',')}></td>
                );
            }
        }
    });
    return cols;
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

function App() {
    const [showUpcoming, setShowUpcoming] = React.useState(false);
    const handleUpcomingChange = (e) => setShowUpcoming((state) => !state);
    const debutCharacter = characterDebutData.filter((item) => !!item.debutDateCN).map((item) => item.cid);

    return (
        <div className="container my-3">
            <Navbar current="1" />
            <div className="mb-3 text-right">
                <span className="mr-2 align-middle"><del className="mr-1 text-secondary">千里眼</del>亚里莎</span>
                <Checkbox isChecked={showUpcoming} onChange={handleUpcomingChange} />
            </div>
            <div className="card">
                <div className="card-body">
                    <DataTable character={showUpcoming ? characterCoreData : characterCoreData.filter((item) => debutCharacter.indexOf(item.id) > 0)} extra={recommendData} />
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
