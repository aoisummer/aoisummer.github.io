import Navbar from './component/navbar.mjs';
import characterData from './data/character.mjs';

const listCN = [];
const listJP = [
    { cid: 1058, date: "2019-08-31" },
    { cid: 1059, date: "2019-08-31" },
    { cid: 1060, date: "2019-08-31" },
    { cid: 1011, date: "2019-09-30" },
    { cid: 1052, date: "2019-10-31" },
    { cid: 1018, date: "2019-11-30" },
    { cid: 1034, date: "2019-12-31" },
    { cid: 1010, date: "2020-01-31" },
    { cid: 1002, date: "2020-02-29" },
    { cid: 1003, date: "2020-02-29" },
    { cid: 1001, date: "2020-02-29" },
    { cid: 1012, date: "2020-03-31" },
    { cid: 1046, date: "2020-04-30" },
    { cid: 1048, date: "2020-05-31" },
    { cid: 1049, date: "2020-06-30" },
    { cid: 1023, date: "2020-08-06" },
    { cid: 1028, date: "2020-09-07" },
    { cid: 1032, date: "2020-09-07" },
    { cid: 1030, date: "2020-10-07" }
];

function CharacterList({ arr }) {
    return arr.length === 0 ? (
        <div className="alert alert-warning">
            <strong>注意：</strong>本项功能尚未实装。
        </div>
    ) : (
        <ul className="list-group">
        { arr.map((item, index) =>
            <li className="list-group-item" key={index}>
                <div className="row">
                    <div className="col-8 col-sm-8 col-lg-9 text-nowrap text-truncate" title="角色名称">{item.name}</div>
                    <div className="col-4 col-sm-4 col-lg-3 text-nowrap text-truncate text-right text-secondary" title="开放日期">{item.date}</div>
                </div>
            </li>
        ) }
        </ul>
    );
}

function App() {
    const getDataList = (arr) => {
        return arr.map((item1) => {
            const cData = characterData.filter((item2) => item2.id === item1.cid)[0];
            return { name: cData.name, date: item1.date };
        });
    };
    const list1 = getDataList(listCN);
    const list2 = getDataList(listJP);
    return (
        <div className="container my-3">
            <Navbar current="2" />
            <div className="row mb-2">
                <div className="col-md-6">
                    <h2 className="h5 mb-3">简体字版进度</h2>
                    <CharacterList arr={list1} />
                </div>
                <div className="col-md-6">
                    <h2 className="h5 mb-3">日版进度</h2>
                    <CharacterList arr={list2} />
                </div>
            </div>
            <h2 className="h5 mt-3 mb-3">功能简介</h2>
            <div className="row">
                <div className="col-sm-6 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="h6 mb-3">角色升级到 6 星带来的变化</h3>
                            <ol className="mb-0">
                                <li>连结爆发强化</li>
                                <li>基础状态值提升</li>
                                <li>连结爆发的演出发生变化</li>
                                <li>角色 SD 和插画发生变化</li>
                                <li>好感度上限增加，角色故事也将增加</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="h6 mb-3">方法</h3>
                            <ol className="mb-0">
                                <li>将角色开花到 5 星，并装备上专属装备</li>
                                <li>收集 50 个记忆碎片</li>
                                <li>收集 100 个纯净记忆碎片</li>
                                <li>收集 100 个公主宝珠</li>
                                <li>收集以上物品后完成 6 星解放关卡</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-secondary x-text-sm">※ 日版数据来源：Gamewith</div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);

