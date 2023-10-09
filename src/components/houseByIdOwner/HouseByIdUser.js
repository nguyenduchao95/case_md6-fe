import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";
import houseByIdService from "../../service/HouseByIdService";
import {Pagination} from "@mui/material";

const HouseByIdUser = () => {
    const [status, setStatus] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [houses, setHouses] = useState([]);
    const [house, setHouse] = useState({});

    const changePage = (e, value) => {
        setCurrentPage(value)
    }

    const handleStatusChange = (house) => {
        const updatedHouse = {...house};
        if (house.status === "booked") {
            Swal.fire({
                icon: 'error',
                title: 'Không thể thay đổi trang thái khi có người đang thuê !',
                showConfirmButton: false,
                timer: 1000
            })
            return;
        } else {
            Swal.fire({
                title: 'Bạn có chắc muốn thay đổi trạng thái không?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có, thay đổi!'
            }).then((result) => {
                if (result.isConfirmed) {

                    updatedHouse.status = house.status === "repair" ? "available" : "repair";

                    updateStatus(updatedHouse);
                }
            });
        }
    };


    const updateStatus = (house) => {
        houseByIdService
            .updateStatusHouse(house.id, house.status)
            .then(() => {
                setHouse(house);

                Swal.fire({
                    icon: 'success',
                    title: 'Trạng thái đã được cập nhật thành công !',
                    showConfirmButton: false,
                    timer: 1000
                })
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Có lỗi xảy ra khi cập nhật trạng thái !',
                    showConfirmButton: false,
                    timer: 1000
                })
            });
    };



    const findByOwnerIdAndNameAndStatus = ( id, nameSearch, status,currentPage) => {
        console.log(currentPage + " " + id + " " + nameSearch + " "+ status)

        houseByIdService.findByOwnerIdAndNameAndStatus(id, nameSearch, status ,currentPage)
            .then((houses) => {
                setHouses(houses.content);
                setTotalPages(houses.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleOptionChange = (event) => {
        const optionValue = event.target.value;
        setStatus(optionValue);
    };
    const handleNameSearch = (event) => {
        const nameSearch = event.target.value;
        setNameSearch(nameSearch);
    };

    useEffect(() => {
        const ownerId = 2;
        findByOwnerIdAndNameAndStatus(ownerId,nameSearch,status , currentPage-1)
    }, [currentPage, house, status , nameSearch])

    return (
        <div>
            <div className="container-fluid mb-5 wow fadeIn" data-wow-delay="0.1s"
                 style={{padding: 35, backgroundColor: "rgb(0,185,142)"}}>
                <div className="container">
                    <div className="row g-2">
                        <div className="col-md-12">
                            <div className="row g-2">
                                <div className="col-md-4">
                                    <select name="" id="" className="form-select border-0" value={status}
                                            onChange={handleOptionChange}>
                                        <option value="">Tất cả</option>
                                        <option value="Available">Available</option>
                                        <option value="Booked">Booked</option>
                                        <option value="Repair">Repair</option>
                                    </select>
                                </div>

                                <div className="col-md-8">
                                    <input type="text" className="form-control border-0" placeholder="Search" name=""
                                           id="" value={nameSearch} onInput={handleNameSearch}/>
                                < /div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div>
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="tab-className text-center wow fadeInUp" data-wow-delay="0.3s">
                            <div className="tab-content">
                                <div className="job-item p-4 mb-4">
                                    <div className="row g-4">
                                        <div className="col-sm-12 col-md-6 d-flex align-items-center">
                                            <h4>Thông tin</h4>
                                        </div>
                                        <div
                                            className="col-sm-12 col-md-2 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                            <h5>Doanh thu</h5>
                                        </div>
                                        <div
                                            className="col-sm-12 col-md-3 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                            <h4 style={{paddingLeft: 110}}>Action</h4>
                                        </div>
                                    </div>
                                    {houses.map((house) => {
                                        return (
                                            <div className="row g-4" key={house.id}>
                                                <div className="col-sm-12 col-md-7 d-flex align-items-center">
                                                    <img className="flex-shrink-0 img-fluid border rounded"
                                                         src={house.thumbnail} alt=""
                                                         style={{width: 80, height: 80}}/>
                                                    <div className="text-start ps-4">
                                                        <h5 className="mb-3">{house.name}</h5>
                                                        <span className="text-truncate me-3"><i
                                                            className="fa fa-map-marker-alt me-2"
                                                            style={{color: "rgb(0,185,142)"}}></i>{house.address}</span>
                                                        <span className="text-truncate me-0"><i
                                                            className="far fa-money-bill-alt  me-2"
                                                            style={{color: "rgb(0,185,142)"}}></i>{house.price}</span>
                                                    </div>
                                                </div>

                                                <div
                                                    className="col-sm-12 col-md-1 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                                    <b>{house.revenue} - VNĐ</b>
                                                </div>
                                                <div
                                                    className="col-sm-12 col-md-1  d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                                    <div className="d-flex mb-3">
                                                        <a className="btn"
                                                           style={{
                                                               backgroundColor: "rgb(0,185,142)",
                                                               textcolor: "white"
                                                           }}
                                                           href="">ok</a>
                                                    </div>
                                                </div>
                                                <div
                                                    className="col-sm-12 col-md-1 ms-5 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                                    <div className="d-flex mb-3">
                                                    <span className="btn btn-warning" style={{width: 100}}
                                                          onClick={() => handleStatusChange(house)}
                                                          href="">{house.status}</span>
                                                    </div>
                                                </div>

                                                <div
                                                    className="col-sm-12 col-md-1  d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                                    <div className="d-flex mb-3">
                                                        <a className="btn"
                                                           style={{
                                                               backgroundColor: "rgb(0,185,142)",
                                                               textcolor: "white"
                                                           }}
                                                           href="">Edit</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="col-12 mt-5 d-flex justify-content-center">
                                    <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                                onChange={changePage} color="primary"/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default HouseByIdUser;