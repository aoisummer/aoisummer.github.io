import Navbar from './component/navbar.mjs';

function App() {
    const asciiArt = `
.........................................     ....................... .........................     
....................................................................................................
..................................................................,***,.............................
.............................................................. ****/***............................ 
........................,**.  .   .. .    ..,*//////*,......((((*/*,,,/,........................ .. 
.....................  **/*/*,.. .,((#(####(#((#(((##((((###(##(#***,,**........................ .. 
..................... ,***,**///(###((###(((((((((#((########((. .***,*/........................    
......................**,****/*(############((((###((((((((((((#/      *......................     .
.....................,/*,**. .,.  ,#####(((#(((((((((((((#(((#(((##/,,,,*.......       . ..       ..
.....................*#(,/.     /(#(#((((((((######(((((#######(####(/,* .......                    
............ ........,##,.....#(#(##((((((#####((((####(((((((###((#((#*.  .....                    
..........  ........*##(*,,,##########((((##*(##((((((((((((((####(###((#..                         
..........  .......*###((**###########(##(..###(###(((((((((((###((#((((/#(                         
..........  ......,###############((((#((  #((((#(##((((((((((##(((/#(((((## .                      
........... ......%###############((((((  ###((#####(((((((((((/#(#((#######(                       
............  ...(###############((((#(  *##((##(#(#((((((/(((#*.#########((#,                      
............   ..################(##(#.  ###((##(#(#(#((((((##(, ,(#######(#(#                      
 ...........  . .#########(#####((#(#(   ##(##*#((##(#(((((##*(   #,#####(((##                      
.............   *########(######(((#(*. .#(##* #(*(#(((((##(,(. /** .,(#(((((#,                     
............. . /###%#(#########((###,..,##(//*#( ##((((((# .#/(%%%%%,,##((((#(                     
.............   ####%#(%########((#(#,. .. ,/#%##,/#((.(*    (#///((.%/(#((((#%                     
............   /#######%#########(#(#,,//#(((//(%/(           (////,. #(#((((#%                     
............ .(/#####(#%#########((#(,//  *(*///(.             *.*.  ,###((((#%                     
........... #..##%#%#(#%##(#######(##/,. . ,*  ,.                    (#(#((((##*                    
........  (,..(###%##(###(#((#%###(###,, ..                         .####(((%%#(                    
.........,....%#######%###(#(##%####(#(,, .                         %##(#((###((                    
.......**,/(*(##############((#########(,, ,               ./     (#####((######                    
....  .%.... ##############%((###%%##(###*, ,,       ,,,,,,*.  .#####((###(###(/                    
..... .#,..  #######################%##(#(#*..*,             **,####(##(###%##*                     
 ......*# . ..###########%############%%####((,,*,.,,,    ,,**,##########%##*                       
        ./,   .###########################/%(##(#/*.. ...**  /#%%#%#####.                           
       . ...(.. ,%#########%* .......... ... ((.......,,,.  #.....   ,.                             
           .   ,(%########.........   .       .*%#*....*..*#/         ..(                           
                .(((##((........ ..           . .,#%%&,%*#(/       .   . #%                         
          .*(######%#/. ........              .    .,#/#(#(              *#%#                       
     ,#(##(#%##%#/#. ..                       .    #%%(//(/%*  .    .     *.%#.                     
`.replace(/^[\r\n]+/, '').replace(/[\r\n]+$/, '');
    const nav1 = [
        { text: "活动日历", to: "calendar.html" },
        { text: "角色 Rank、星级推荐", to: "character-recommend.html" },
        { text: "6星角色一览", to: "character-star-6.html" },
        { text: "角色实装顺序", to: "character-debut.html" },
    ];
    const nav2 = [
        { text: "行会战工具", to: "https://www.bigfun.cn/tools/pcrteam/" },
        { text: "竞技场对战查询", to: "https://pcrdfans.com/battle" },
        { text: "专用装备一览", to: "https://pcredivewiki.tw/UniqueEquipment" },
        { text: "角色碎片获取", to: "https://pcredivewiki.tw/Other/PieceOfMemory" },
    ];
    const handleEmptyLink = (e) => e.preventDefault();
    return (
        <>
            <div className="container mt-3">
                <Navbar />
                <div className="x-header">
                    <pre className="text-light x-header-art">{asciiArt}</pre>
                    <div className="d-flex flex-column justify-content-center text-center x-header-inner">
                        <h1 className="font-weight-light">公主连结Re:Dive 小工具</h1>
                        <div className="lead text-muted">助你更愉快地肝（？）BCR</div>
                    </div>
                </div>
                <div className="row mt-3">
                    { nav1.map((item, index) =>
                        <div className="col-sm-6 col-lg-4 mb-3" key={index}>
                            <a className="x-card-link" href={item.to}>{item.text}</a>
                        </div>
                    ) }
                </div>
                <h2 className="h5 mt-1 mb-4 text-center">一些别家比较好使的</h2>
                <div className="row mt-3">
                    { nav2.map((item, index) =>
                        <div className="col-sm-6 col-lg-4 mb-3" key={index}>
                            <a className="x-card-link" href={item.to} target="_blank" rel="noopener">{item.text}</a>
                        </div>
                    ) }
                </div>
            </div>
            <div className="mb-3 bg-white">
                <div className="container py-4">
                    <ul className="row list-unstyled mb-0 x-info">
                        <li className="col-12 mb-2 h6">
                            <span>公主连结Re:Dive</span>
                            <span lang="ja">（プリンセスコネクト！Re:Dive）</span>
                        </li>
                        <li className="col-md-6">
                            <span className="x-badge mr-2">类型</span>动画RPG
                        </li>
                        <li className="col-md-6">
                            <span className="x-badge mr-2">平台</span>Android / iOS
                        </li>
                        <li className="col-md-6">
                            <span className="x-badge mr-2">收费方式</span>基础免费（内含付费项目）
                        </li>
                        <li className="col-md-6">
                            <span className="x-badge mr-2">开发</span>Cygames
                        </li>
                        <li className="col-md-6">
                            <span className="x-badge mr-2">运营</span>Bilibili
                        </li>
                        <li className="col-md-6">
                            <span className="x-badge mr-2">官网</span><a href="https://game.bilibili.com/pcr/" target="_blank" rel="noopener">简体字版</a>、<a href="https://priconne-redive.jp/" target="_blank" rel="noopener">日版</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mb-3 x-text-sm text-secondary">
                <div>※ 这个网站主要是为了<del>补别家不容易查的资料</del>安利用</div>
                <div>※ 内容中若出现游戏相关图片等，其版权属开发商、运营所有</div>
                <div>※ 数据参考：Gamewith、蘭德索爾圖書館</div>
                <div>※ 若资料或内容中有错漏等情况，请联系工具人进行修改</div>
            </div>
        </>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
