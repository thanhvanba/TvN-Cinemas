import React from 'react'
import ListPromotion from './components/listPromotion'
import DetailPromotion from './components/detailPromotion'
import { useLocation } from 'react-router-dom'
import AddPromotion from './components/addPromotion'

function Promotion() {
    const { pathname } = useLocation()
    return (
        <div>
            {/^\/(admin|manager)\/list-promotion/.test(pathname) ? <ListPromotion /> :
                /^\/(admin|manager)\/(update-item\/promotion|promotion)/.test(pathname) ? <DetailPromotion /> :
                    /^\/(admin|manager)\/add-item\/promotion/.test(pathname) && <AddPromotion />
            }
        </div>
    )
}

export default Promotion
