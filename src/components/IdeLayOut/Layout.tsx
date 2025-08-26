import React from 'react'
import IdeTabs from './IdeTabs'
import MainWindow from './MainWindow'
import IdeTopNavBar from './IdeTopNavBar'

function Layout() {
    return (
        <div>
            <IdeTopNavBar />
            <div className="min-h-screen flex">
                <IdeTabs />

                <div className="flex-1">
                    <MainWindow />
                </div>
            </div>
        </div>
    )
}

export default Layout
