import Navbar from './component/navbar.mjs';

import characterData from './data/character-core.mjs';
import characterStar6Data from './data/character-star-6.mjs';

function DataList({ arr }) {
    return (
        <ul className="list-group">
        { arr.map((item, index) =>
            <li className="list-group-item" key={index}>
                <div className="row">
                    <div className="col-8 col-lg-6 text-nowrap text-truncate" title="角色名称">{item.name}</div>
                    <DataListRarityCol number={item.rarity} />
                    <div className="col-4 col-lg-3 text-nowrap text-truncate text-right text-secondary" title="开放日期">{item.date}</div>
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
    const parseDataList = (arr, field) => {
        const result = arr.filter((item) => !!item[field]).map((item1) => {
            const cData = characterData.filter((item2) => item2.id === item1.cid)[0];
            return { ...cData, date: item1[field] };
        });
        result.sort((item1, item2) => new Date(item1.date) - new Date(item2.date));
        return result;
    };
    // const data1 = parseDataList(characterStar6Data, 'star6DateCN');
    const data2 = parseDataList(characterStar6Data, 'star6DateJP');

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
                    <DataList arr={data2} />
                </div>
            </div>
            <h2 className="h5 mt-3 mb-3">功能简介</h2>
            <div className="row">
                <div className="col-md-6 mb-3">
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
                <div className="col-md-6 mb-3">
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
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);

