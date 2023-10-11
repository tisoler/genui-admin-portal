import React, { useState } from 'react'
import { useSidebarContext } from '../../contexts/sidebarContext'
import Link from 'next/link'

export default function Sidebar() {
	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0)
	const { sidebarOpen, options, switchSidebarOpen } = useSidebarContext()

	// Define our base class
	const containerClassName = "bg-white w-[290px] transition-[margin-left] ease-in-out duration-500 fixed top-[65px] bottom-0 left-0 z-40 pt-5 px-5"

	// Append class based on state of sidebar visiblity
	const appendClass = sidebarOpen ? " ml-0" : " ml-[-290px]"

	// Overlay to prevent clicks in background, also serves as our close button
	const ModalOverlay = () => (
		<div
			className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
			onClick={() => {
				switchSidebarOpen()
			}}
		/>
	)

	return (
		<>
			<div className={`${containerClassName}${appendClass}`}>
				<div className='border-r border-r-gray-200 h-full flex flex-col px-2 text-sm font-medium mt-2'>
					{ options?.map((option, idx) => (
						option.href ?
							(
								<div key={idx} onClick={() => setSelectedOptionIndex(idx)}>
									<Link
										href={option.href}
										aria-label={option.text}
										className={`flex items-center h-[31px] my-3 text-left pl-2 rounded-sm ${selectedOptionIndex === idx ? `bg-primary` : 'hover:bg-gray-100'}`}
									>
										{option.text}
									</Link>
								</div>	
							)
						: (
							<button
								key={idx}
								aria-label={option.text}
								onClick={() => {
									setSelectedOptionIndex(idx)
									if (option.callbackFunc) option.callbackFunc()
								}}
								className={`h-[31px] my-3 text-left pl-2 rounded-sm ${selectedOptionIndex === idx ? `bg-primary` : 'hover:bg-gray-100'}`}
							>
								{option.text}
							</button>
						)
					))}
				</div>
			</div>
			{sidebarOpen ? <ModalOverlay /> : <></>}
		</>
	)
}
