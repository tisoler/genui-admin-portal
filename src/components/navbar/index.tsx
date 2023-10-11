import React from 'react'
import Link from 'next/link'
import { useSidebarContext } from '../../contexts/sidebarContext'
import menuIcon from '../../../public/menu-icon.svg'
import logo from '../../../public/bend-logo.svg'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const pageButtonsStyle = 'mx-1 md:mx-2 py-2 px-3 rounded-md text-sm font-medium'

export default function Navbar() {
  const { switchSidebarOpen } = useSidebarContext()
  const pathname = usePathname()

  /*
    <button
      className="md:hidden"
      onClick={() => {
        switchSidebarOpen()
      }}
    >
      <Image
        src={menuIcon.src}
        alt="Menu button"
        width={40}
        height={40}
      />
    </button>
  */

  return (
    <nav className="z-20 fixed top-0 left-0 right-0 h-[60px] bg-white flex px-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.15)] items-center justify-start">
      <Link href="/" className="ml-5 mr-5 md:mr-40">
        <Image
          src={logo.src}
          alt="Company Logo"
          width={100}
          height={45}
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
