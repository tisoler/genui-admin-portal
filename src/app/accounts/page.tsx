'use client'
import { useEffect, useState } from "react"
import CsvDownloader from 'react-csv-downloader'

import Searchbar from "../../components/searchbar"
import { useSearchContext } from "../../contexts/searchContext"

const  STATUS = {
  ON_TRACK: { text: 'On track', textColor: 'text-gray-900', bgcolor: 'even:bg-white bg-gray-100' },
  OFF_TRACK: { text: 'Off track', textColor: 'text-red-700', bgcolor: 'bg-red-100' },
}

const MOCK_ACCOUNTS: any = [{
  id: 1,
  payerName: 'Sarah Allbee',
  propertyUnitNumber: '123',
  targetAmount: 2000,
  payment: 66,
  frequency: 'Daily',
  balance: 1150,
  shortfall: 0,
  property: {
    _id: "6526cb43505e24ecbce46ea5",
    name: "Lyon Estates",
    organizationId: "6509eb920753352a81f55a54",
    address: {
      street: "142nd Ave",
      number: "3345",
      city: "Hill Valley",
      state: "CA",
      zipCode: 91103
    }
  }
}, {
  id: 2,
  payerName: 'Bob Balaban',
  propertyUnitNumber: '234',
  targetAmount: 1200,
  payment: 60,
  frequency: 'Weekly',
  balance: 120,
  shortfall: 0,
  property: {
    _id: "6526cb43505e24ecbce46ea5",
    name: "Tudor Terrace",
    organizationId: "6509eb920753352a81f55a98",
    address: {
      street: "SW Murray",
      number: "122",
      city: "Hill Valley",
      state: "CA",
      zipCode: 91103
    }
  }
}, {
  id: 3,
  payerName: 'Jessica Dowd',
  propertyUnitNumber: '178',
  targetAmount: 3500,
  payment: 550,
  frequency: 'Weekly',
  balance: 0,
  shortfall: 10,
  property: {
    _id: "6526cb43505e24ecbce46ea5",
    name: "Broadway Gardens",
    organizationId: "6509eb920753352a81f55a54",
    address: {
      street: "NW 156th Dr.",
      number: "5667",
      city: "Hill Valley",
      state: "CA",
      zipCode: 91103
    }
  }
}, {
  id: 4,
  payerName: 'Bob Balaban',
  propertyUnitNumber: '234',
  targetAmount: 1200,
  payment: 60,
  frequency: 'Weekly',
  balance: 320,
  shortfall: 0,
  property: {
    _id: "6526cb43505e24ecbce46ea5",
    name: "Menlo Acres",
    organizationId: "6509eb920753352a81f55a54",
    address: {
      street: "SW Murray",
      number: "122",
      city: "Hill Valley",
      state: "CA",
      zipCode: 91103
    }
  }
}, {
  id: 5,
  payerName: 'Sarah Allbee',
  propertyUnitNumber: '123',
  targetAmount: 2000,
  payment: 66,
  frequency: 'Daily',
  balance: 850,
  shortfall: 0,
  property: {
    _id: "6526cb43505e24ecbce46ea5",
    name: "Malibu Apartments",
    organizationId: "6509eb920753352a81f55a54",
    address: {
      street: "142nd Ave",
      number: "3345",
      city: "Hill Valley",
      state: "CA",
      zipCode: 91103
    }
  }
}]

const containerStyle = 'flex flex-col items-start overflow-x-auto shadow-md overflow-y-hidden mt-[65px] pt-4 px-5 w-100 h-100'
const cellStyle = 'inline-block pl-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
const theadStyle = 'inline-block pl-1'

