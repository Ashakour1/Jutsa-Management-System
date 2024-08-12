import React from 'react'
import { Outlet } from 'react-router-dom'
import DesktopNav from '../navbar/DesktopNav'
import MobileNav from '../navbar/MobileNav'

const DashboardLayout = () => {

    return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <DesktopNav/>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <MobileNav/>
            </header>
            <main className="flex flex-1 items-start  p-4 sm:px-6 sm:py-0 flex-col">
                <Outlet/>
            </main>
        </div>
    </div> 
    )
}

export default DashboardLayout