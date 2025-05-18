export default function Modal({ isOpen, message, onClose, type = 'info' }) {
    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'error':
                return 'bg-red-50 border-red-200 text-red-700';
            case 'success':
                return 'bg-green-50 border-green-200 text-green-700';
            default:
                return 'bg-blue-50 border-blue-200 text-blue-700';
        }
    };

    return (
        <div className="modal-overlay">
            <div className={`modal-content ${getTypeStyles()}`}>
                <p className="modal-message">{message}</p>
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
            </div>
        </div>
    );
} 