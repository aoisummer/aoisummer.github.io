import Navbar from './component/navbar.mjs';
import characterData from './data/character.mjs';
import recommendData from './data/recommend.mjs';

function DataTable({ data }) {
    return (
        <div className="table-responsive">
            <table className="table table-sm x-table">
                <DataTableHead data={data} />
                <DataTableBody data={data} />
            </table>
        </div>
    );
}

function DataTableHead({ data }) {
    const col1 = [];
    const col2 = [];
    const onAuthorClick = (e) => {
        e.preventDefault();
    };

    data.extra.forEach((item, index) => {
        col1.push(
            <th colSpan={item.row.length} key={index}>
                { item.source ?
                    <a href={item.source} target="_blank" title={'更新时间：' + item.lastModified}>{item.author}</a> :
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
                {col1}
            </tr>
            <tr>{col2}</tr>
        </thead>
    );
}

function DataTableBody({ data }) {
    const getColsById = (id) => {
        const cols = [];
        data.extra.forEach((item1, index1) => {
            const row = item1.data.filter((item1Child) => item1Child.cid === id);
            const length = item1.row.length;
            let empty = 0;
            if (row.length > 0) {
                row[0].row.slice(0, length).forEach((item2, index2) => {
                    cols.push(
                        <td key={[id, index1, index2].join(',')}>{item2}</td>
                    );
                });
                empty = length - row[0].row.length;
            } else {
                empty = length;
            }
            empty > 0 && new Array(empty).fill('').forEach((item2, index2) => {
                cols.push(
                    <td key={[id, index1, index2 - empty].join(',')} className="x-table-cell-empty">{item2}</td>
                );
            });
        });
        return cols;
    };
    const chars = data.character.slice();
    chars.sort((char1, char2) => char1.position - char2.position);
    
    const type = [ 0, 0, 0 ];
    chars.forEach((item, index) => {
        if (item.position <= 300) {
            type[0]++;
        } else if (item.position <= 600) {
            type[1]++;
        } else {
            type[2]++;
        }
    });
    const getPositionCell = (index) => {
        switch (index) {
            case 0:
                return <td rowSpan={type[0]}>前卫</td>;
            case type[0]:
                return <td rowSpan={type[1]}>中卫</td>;
            case type[0] + type[1]:
                return <td rowSpan={type[2]}>后卫</td>;
        }
    };

    return (
        <tbody>
        { chars.map((item1, index1) =>
            <tr key={item1.id}>
                { getPositionCell(index1) }
                <td className="x-table-cell-position">{item1.position}</td>
                <td className="x-table-cell-name">{item1.name}</td>
                { getColsById(item1.id) }
            </tr>
        ) }
        </tbody>
    );
}

function App() {
    return (
        <div className="container my-3">
            <Navbar current="1" />
            <div className="card">
                <div className="card-body">
                    <DataTable data={{
                        character: characterData,
                        extra: recommendData
                    }} />
                </div>
            </div>
            <div className="mt-2 text-secondary x-text-sm">※ 各推荐皆统计于各位作者文章，点击名字可以查看来源</div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);