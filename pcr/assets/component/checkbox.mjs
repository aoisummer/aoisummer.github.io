export default ({ isChecked, onChange }) => {
    return (
        <label className="x-checkbox">
            <input type="checkbox" className="x-checkbox-toggle" checked={isChecked} onChange={onChange} />
            <span className="x-checkbox-view"></span>
        </label>
    );
}