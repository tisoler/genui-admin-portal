'use client'
import React from 'react'
import Sidebar from '../sidebar'
import SidebarProvider from '../../contexts/sidebarContext'
import Navbar from '../navbar'
import SearchProvider from '../../contexts/searchContext'

interface Props {
	children: React.ReactNode
}

export const Layout = ({children}: Props) => {
   return (
		<SidebarProvider>
			<SearchProvider>
				<div className='flex'>
					<Navbar />
					<Sidebar />
					<div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
						{children}
					</div>
				</div>
			</SearchProvider>
		</SidebarProvider>
   )
}
