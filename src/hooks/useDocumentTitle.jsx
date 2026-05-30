import { useEffect } from 'react';

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | MediQueue`;
    }, [title]);
};

export default useDocumentTitle;