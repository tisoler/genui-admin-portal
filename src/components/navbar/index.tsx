import React from 'react'
import Link from 'next/link'
import { useSidebarContext } from '../../contexts/sidebarContext'
import menuIcon from '../../../public/menu-icon.svg'
import logo from '../../../public/bend-logo.svg'
import { usePathname } from 'next/navigation'

const pageButtonsStyle = 'mx-1 md:mx-2 py-2 px-3 rounded-md text-sm font-medium'

export default function Navbar() {
  const { switchSidebarOpen } = useSidebarContext()
  const pathname = usePathname()

  return (
    <nav className="z-20 fixed top-0 left-0 right-0 h-[60px] bg-white flex px-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.15)] items-center justify-start">
      <button
        className="md:hidden"
        onClick={() => {
          switchSidebarOpen()
        }}
      >
        <img
          src={menuIcon.src}
          alt="Menu button"
        />
      </button>
      <Link href="/" className="mx-5 md:mx-40">
        {/*eslint-disable-next-line*/}
        <img
          src={logo.src}
          alt="Company Logo"
        />
      </Link>
      <Link className={`${pageButtonsStyle} ${pathname === '/accounts' ? `bg-primary` : 'hover:bg-gray-100'}`} href='/accounts'>Accounts</Link>
      <Link className={`${pageButtonsStyle} ${pathname === '/transactions' ? `bg-primary` : 'hover:bg-gray-100'}`} href='/transactions'>Transactions</Link>
      <Link className={`${pageButtonsStyle} ${pathname === '/resources' ? `bg-primary` : 'hover:bg-gray-100'}`} href='/resources'>Resources</Link>
      <Link
        className="text-base flex text-black absolute right-10"
        href="/login"
      >
        Hi user!
      </Link>
    </nav>
  )
}
