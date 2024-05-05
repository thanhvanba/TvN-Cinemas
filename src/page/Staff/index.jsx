import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Header from './components/header'
import logo from "../../images/logo.png"
import UserService from '../../service/UserService';

function Staff() {
    return (
        <div className='flex w-full justify-between pb-4'>
            <div className='w-1/5 flex flex-col'>
                <div className='bg-slate-100 h-screen'>
                    <div className='flex items-center justify-center px-8 p-3 border-b-2 outline-none' >
                        <a onClick={() => { changeTab('/') }} href="" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-14 w-auto" src={logo} alt="" />
                        </a>
                    </div >

                </div>
            </div>
            <div className='w-4/5'>
                <Header />
            </div>
        </div>
    )
}

export default Staff
