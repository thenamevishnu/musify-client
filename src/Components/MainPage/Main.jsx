import React, { Fragment } from 'react'
import SongList from './SongList'
import Singers from './Singers'
import Suggestions from './Suggestions'
import PlayMusic from './PlayMusic'
import Treanding from './Trending'

const Main = () => {
    return (
        <Fragment>
            <div className='mt-20 px-2 md:px-10 pb-20'>
                <div className='flex flex-col'>
                    <div>
                        <h2 className='text-white text-2xl mb-4'>TRENDING</h2>
                    </div>
                    <div className='overflow-x-scroll whitespace-nowrap'>
                         <Treanding />
                   </div>
                </div>
                <div className='flex gap-5 flex-col sm:flex-row overflow-y-scroll'>
                    <div className='w-full sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12'>
                        <SongList />
                    </div>
                    <div className='w-full sm:w-6/12 md:w-7/12 lg:w-8/12 xl:w-9/12 mt-5'>
                        <div className='overflow-x-scroll w-full whitespace-nowrap'>
                            <h2 className='text-white text-2xl absolute'>SINGERS</h2>
                            <Singers />
                        </div>
                        <div className='mt-6 overflow-x-scroll w-full whitespace-nowrap'>
                            <h2 className='text-white text-2xl absolute'>SIMILER SONGS</h2>
                            <Suggestions />
                        </div>
                    </div>
                </div>
            </div>
            <PlayMusic />
        </Fragment>
    )
}

export default Main
