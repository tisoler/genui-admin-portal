import React, { useRef } from 'react'
import searchIcon from '../../../public/search.svg'
import Image from 'next/image'
import { useSearchContext } from '@/contexts/searchContext'

export default function Searchbar() {
  const inputRef = useRef<HTMLInputElement>(null)

  const { organization, organizations, searchText, changeSearchText, changeOrganization } = useSearchContext()

  const inputFocus = () => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }

  const handleSearch = (value: string) => {
    changeSearchText(value)
  }

  return (
    <div className='w-full h-[45px] flex justify-start'>
      <select
        className='bg-gray-50 border border-gray-200 rounded-md w-[150px] md:w-[350px] mr-2 p-3 outline-none'
        value={organization}
        onChange={(evt) => changeOrganization(evt.target.value)}
      >
        <option value={''}>Choose an organization</option>
        {organizations?.map(org => (
          <option key={org._id} value={org._id}>{org.name}</option>
        ))}
      </select>
      <div className='bg-gray-50 border-gray-200 border rounded-md flex pl-2 mx-2'>
        <Image alt='Search icon' src={searchIcon.src} width={18} height={18} onClick={inputFocus} />
        <input
          ref={inputRef}
          className={`bg-gray-50 pl-1.5 pr-3.5 py-3 outline-none rounded-md`}
          value={searchText}
          onChange={(evt) => handleSearch(evt?.target?.value)}
          placeholder='Search'
        />
      </div>
    </div>
  )
}
