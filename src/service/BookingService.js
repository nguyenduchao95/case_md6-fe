import instance from "./axiosConfig";

const BookingService = {
    getHistoryByAccount: async (id, currentPage = 0) => {
        return await instance.get(`/api/bookings/getByIdAccount/${id}?page=${currentPage}`);
    },
    cancelBooking: async (idBooking, message) => {
        return await instance.post(`/api/bookings/cancel-booking/${idBooking}`, message);
    },
    getBookingsByOwnerWeek: (ownerId, month, year, startDay, endDay) => {
        return instance.get(`/api/bookings/${ownerId}/week?month=${month}&year=${year}&startDay=${startDay}&endDay=${endDay}`)
    },
    getBookingsByHouseId: (houseId) => {
        return instance.get(`/api/bookings/house/${houseId}`);
    },
    bookingHouse: (booking) => {
        return instance.post('/api/bookings', booking);
    },
    searchBookingsByOwnerId: (ownerId, nameSearch, status, selectedDateStart, selectedDateEnd, currentPage) => {
        const requestData = {
            ownerId: ownerId,
            nameSearch: nameSearch,
            status: status,
            selectedDateStart: selectedDateStart,
            selectedDateEnd: selectedDateEnd,
        };
        return instance.post(`/api/bookings/${ownerId}/search?page=${currentPage}`, requestData)

    },
    waitOwnerConfirmBooking: (idBooking) => {
        return instance.post("/api/bookings/wait/" + idBooking);
    },
    checkinBookingAdmin: (idBooking) => {
        return instance.post("/api/bookings/checkin/" + idBooking);
    },
    checkoutBookingAdmin: (idBooking) => {
        return instance.post("/api/bookings/checkout/" + idBooking);
    },
    createReview: (review) => {
        return instance.post("/api/bookings/reviews", review);
    }
};


export default BookingService;