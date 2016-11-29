var DateUtils = {
    getZeroHourToday: () => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    },
    numberOfDaysElapsedSince: (startDate) => {
        return Math.floor((new Date() - startDate)/(1000*60*60*24));
    }
};