export default function AccountsScreen() {
  const [accounts, setAccounts] = useState<any[]>(MOCK_ACCOUNTS)
  const [filteredAccounts, setFilteredAccounts] = useState<any[]>(MOCK_ACCOUNTS)

  const { searchText, organization } = useSearchContext()

  const filterAccounts = () => {
    const filtered = accounts?.filter((account: any) => (
      (account.payerName?.toLowerCase().includes(searchText.toLowerCase())
      || account.property?.name?.toLowerCase().includes(searchText.toLowerCase()))
      && (!organization || account.property?.organizationId === organization)
    ))
    setFilteredAccounts(filtered)
  }

  useEffect(() => {
    filterAccounts()
  }, [searchText, organization])

  return (
    <div className={`${containerStyle}`}>
      <div className="flex w-full mb-3">
        <Searchbar />
        <CsvDownloader
          className="bg-green-400 hover:bg-green-600 active:bg-green-400 rounded-md w-40 ml-2 h-[45px] text-white font-medium"
          filename="accounts"
          extension=".csv"
          separator=";"
          datas={filteredAccounts?.map(acc => ({ ...acc, propertyName: acc.property?.name, }))}
          text="Export to csv"
          columns={[
            { id: 'propertyName', displayName: 'Property' },
            { id: 'payerName', displayName: 'Tenant Name' },
            { id: 'propertyUnitNumber', displayName: 'Unit' },
          ]}
        />  
      </div>
      <table className="w-full text-md text-left text-gray-900 table-fixed hidden lg:block">
        <thead className="block table-fixed xl:text-sm text-xs text-gray-700 font-bold border-b border-b-black">
          <tr className="block h-[41px] flex items-center">
            <th scope="col" className={`${theadStyle} w-3/12`}>
              Property
            </th>
            <th scope="col" className={`${theadStyle} w-2/12`}>
              Tenant Name
            </th>
            <th scope="col" className={`${theadStyle} w-1/12`}>
              Unit
            </th>
            <th scope="col" className={`${theadStyle} w-1/12`}>
              Target
            </th>
            <th scope="col" className={`${theadStyle} w-1/12`}>
              Frequency
            </th>
            <th scope="col" className={`${theadStyle} w-1/12`}>
              Balance
            </th>
            <th scope="col" className={`${theadStyle} w-1/12`}>
              Status
            </th>
            <th scope="col" className={`${theadStyle} w-2/12`}>
              Property Tags
            </th>
          </tr>
        </thead>
        <tbody className="block table-fixed overflow-y-auto mt-3">
          {
            filteredAccounts?.map((account: any) => {
              const status = (account.shortfall || 0) > 0 ? STATUS.OFF_TRACK : STATUS.ON_TRACK

              return (
                <tr
                  key={account.id}
                  className={`block ${status.bgcolor} cursor-pointer xl:text-sm text-xs border-y border-gray-200`}
                >
                  <td scope="row" className={`${cellStyle} w-3/12 pl-2`}>
                    {account.property?.name}
                  </td>
                  <td scope="row" className={`${cellStyle} w-2/12`}>
                    {account.payerName}
                  </td>
                  <td scope="row" className={`${cellStyle} w-1/12`}>
                    {account.propertyUnitNumber}
                  </td>
                  <td scope="row" className={`${cellStyle} w-1/12`}>
                    ${account.targetAmount}
                  </td>
                  <td scope="row" className={`${cellStyle} w-1/12`}>
                    {account.frequency}
                  </td>
                  <td scope="row" className={`${cellStyle} w-1/12`}>
                    ${account?.balance}
                  </td>
                  <td scope="row" className={`${cellStyle} ${status.textColor} w-1/12 pr-2`}>
                    {status.text}
                  </td>
                  <td scope="row" className={`${cellStyle} w-2/12`}>
                    {account?.propertyTags}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <div className="text-sm w-full lg:hidden py-1 px-4">
        {
          filteredAccounts?.map((account: any) => {
            const status = (account.shortfall || 0) > 0 ? STATUS.OFF_TRACK : STATUS.ON_TRACK

            return (
              <div key={account.id} className={`${status.bgcolor} border-b border-b-gray-400 py-2`}>
                <div className="flex my-1">
                  <span>Property:</span>
                  <span className="ml-2">{account.property?.name}</span>
                </div>
                <div className="flex my-1">
                  <span>Tenant Name:</span>
                  <span className="ml-2">{account.payerName}</span>
                </div>
                <div className="flex my-1">
                  <span>Unit:</span>
                  <span className="ml-2">{account.propertyUnitNumber}</span>
                </div>
                <div className="flex my-1">
                  <span>Target:</span>
                  <span className="ml-2">${account.targetAmount}</span>
                </div>
                <div className="flex my-1">
                  <span>Frequency:</span>
                  <span className="ml-2">{account.frequency}</span>
                </div>
                <div className="flex my-1">
                  <span>Balance:</span>
                  <span className="ml-2">${account.balance}</span>
                </div>
                <div className="flex my-1 items-center max-w-[250px]">
                  <span className="mr-2">Status:</span>
                  <span className={`${status.textColor} ml-2`}>{status.text}</span>
                </div>
              </div>
            )
          })
        }
      </div>

      {!filteredAccounts?.length && <div className="w-full my-4 flex justify-center"><span>No accounts found</span></div>}
    </div>
  )
}