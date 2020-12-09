function NavbarNav({ data, current, onItemClick }) {
    const [clickIndex, setClickIndex] = React.useState(-1);

    const handleItemClick = (e) => {
        if (e.currentTarget.getAttribute('href') === '#') {
            e.preventDefault();
        }
        const index = e.currentTarget.getAttribute('data-index');
        setClickIndex((prev) => {
            if (index == null) {
                return -1;
            }
            const i = Number(index);
            return prev === i ? -1 : i;
        });
    };

    return (
        <ul className="navbar-nav mr-auto">
            { data.map((item, index) => {
                const className1 = ['nav-item'];
                const className2 = ['nav-link'];
                const hasChild = item.child && item.child.length > 0;

                if (hasChild) {
                    className1.push('dropdown');
                    clickIndex === index && className1.push('show');
                    className2.push('dropdown-toggle');
                }
                Number(current) === index && className2.push('active');
                item.disabled && className2.push('disabled');

                return (
                    <li className={className1.join(' ')} key={index}>
                        <a className={className2.join(' ')} href={typeof item.to === 'string' ? item.to : '#'} data-index={index} onClick={handleItemClick}>{item.text}</a>
                        { hasChild && clickIndex === index && (
                            <div className="dropdown-menu show">
                                { item.child.map((item2, index2) =>
                                    <a className="dropdown-item" href={typeof item2.to === 'string' ? item2.to : '#'} onClick={handleItemClick} key={index2}>{item2.text}</a>
                                ) }
                            </div>
                        ) }
                    </li>
                );
            }) }
        </ul>
    );
};

export default ({ current }) => {
    const nav = [
        { text: '活动日历', to: 'calendar.html' },
        { text: '角色', child: [
            { text: '角色推荐表', to: 'character-recommend.html' },
            { text: '6星角色表', to: 'character-star-6.html' },
            { text: '角色实装顺序', to: 'character-debut.html' },
            { text: '专属装备一览', to: 'character-specific-equipment.html' },
        ] },
        { text: '冒险', child: [
            { text: '故事活动一览', to: 'quest-storyevent.html' },
        ] },
    ];

    return (
        <div className="navbar navbar-expand-md navbar-light bg-white shadow-sm rounded mb-3 x-navbar">
            <a className="navbar-brand" href="./">公主连接R小工具</a>
            <label className="navbar-toggler mb-0" htmlFor="navbar-toggle">
                <span className="navbar-toggler-icon"></span>
            </label>
            <input type="checkbox" className="x-navbar-toggle" id="navbar-toggle" hidden />
            <div className="collapse navbar-collapse">
                <NavbarNav data={nav} current={current} />
            </div>
        </div>
    );
}
