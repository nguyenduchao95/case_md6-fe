import axios from 'axios';

const HouseByIdService = {

    getHousesByOwnerId: (ownerId, currentPage) => {
        console.log(currentPage)
        return new Promise((resolve, reject) => {
            console.log(currentPage)
            axios
                .get('http://localhost:8080/api/houses/owner/' + ownerId + "?page=" + currentPage)
                .then(response => {
                    resolve(response.data.content);
                })
                .catch(function (err) {
                    reject(err=>console.log(err))
                });
        })
    },

    findByOwnerIdAndNameContains: (ownerId, name) => {
        return new Promise((resolve, reject) => {
            axios
                .get('http://localhost:8080/api/houses/owner/by-name/' + ownerId + "?name=" + name)
                .then(response => {
                    resolve(response.data.content);
                })
                .catch(function (err) {
                    reject(err)
                });
        })
    },


    findByOwnerIdAndStatus: (ownerId, status) => {
        return new Promise((resolve, reject) => {
            axios
                .get('http://localhost:8080/api/houses/owner/by-status/' + ownerId + "?status=" + status)
                .then(response => {
                    resolve(response.data.content);
                })
                .catch(function (err) {
                    reject(err)
                });
        })
    },

};


export default HouseByIdService;