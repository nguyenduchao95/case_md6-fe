import axios from 'axios';

const HouseByIdService = {

    getHousesByOwnerId: (ownerId, currentPage) => {
        return new Promise((resolve, reject) => {
            axios
                .get('http://localhost:8080/api/houses/owner/' + ownerId + "?page=" + currentPage )
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err=>console.log(err))
                });
        })
    },

    getAllHouse: ( currentPage) => {
        return new Promise((resolve, reject) => {
            axios
                .get('http://localhost:8080/api/houses?page=' + currentPage )
                .then(response => {
                    resolve(response.data);
                    console.log(currentPage)
                })
                .catch(function (err) {
                    reject(err=>console.log(err))
                });
        })
    },

    findByOwnerIdAndNameContains: (ownerId, name,currentPage) => {
        return new Promise((resolve, reject) => {
            axios
                .get('http://localhost:8080/api/houses/owner/by-name/' + ownerId + "?name=" + name + "&page=" + currentPage)
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err)
                });
        })
    },


    findByOwnerIdAndStatus: (ownerId, status,currentPage) => {
        return new Promise((resolve, reject) => {
            axios
                .get('http://localhost:8080/api/houses/owner/by-status/' + ownerId + "?status=" + status + "&page=" + currentPage)
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err)
                });
        })
    },

};


export default HouseByIdService;
