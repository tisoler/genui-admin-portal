'use client'
import Searchbar from "../../components/searchbar"
import { useSidebarContext } from "../../contexts/sidebarContext"
import { useEffect, useState } from "react"

enum STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

const MOCK_ACCOUNTS: any = [{
  id: 1,
  payerName: 'Sarah Allbee',
  propertyAddress: '3345 142nd Ave',
  propertyUnitNumber: '123',
  targetAmount: 2000,
  payment: 66,
  frequency: 'Daily',
  progress: 1150,
  status: 'active'
}, {
  id: 2,
  payerName: 'Bob Balaban',
  propertyAddress: '122 SW Murray',
  propertyUnitNumber: '234',
  targetAmount: 1200,
  payment: 60,
  frequency: 'Weekly',
  progress: 120,
  status: 'active'
}, {
  id: 3,
  payerName: 'Jessica Dowd',
  propertyAddress: '5667 NW 156th Dr.',
  propertyUnitNumber: '178',
  targetAmount: 3500,
  payment: 550,
  frequency: 'Weekly',
  progress: 0,
  status: 'inactive'
}, {
  id: 4,
  payerName: 'Bob Balaban',
  propertyAddress: '122 SW Murray',
  propertyUnitNumber: '234',
  targetAmount: 1200,
  payment: 60,
  frequency: 'Weekly',
  progress: 320,
  status: 'active'
}, {
  id: 5,
  payerName: 'Sarah Allbee',
  propertyAddress: '3345 142nd Ave',
  propertyUnitNumber: '123',
  targetAmount: 2000,
  payment: 66,
  frequency: 'Daily',
  progress: 850,
  status: 'active'
}]

const containerStyle = 'flex flex-col items-start overflow-x-auto shadow-md overflow-y-hidden mt-[65px] pt-4 pr-3 w-100 h-100 transition-[margin-left] ease-in-out duration-500'
const cellStyle = 'inline-block pl-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
const theadStyle = 'inline-block pl-1'

const StatusCell = ({ status } : { status: string }) => (
  <div className={`${status === STATUS.ACTIVE ? 'bg-green-400' : 'bg-red-400'} flex w-full justify-center rounded py-1 text-[9px] xl:text-xs text-white font-extrabold`}>
    {status === STATUS.ACTIVE ? STATUS.ACTIVE.toUpperCase() : STATUS.INACTIVE.toUpperCase()}
  </div>
)

const ProgressCell = ({ progress, targetAmount, height = 3 }: { progress: number, targetAmount: number, height?: number }) => (
  <div className="relative w-full bg-gray-200 rounded-sm" style={{ height: `${height}px` }}>
    <div className={`absolute bg-black rounded-sm`} style={{ width: `${Math.round((progress / targetAmount) * 10000) / 100}%`, height: `${height}px` }}/>
  </div>
)

export default function AccountsScreen() {
  const [accounts, setAccounts] = useState<any[]>(MOCK_ACCOUNTS)
  const [filteredAccounts, setFilteredAccounts] = useState<any[]>(MOCK_ACCOUNTS)

  const { sidebarOpen, setSidebarOptions } = useSidebarContext()

  useEffect(() => {
    // Clean sidebar options
    setSidebarOptions([])
  }, [])

  const filterAccounts = (searchText: string) => {
    const filtered = accounts?.filter((account: any) => (
      account.payerName?.toLowerCase().includes(searchText.toLowerCase()) || account.propertyAddress?.toLowerCase().includes(searchText.toLowerCase())
    ))
    setFilteredAccounts(filtered)
  }

  // Append class based on state of sidebar visiblity
  const appendClass = !sidebarOpen ? " ml-0 md:ml-[290px]" : " ml-[290px]"

  return (
    <div className={`${containerStyle} ${appendClass}`}>
      <Searchbar searchCallBack={filterAccounts} />
      <table className="w-full text-md text-left text-gray-900 table-fixed hidden lg:block">
        <thead className="block table-fixed xl:text-sm text-xs text-gray-700 font-bold border-b border-b-black">
          <tr className="block h-[41px] flex items-center">
            <th scope="col" className={`${theadStyle} w-3/12`}>
              Name
            </th>
            <th scope="col" className={`${theadStyle} w-3/12`}>
              Property
            </th>
            <th scope="col" className={`${theadStyle} w-1/12`}>
              Unit
            </th>
            <th scope="col" className={`${theadStyle} w-1/12`}>
              Target
            </th>
            <th scope="col" className={`${theadStyle} w-1/12`}>
              Payment
            </th>
            <th scope="col" className={`${theadStyle} w-1/12`}>
              Frequency
            </th>
            <th scope="col" className={`${theadStyle} w-1/12`}>
              Progress
            </th>
            <th scope="col" className={`${theadStyle} w-1/12`}>
              Status
            </th>
          </tr>
        </thead>
        <tbody className="block table-fixed overflow-y-auto">
          {
            filteredAccounts?.map((account: any) => (
              <tr
                key={account.id}
                className={`block ${account.status === STATUS.INACTIVE ? 'bg-red-100' : 'bg-white even:bg-gray-100'} border-b cursor-pointer xl:text-sm text-xs`}
              >
                <td scope="row" className={`${cellStyle} w-3/12`}>
                  {account.payerName}
                </td>
                <td scope="row" className={`${cellStyle} w-3/12`}>
                  {account.propertyAddress}
                </td>
                <td scope="row" className={`${cellStyle} w-1/12`}>
                  {account.propertyUnitNumber}
                </td>
                <td scope="row" className={`${cellStyle} w-1/12`}>
                  ${account.targetAmount}
                </td>
                <td scope="row" className={`${cellStyle} w-1/12`}>
                  ${account.payment}
                </td>
                <td scope="row" className={`${cellStyle} w-1/12`}>
                  {account.frequency}
                </td>
                <td scope="row" className={`${cellStyle} w-1/12 px-2`}>
                  <ProgressCell progress={account?.progress ?? 0} targetAmount={account?.targetAmount ?? 0} />
                </td>
                <td scope="row" className={`${cellStyle} w-1/12 pr-2`}>
                  <StatusCell status={account.status} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className="text-xs w-full lg:hidden py-1 px-4">
        {
          filteredAccounts?.map((account: any) => (
            <div key={account.id} className="border-b border-b-gray-400 py-2">
              <div className="flex my-1">
                <span>Name:</span>
                <span className="ml-2">{account.payerName}</span>
              </div>
              <div className="flex my-1">
                <span>Property:</span>
                <span className="ml-2">{account.propertyAddress}</span>
              </div>
              <div className="flex my-1">
                <span>Unit:</span>
                <span className="ml-2">{account.propertyUnitNumber}</span>
              </div>
              <div className="flex my-1">
                <span>Target:</span>
                <span className="ml-2">{account.targetAmount}</span>
              </div>
              <div className="flex my-1">
                <span>Payment:</span>
                <span className="ml-2">{account.payment}</span>
              </div>
              <div className="flex my-1">
                <span>Frequency:</span>
                <span className="ml-2">{account.frequency}</span>
              </div>
              <div className="flex my-1 items-center max-w-[250px]">
                <span className="mr-2">Progress:</span>
                <ProgressCell progress={account?.progress ?? 0} targetAmount={account?.targetAmount ?? 0} height={5} />
              </div>
              <div className="flex my-1 items-center max-w-[250px]">
                <span className="mr-2">Status:</span>
                <StatusCell status={account.status} />
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}