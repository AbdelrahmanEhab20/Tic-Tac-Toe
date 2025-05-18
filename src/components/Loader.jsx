export default function Loader({ size = 'small' }) {
    const sizeClass = size === 'small' ? 'loader-small' : 'loader-normal';

    return (
        <div className={`loader-inline ${sizeClass}`}>
            <div className="loader-spinner"></div>
        </div>
    );
} 