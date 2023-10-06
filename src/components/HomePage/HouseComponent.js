import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import './home.scss';
import {Pagination} from "@mui/material";
import houseByIdService from "../../service/HouseByIdService";
import {formatCurrency} from "../../service/format";

const HouseComponent = () => {
    const [houses, setHouses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const changePage = (e, value) => {
        setCurrentPage(value);
    }
    const getAllHouse = (currentPage) => {
        houseByIdService.getAllHouse(currentPage)
            .then((houses) => {
                setHouses(houses.content);
                setTotalPages(houses.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAllHouse(currentPage - 1);
        window.scrollTo({
            top: 600,
            behavior: "smooth"
        })
    }, [currentPage])
    return (
        <div className="container">
            <div className="row g-4">
                {
                   !_.isEmpty(houses) && houses.map(house => {
                        return (
                            <div className="col-lg-4 col-md-6" key={house.id}>
                                <div className="house-item border rounded overflow-hidden">
                                    <div className="position-relative overflow-hidden">
                                        <div>
                                            <img height={273} width={406} src={house.thumbnail} alt=""/>
                                        </div>
                                    </div>
                                    <div className="p-4 pb-0">
                                        <h5 className="mb-2 text-center text-truncate">{house.name}</h5>
                                        <h5 className=" mb-3 color-primary text-center">
                                            {formatCurrency(house.newPrice)} / ngày
                                            <del className="text-secondary ms-3 fs-6">
                                                {formatCurrency(house.oldPrice)}
                                            </del>
                                        </h5>
                                        <p className="text-truncate">
                                            <i className="fa fa-map-marker-alt me-2 color-primary"></i>
                                            {house.address}
                                        </p>
                                    </div>
                                    <div className="d-flex border-top p-2">
                                        <small className="flex-fill text-center border-end py-2">
                                            <i className="fa fa-ruler-combined me-2 color-primary"></i>
                                            {house.area} m²
                                        </small>
                                        <small className="flex-fill text-center border-end py-2">
                                            <i className="fa fa-bed me-2 color-primary"></i>
                                            {house.bedroom} Ngủ
                                        </small>
                                        <small className="flex-fill text-center py-2">
                                            <i className="fa fa-bath  me-2 color-primary"></i>
                                            {house.bathroom} Tắm
                                        </small>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                <div className="col-12 mt-5 d-flex justify-content-center">
                    <Pagination count={totalPages} size="large" variant="outlined" shape="rounded" onChange={changePage}
                                color="primary"/>
                </div>
            </div>
        </div>
    )
};

export default HouseComponent;