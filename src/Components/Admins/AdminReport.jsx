import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { adminReports } from '../../Services/admin';
import toast from 'react-hot-toast';
import AdminReportCard from '../Cards/AdminReportCard';
import Loading from '../Loading';

const AdminReport = () => {

    const [reports, setReports] = useState([])
    const [isLoading, setLoading] = useState(true)

    const getReports = useCallback(async () => {
        const res = await adminReports()
        if(!res.report) return toast.error("Report does not found")
        setReports(res.report)
        setLoading(false)
    }, [])
    
    useEffect(() => {
        getReports()
    }, [])

    return (
        <Fragment>
            {
                isLoading && <div className='inline-block mt-20'>
                    <Loading className='w-52 h-72'/>
                </div>
            }
            {
                !isLoading && <div className='mt-20'>
                <div className='flex gap-3'>
                    {
                        reports.map(item => {
                            return (
                                <Fragment key={item._id}>
                                    <AdminReportCard item={item}/>
                                </Fragment>
                            )
                        })
                    }
                </div>
            </div>
            }
        </Fragment>
    );
}

export default memo(AdminReport);
