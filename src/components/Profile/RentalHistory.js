import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import _ from 'lodash';
import BookingService from "../../service/BookingService";
import {convertDateFormat, formatCurrency} from "../../service/format";
import {Pagination} from "@mui/material";
import Swal from "sweetalert2";
import SearchBooking from "./searchBooking/SearchBooking";

const RentalHistory = () => {
    const account = useSelector(state => state.account);
    const [rentalList, setRentalList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [load, setLoad] = useState(false);
    const [houseName , setHouseName] = useState('');
    const [status , setStatus] = useState('');
    const [startTime , setStartTime] = useState(null);
    const [endTime , setEndTime] = useState(null);
    const [localStartTime , setLocalStartTime] = useState(null);
    const [localEndTime , setLocalEndTime] = useState(null);

    useEffect(() => {

        getRentalList(account.id, currentPage - 1);
    }, [currentPage , houseName , status , localStartTime , localEndTime])

    useEffect(() => {
        getRentalList(account.id, currentPage - 1);
        setLoad(false);
    }, [load])

    const handleHouseName = (e) => {
        let {value} = e.target;
        console.log(value);
        setHouseName(value);
    }

    const changeDate = (dayValue) => {
        const date = dayValue.split("-");
        const year = parseInt(date[0]);
        const month = parseInt(date[1]);
        const day = parseInt(date[2]);

        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            const localDateTime = new Date(year, month - 1, day);
            localDateTime.setMinutes(0);
            localDateTime.setSeconds(0);

            return localDateTime.toISOString().slice(0, 16);
        } else {
            return "";
        }
    }
    const handleStartTime = (e) => {
        console.log();
        setStartTime(e.target.value);
        setLocalStartTime(changeDate(e.target.value));
    }

    const handleEndTime = (e) => {
        console.log(e.target.value);
        setEndTime(e.target.value);
        setLocalEndTime(changeDate(e.target.value))
    }

    const getRentalList = (id, currentPage) => {
        let booking = {
            houseName : houseName,
            status : status,
            startTime : localStartTime ,
            endTime : localEndTime
        };
        BookingService.getHistoryByAccount(id, currentPage , booking).then((response) => {
            const result = response.data.content;
            console.log(result)
            setRentalList(result);
            setTotalPages(response.data.totalPages);
        }).catch(function (err) {
            console.log(err);
        })}
    const changePage = (e, value) => {
        setCurrentPage(value);
    }
    const cancelBooking = (item) => {
        BookingService.cancelBooking(item.id).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Hủy lịch thuê thành công !',
                showConfirmButton: false,
                timer: 1500
            })
            setLoad(true);
        }).catch(function (err) {
            console.log(err);
        })
    }
    const showCancelBookingConfirm = (booking) => {
        if (new Date(booking.startTime) - new Date() > (1000 * 60 * 60 * 48)) {
            Swal.fire({
                title: 'Bạn chắc chắn muốn hủy thuê nhà?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Đóng',
            }).then((result) => {
                if (result.isConfirmed) {
                    cancelBooking(booking);
                }
            })
        } else if (new Date(booking.startTime) - new Date() > (1000 * 60 * 60 * 24)) {
            Swal.fire({
                title: 'Thời gian hủy nhỏ hơn 2 ngày tính tới ngày thuê nhà, bạn sẽ chịu khoản phí 10% tiền thuê nhà',
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Đóng',
            }).then((result) => {
                if (result.isConfirmed) {
                    cancelBooking(booking);
                }
            })
        }
    }
    const checkBookingStatus = (item) => {
        if (item.status === "Đã hủy") {
            return null;
        } else if ((new Date(item.startTime) - new Date() > (1000 * 60 * 60 * 24))
            && item.status === 'Chờ nhận phòng') {
            return (
                <button className='btn btn-danger'
                        onClick={() => showCancelBookingConfirm(item)}>
                    Hủy thuê
                </button>
            )
        }
    }
    return (
        <div className={'col-9'}>
            <div>
                <h3 className="text-uppercase text-center mb-4">Lịch sử thuê nhà</h3>
                <div className="mb-3 py-4 px-3"
                     style={{backgroundColor: "rgb(0,185,142)"}}>
                    <div className="row g-2">
                        <div className="col-md-3">
                            <select className="form-select py-2 border-0" value={status} onChange={(e)=>{
                                setStatus(e.target.value)
                            }}
                                 style={{minWidth: '200px'}}>
                                <option value="">Tất cả</option>
                                <option value="Chờ nhận phòng">Chờ nhận phòng</option>
                                <option value="Đã trả phòng">Đã trả phòng</option>
                                <option value="Đã hủy">Đã hủy</option>
                                <option value="Đang ở">Đang ở</option>
                                <option value="Chờ xác nhận">Chờ xác nhận</option>
                            </select>
                        </div>

                        <div className="col-md-5">
                            <input type="text" className="form-control border-0 py-2" placeholder="Nhập từ khóa tìm kiếm"
                                   onInput={handleHouseName} name="houseName" value={houseName}/>
                        </div>
                        <div className="col-2">
                            <div className="input-group">
                                <input type="date" className="form-control" name="startTime" onChange={handleStartTime}   value={startTime} />
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="input-group">
                                <input type="date" className="form-control" name="endTime" onChange={handleEndTime} min={startTime} value={endTime}  />
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table">
                    <thead>
                    <tr align="center">
                        <th scope="col">STT</th>
                        <th scope="col">Tên ngôi nhà</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Ngày thuê nhà</th>
                        <th scope="col">Ngày trả nhà</th>
                        <th scope="col">Tổng đơn</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Hành động</th>
                    </tr>
                    </thead>
                    <tbody style={{verticalAlign: 'middle'}}>
                    {!_.isEmpty(rentalList) ? rentalList.map((item, index) => {
                            return (
                                <tr key={item.id} align="center">
                                    <th style={{width: '40px'}}>{index + 1}</th>
                                    <th>{item.house?.name}</th>
                                    <td>{item.house?.province}</td>
                                    <td>{convertDateFormat(item.startTime)}</td>
                                    <td>{convertDateFormat(item.endTime)}</td>
                                    <td>{formatCurrency(item.total)}</td>
                                    <td>{item.status === "Đã hủy" ?
                                        <span className={'text-danger'}>{item.status}</span> :
                                        <span>{item.status}</span>}</td>
                                    <td>
                                        {checkBookingStatus(item)}
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <tr align="center">
                            <td colSpan="8" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                        </tr>
                    }
                    </tbody>
                </table>
                <span className={'text-danger'}>* Lưu ý : Bạn chỉ có thể hủy thuê nhà trước ngày thuê nhà ít nhất 2 ngày. </span>
                {!_.isEmpty(rentalList) ?
                <div className="col-12 mt-5 d-flex justify-content-center">
                    <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                onChange={changePage} color="primary"/>
                </div>
                    :
                    null
                }
            </div>
        </div>
    );
};

export default RentalHistory;