import Navbar from './component/navbar.mjs';

const listCN = [];
const listJP = [
    { "name": "佩可莉姆 / ペコリーヌ", "date": "2019-08-31" },
    { "name": "可可萝 / コッコロ", "date": "2019-08-31" },
    { "name": "凯露 / キャル", "date": "2019-08-31" },
    { "name": "璃乃 / リノ", "date": "2019-09-30" },
    { "name": "莉玛 / リマ", "date": "2019-10-31" },
    { "name": "伊绪 / イオ", "date": "2019-11-30" },
    { "name": "由加莉 / ユカリ", "date": "2019-12-31" },
    { "name": "真步 / マホ", "date": "2020-01-31" },
    { "name": "优衣 / ユイ", "date": "2020-02-29" },
    { "name": "怜 / レイ", "date": "2020-02-29" },
    { "name": "日和莉 / ヒヨリ", "date": "2020-02-29" },
    { "name": "初音 / ハツネ", "date": "2020-03-31" },
    { "name": "珠希 / タマキ", "date": "2020-04-30" },
    { "name": "美冬 / ミフユ", "date": "2020-05-31" },
    { "name": "静流 / シズル", "date": "2020-06-30" },
    { "name": "绫音 / アヤネ", "date": "2020-08-06" },
    { "name": "咲恋 / サレン", "date": "2020-09-07" },
    { "name": "秋乃 / アキノ", "date": "2020-09-07" },
    { "name": "妮侬 / ニノン", "date": "2020-10-07" }
];

function App() {
    return (
        <div className="container my-3">
            <Navbar current="2" />
            <div className="row mb-2">
                <div className="col-md-6">
                    <h2 className="h5 mb-3">简体字版进度</h2>
                    <div className="alert alert-warning">
                        <strong>注意：</strong>本项功能尚未实装。
                    </div>
                </div>
                <div className="col-md-6">
                    <h2 className="h5 mb-3">日版进度</h2>
                    <ul className="list-group">
                    { listJP.map((item, index) =>
                        <li className="list-group-item" key={index}>
                            <div className="row">
                                <div className="col-8 col-sm-8 col-lg-9 text-nowrap text-truncate" title="角色名称">{item.name}</div>
                                <div className="col-4 col-sm-4 col-lg-3 text-nowrap text-truncate text-right text-secondary" title="开放日期">{item.date}</div>
                            </div>
                        </li>
                    ) }
                    </ul>
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

