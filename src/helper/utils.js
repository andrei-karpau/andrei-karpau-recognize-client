export const sortQueriesByStatus = (queries) => {
    return queries.sort((a, b) => {
        if (a.status === 'processing' && b.status === 'finished') {
            return -1;
        }
        if (a.status === 'finished' && b.status === 'processing') {
            return 1;
        }
        return 0;
    });
};