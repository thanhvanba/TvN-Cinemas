import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserCircleIcon, PowerIcon, PencilSquareIcon, TrashIcon, XMarkIcon, ArrowUturnLeftIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SelectMenu from '../../../components/SelectMenu/SelectMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import AdminService from '../../../service/AdminService'
import UserService from '../../../service/UserService';
import ManagerService from '../../../service/ManagerService';

import format from "../../../utils/ConvertStringFollowFormat"
import TruncatedContent from '../../../utils/TruncatedContent'
import { LoginContext } from '../../../context/LoginContext';
import useLoadingState from '../../../hook/UseLoadingState';

import Pagination from '../../../components/Pagination'
import Loading from '../../../components/Loading';
import Search from '../../../components/Search';
import FoodItems from './components/foodItems';

import popcorn from '../../../images/popcorn.png'
import pnpegg from '../../../images/pngegg.png'
import AddItem from './components/addItem';
import Inflow from './components/inflow';
import Button from './components/button';
import { History, PopcornIcon } from 'lucide-react';
import ListStockEntries from './components/listStockEntries';

const ListProduct = () => {
    const { user } = useContext(LoginContext)
    const { pathname } = useLocation()
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(true);
    const [foodType, setFoodType] = useState('')
    const [toggle, setToggle] = useState(false)
    const [pagination, setPagination] = useState(
        {
            pageNumber: 1,
            pageSize: null,
            totalPages: null,
            totalElements: null
        }
    );
    const [pagination1, setPagination1] = useState(
        {
            pageNumber: 1,
            pageSize: null,
            totalPages: null,
            totalElements: null
        }
    );
    const [importHistory, setImportHistory] = useState(true);
    const [allFood, setAllFood] = useState([])
    const [allStockEntries, setAllStockEntries] = useState([])

    const { getFoodAdminApi, getStockEntriesADApi } = AdminService()
    const { getFoodApi } = UserService()
    const { getStockEntriesApi } = ManagerService()


    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }
    const handleGetItems = async (pageNumber) => {
        setLoading(true)
        let resFood = user.role === "ADMIN" ? await getFoodAdminApi(foodType, pageNumber, 10, status) : await getFoodApi(foodType, pageNumber, 10, localStorage.getItem("cinemaId"))
        if (resFood && resFood.data && resFood.data.result.content) {
            setAllFood(resFood.data.result.content)
            setPagination1(prevPagination => ({
                ...prevPagination,
                pageNumber: pageNumber,
                pageSize: resFood.data.result.pageSize,
                totalPages: resFood.data.result.totalPages,
                totalElements: resFood.data.result.totalElements
            }));
        }
        setLoading(false)
    }

    const handleGetStockEntries = async (pageNumber) => {
        // if (allStockEntries.length === 0) {
        setLoading(true)
        let resStockEntries = user.role === "MANAGER" ? await getStockEntriesApi(pageNumber, 5) : await getStockEntriesADApi(pageNumber, 5, '')
        if (resStockEntries && resStockEntries.data && resStockEntries.data.result.content) {
            setAllStockEntries(resStockEntries.data.result.content)
            setPagination(prevPagination => ({
                ...prevPagination,
                pageNumber: pageNumber,
                pageSize: resStockEntries.data.result.pageSize,
                totalPages: resStockEntries.data.result.totalPages,
                totalElements: resStockEntries.data.result.totalElements
            }));
        }
        setLoading(false)
        // }
    }
    const nameFoods = ["ALL", "BAP", "NUOCLOC", "NUOCNGOT", "ANVAT"]
    const handleSelectChange = (selectedValue) => {
        selectedValue !== "ALL" ? setFoodType(selectedValue) : setFoodType('')
    }

    useEffect(() => {
        handleGetItems(pagination1.pageNumber)
    }, [status]);
    useEffect(() => {
        handleGetItems(pagination1.pageNumber)
    }, [pathname]);
    useEffect(() => {
        handleGetItems(1)
    }, [foodType]);
    return (
        <div>
            <div className='px-4'>
                {
                    /^\/admin\/((add-item|update-item)\/food|food)/.test(pathname) ?
                        <AddItem /> :
                        <div className='relative'>
                            <div className='h-20 mb-2 flex justify-between items-center border-b-2'>
                                <h2 className='text-3xl cursor-default flex items-end'>
                                    <PopcornIcon className='h-12 w-12 mr-1 text-emerald-600' />
                                    Quản lý sản phẩm
                                </h2>
                            </div>
                            <div className='flex justify-center absolute mx-auto top-80 right-1/2 left-1/2 z-50'>
                                {loading && <Loading />}
                            </div>
                            <div className={`${importHistory ? 'border-2' : ''} h-full`}>
                                <div className='h-full relative'>
                                    <div className='relative flex justify-end items-center p-4'>
                                        {importHistory &&
                                            <div className="inline-block z-10 pl-2 py-1 m-2 rounded-full text-gray-100 bg-slate-50 border-2 relative h-9 w-40">
                                                <SelectMenu onSelectChange={handleSelectChange} items={nameFoods} content={"ALL"} />
                                            </div>
                                        }
                                        <div className='flex justify-center absolute top-0 left-0 w-full p-3'>
                                            {!status ?
                                                <h1 className='uppercase py-3 text-center text-2xl font-bold text-emerald-600'>sản phẩm đã xóa</h1>
                                                : !importHistory ?
                                                    <h1 className='uppercase py-3 text-center text-2xl font-bold text-emerald-600'>Lịch sử nhập hàng</h1>
                                                    : <> {user.role === "ADMIN" ?
                                                        <div className='mx-2 w-24 h-16 border-sky-400 hover:bg-slate-100 border-2 rounded-lg'>
                                                            <Button click={() => changeTab('/admin/add-item/food')} img={popcorn} title={"Thêm sản phẩm"} />
                                                        </div>
                                                        : <div className='mx-2 w-24 h-16 border-sky-400 hover:bg-slate-100 border-2 rounded-lg'>
                                                            <Button click={() => { setToggle(!toggle) }} img={pnpegg} title={"Nhập hàng"} />
                                                        </div>
                                                    }
                                                    </>
                                            }
                                        </div>
                                        <div className='flex gap-x-1 absolute top-4 left-4 justify-start'>
                                            {user.role === "ADMIN" ?
                                                <button
                                                    type="button"
                                                    className="z-10"
                                                >
                                                    <span className="sr-only">Close menu</span>
                                                    <div className={`${status ? '' : 'shadow-inner'} p-1 border-2 rounded-lg text-red-900`}
                                                        onClick={() => setStatus(!status)}
                                                    >
                                                        {status ?
                                                            <TrashIcon className="text-4xl h-10 w-10 z-10 cursor-pointer opacity-80 hover:opacity-100 shadow-inner"
                                                                aria-hidden="true"
                                                            />
                                                            : <ArrowUturnLeftIcon className="text-4xl h-10 w-10 z-10 cursor-pointer opacity-80 hover:opacity-100 shadow-inner"
                                                                aria-hidden="true"
                                                            />
                                                        }
                                                    </div>
                                                </button>
                                                : <button
                                                    type="button"
                                                    className="z-10"
                                                >
                                                    <span className="sr-only">Close menu</span>
                                                    <div className={`${importHistory ? '' : 'shadow-inner'} p-1 border-2 rounded-lg text-sky-900`}
                                                    >
                                                        {importHistory ?
                                                            <History
                                                                className="text-4xl h-10 w-10 z-10 cursor-pointer opacity-80 hover:opacity-100 shadow-inner"
                                                                aria-hidden="true"
                                                                onClick={() => { setImportHistory(!importHistory); handleGetStockEntries(pagination.pageNumber) }}
                                                            />
                                                            : <ArrowUturnLeftIcon
                                                                className="text-4xl h-10 w-10 z-10 cursor-pointer opacity-80 hover:opacity-100 shadow-inner"
                                                                aria-hidden="true"
                                                                onClick={() => {
                                                                    setImportHistory(!importHistory);
                                                                    setPagination(prevPagination => ({
                                                                        ...prevPagination,
                                                                        pageNumber: 1
                                                                    }));
                                                                    setFoodType('')
                                                                }}
                                                            />
                                                        }
                                                    </div>
                                                </button>
                                            }
                                        </div>
                                    </div>

                                    {!loading &&
                                        <>
                                            {toggle &&
                                                <div className=''>
                                                    <Inflow onToggle={setToggle} />
                                                </div>
                                            }
                                            {
                                                !importHistory ? <ListStockEntries allStockEntries={allStockEntries} pagination={pagination} handleGetStockEntries={handleGetStockEntries} /> :
                                                    allFood.length === 0 ?
                                                        <p className='text-center pt-4 text-lg text-slate-400 font-ligh'>--- Chưa có sản phẩm ---</p> :
                                                        <div className='grid grid-cols-5 gap-4 px-4 pb-4'>
                                                            <FoodItems listFood={allFood} />
                                                        </div>
                                            }
                                            {importHistory && allFood.length !== 0 &&
                                                <Pagination pageNumber={pagination1.pageNumber} pageSize={pagination1.pageSize}
                                                    totalElements={pagination1.totalElements} totalPages={pagination1.totalPages} getItemByPage={handleGetItems} />
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </div>

                }
            </div>
        </div >
    )
}
export default ListProduct