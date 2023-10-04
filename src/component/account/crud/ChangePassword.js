import React, {useEffect, useState} from 'react';
import {Field, Form, Formik} from "formik";

import * as Yup from "yup";
import {useParams} from "react-router-dom";
import {toast} from 'react-toastify';
import accountService from "../AccountService";
import async from "async";
const ChangePassword = () => {
/*    const validateSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(6, "Mật khẩu có độ dài 6-18 ký tự!")
            .max(18 , "Mật khẩu có độ dài 6-18 ký tự!")
            .required("Mật khẩu không được để trống"),
        confirmNewPassword: Yup.string()
            .min(6, "Mật khẩu có độ dài 6-18 ký tự!")
            .max(18 , "Mật khẩu có độ dài 6-18 ký tự!")
            .required("Mật khẩu không được để trống"),

    });*/

    const {id} = useParams();
    const [account, setAccount] = useState({});

    useEffect(() => {
        getAccountById();
    }, []);
    const getAccountById = () => {
        accountService.getAccountById(id).then((response) => {
            setAccount(response)
        }).catch(function (err) {
            console.log(err);
        })
    }

    const handleChangePassword = (values) => {
      /*  if (account.password !== values.password) {
            toast.error("Mật khẩu hiện tại không đúng!!!", {position: "top-center", autoClose: 1000,});
        }else {
            if (values.newPassword !== values.confirmNewPassword){
                toast.error("Mật khẩu mới không đúng!!!", {position: "top-center", autoClose: 1000,});
            }else {
                setAccount({...account , password : values.newPassword});
                console.log()
                console.log(account);
              /!*  editPassword();*!/
            }
        }*/
        console.log(account);
        accountService.checkPassword(account).then((response) => {
            alert("ok");
        }).catch(function (err) {
            console.log(err);
        })
    }

    /*  const editPassword = () => {
          console.log(account);
          accountService.changePassWord(account).then((response) => {
              toast.success("Thay đổi mật khẩu thành công", {position: "top-center", autoClose: 1000,});
          });
    }*/

    return (
        <div className={"container"}>

            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
                                <div className="card-body p-5 text-center">

                                    <h3 className="mb-5" style={{color: "#0174c3"}}>Thay đổi mật khẩu</h3>
                                    <Formik initialValues={{
                                        password : '',
                                        newPassword : '',
                                        confirmNewPassword : ''
                                    }}
                                         //   validationSchema={validateSchema}
                                            onSubmit={(values) => {
                                                handleChangePassword(values);
                                            }}>

                                    <Form>
                                        <div className="form-outline mb-4">
                                            <Field type="text" id="password" name="password"
                                                   className="form-control form-control-lg"
                                              onInput = {(event) => {
                                                setAccount({...account , password : event.target.value})
                                              }} />
                                            <div >
                                                <label className="form-label" htmlFor="password">Mật khẩu hiện tại</label>
                                            </div>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <Field type="password" id="newPassword" name ="newPassword"
                                                   className="form-control form-control-lg"
                                                   />
                                            <div >
                                                <label className="form-label" htmlFor="newPassword">Mật khẩu mới </label>
                                            </div>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <Field type="password" id="confirmNewPassword" name="confirmNewPassword"
                                                   className="form-control form-control-lg"
                                                   />
                                            <div>
                                                <label className="form-label" htmlFor="confirmNewPassword">Xác nhận mật khẩu mới</label>
                                            </div>
                                        </div>
                                        <hr className="my-4"/>
                                        <button className="btn btn-lg btn-block btn-primary"
                                                style={{backgroundColor: "#39dd86 ", color: "black"}}
                                                type="submit">
                                            Xác nhận thay đổi
                                        </button>
                                    </Form>

                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ChangePassword;