import React, { useRef, useState } from 'react'
import searchIcon from '../../../public/search.svg'

export default function Searchbar({ searchCallBack } = { searchCallBack: (searchText: string) => {} }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchText, setSearchText] = useState('')

  const inputFocus = () => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
    searchCallBack(value)
  }

  return (
    <div className='w-full flex justify-end'>
      <div className='h-[45px] bg-gray-50 border-gray-200 border rounded-md flex pl-2'>
        <img src={searchIcon.src} width={18} height={18} onClick={inputFocus} />
        <input
          ref={inputRef}
          className={`pl-1.5 pr-3.5 py-3 outline-none`}
          value={searchText}
          onChange={(evt) => handleSearch(evt?.target?.value)}
        />
      </div>
    </div>
  )
}
