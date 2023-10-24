import React, {useEffect, useState} from 'react';
import Banner from "./Banner";
import AdminTeam from "./AdminTeam";
import HouseComponent from "./HouseComponent";
import houseByIdService from "../../service/HouseByIdService";
import SearchHouse from "./SearchHouse";
import Top5BookingHouse from "./Top5BookingHouse";
import {useSelector} from "react-redux";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nameSearch, setNameSearch] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [province, setProvince] = useState("");
    const [houses, setHouses] = useState([]);
    const  account = useSelector(state => state.account);
    const nagivate = useNavigate();

    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    const getAllHouseByPriceAndProvince = (currentPage, nameSearch, province, minPrice, maxPrice) => {
        houseByIdService.getAllHouseByPriceAndProvince(currentPage, nameSearch, province, minPrice, maxPrice)
            .then((houses) => {
                setHouses(houses.content);
                setTotalPages(houses.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getAllHouseByPriceAndProvince(currentPage - 1, nameSearch, province, minPrice, maxPrice);
    }, [currentPage, nameSearch, province, minPrice, maxPrice]);

    useEffect(() => {
        if (account.firstname == null){
            console.log(account.firstname);
            checkInfoAccount();
        }
    },[])

    const checkInfoAccount = () => {
        Swal.fire({
            title: 'Bạn chưa đầy đủ thông tin cá nhân. Vui lòng cập nhật đầy đủ thông tin?',
            icon: 'warning',
            confirmButtonText: 'Xác nhận',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
               nagivate('/profile/edit-profile');
            }
        })
    }

    return (
        <div className="container-home">
            <Banner/>

            {/*Search begin*/}
            <SearchHouse setNameSearch={setNameSearch} setMinPrice={setMinPrice}
                         setMaxPrice={setMaxPrice} setProvince={setProvince} setCurrentPage={setCurrentPage}/>
            {/*Search End*/}

            <div className="container py-3">
                <h2 className="text-center mb-5">Top 5 ngôi nhà có nhiều lượt đặt thuê nhất</h2>
                <Top5BookingHouse/>
                <br/>
                <br/>
                <h2 className="text-center m-5">Danh sách các nhà cho thuê</h2>
                <HouseComponent houses={houses} totalPages={totalPages} changePage={changePage}/>

                <AdminTeam/>
            </div>
        </div>
    );
};

export default HomePage;