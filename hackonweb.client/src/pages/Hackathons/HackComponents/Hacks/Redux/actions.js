export const selectHackathon = (hackathon) => {
    // Save selected hackathon to local storage
    localStorage.setItem('selectedHackathon', JSON.stringify(hackathon));

    return {
        type: 'SELECT_HACKATHON',
        payload: hackathon
    };
};
