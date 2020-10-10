export default ({ current }) => {
    const handleEmptyLink = (e) => e.preventDefault();
    const nav = [
        { text: '活动日历', to: 'calendar.html' },
        { text: '角色推荐表', to: 'character-recommend.html' },
        { text: '6星角色表', to: 'character-star-6.html' },
        { text: 'TBC', disabled: true },
    ];
    const navItems = nav.map((item, index) => {
        const className = ['nav-link'];
        Number(current) === index && className.push('active');
        item.disabled && className.push('disabled');
        return typeof item.to === 'string' ? (
                <li className="nav-item" key={index}>
                    <a className={className.join(' ')} href={item.to}>{item.text}</a>
                </li>
            ) : (
                <li className="nav-item" key={index}>
                    <a className={className.join(' ')} href="#" onClick={handleEmptyLink}>{item.text}</a>
                </li>
            );
    });
    return (
        <div className="navbar navbar-expand-md navbar-light bg-white shadow-sm rounded mb-3 x-navbar">
            <a className="navbar-brand" href="./">&lt;公主连结R小工具 /&gt;</a>
            <label className="navbar-toggler mb-0" htmlFor="navbar-toggle">
                <span className="navbar-toggler-icon"></span>
            </label>
            <input type="checkbox" className="x-navbar-toggle" id="navbar-toggle" hidden />
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {navItems}
                </ul>
            </div>
        </div>
    );
}
