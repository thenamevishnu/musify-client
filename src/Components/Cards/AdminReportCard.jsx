import { Fragment, memo } from "react"

const AdminReportCard = ({ item }) => {

    return (
        <Fragment>
            <div className={`group text-center hover:bg-[#222] bg-hover p-2 text-white cursor-pointer overflow-hidden w-52 rounded-2xl inline-block mx-1 transition-all duration-150 ease-linear`}>
                <div className='overflow-hidden rounded-2xl relative'>
                    <img src={item.thumb || "./no-thumb.jpeg"} alt={item.title} className='rounded-2xl group-hover:scale-110 transition-all duration-150 ease-linear object-cover aspect-square' />
                </div>
                <div className='overflow-x-hidden whitespace-nowrap mt-2 relative'>
                    <div>{item.title}</div>
                    <div>Total Play: {item.plays.length}</div>
                    <div>Singer: {item.singer?.[0].name}</div>
                    <div>Status: { item.status.toUpperCase() }</div>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(AdminReportCard)
