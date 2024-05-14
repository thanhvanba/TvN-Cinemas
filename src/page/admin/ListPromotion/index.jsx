import React from 'react'
import ListPromotion from './components/listPromotion'
import DetailPromotion from './components/detailPromotion'
import { useLocation } from 'react-router-dom'

function Promotion() {
    const { pathname } = useLocation()
    return (
        <div>
            {/^\/(admin|manager)\/list-promotion/.test(pathname) ? <ListPromotion /> :
                /^\/(admin|manager)\/promotion/.test(pathname) && <DetailPromotion />
            }
        </div>
    )
}

export default Promotion
