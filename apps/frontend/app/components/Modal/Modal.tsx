const Modal = ({
    showModal,
    closeModal,
    data
}: {
    showModal: boolean;
    closeModal: any;
    data: string;
}) => {
    return (
        <div
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50  z-10
            ${showModal ? 'visible' : 'invisible'}`}
        >
            <div className="bg-white p-8 rounded shadow-md">
                {/* Your modal content goes here */}
                <p>{data}</p>
                <button
                    onClick={closeModal}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Close Modal
                </button>
            </div>
        </div>
    );
};

export default Modal;
