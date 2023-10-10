'use client'
import Searchbar from "../../components/searchbar"
import { useSidebarContext } from "../../contexts/sidebarContext"
import { useEffect, useState } from "react"

enum STATUS {
  OUTSTANDING = 'outstanding',
  COMPLETED = 'completed',
}

const MOCK_PAYMENTS_FROM_BEND: any = [{
  id: 1,
  date: '2023-02-23',
  amount: 2000,
  payerName: 'Sarah Allbee',
  propertyAddress: '3345 142nd Ave',
  propertyUnitNumber: '123',
  status: 'outstanding'
}, {
  id: 2,
  date: '2023-05-21',
  amount: 1200,
  payerName: 'Bob Balaban',
  propertyAddress: '122 SW Murray',
  propertyUnitNumber: '234',
  status: 'completed'
}, {
  id: 3,
  date: '2023-06-01',
  amount: 3500,
  payerName: 'Jessica Dowd',
  propertyAddress: '5667 NW 156th Dr.',
  propertyUnitNumber: '178',
  status: 'completed'
}, {
  id: 4,
  date: '2023-06-17',
  amount: 1200,
  payerName: 'Bob Balaban',
  propertyAddress: '122 SW Murray',
  propertyUnitNumber: '234',
  status: 'outstanding'
}, {
  id: 5,
  date: '2023-07-27',
  amount: 2000,
  payerName: 'Sarah Allbee',
  propertyAddress: '3345 142nd Ave',
  propertyUnitNumber: '123',
  status: 'outstanding'
}]


const MOCK_PAYMENTS_TO_BEND: any = [{
  id: 1,
  date: '2023-02-23',
  amount: 2000,
  payerName: 'Erin Garrity',
  propertyAddress: '3345 142nd Ave',
  propertyUnitNumber: '987',
  status: 'completed'
}, {
  id: 2,
  date: '2023-05-21',
  amount: 1200,
  payerName: 'Floyd Hauser',
  propertyAddress: '876 SW Murray',
  propertyUnitNumber: '765',
  status: 'outstanding'
}, {
  id: 3,
  date: '2023-06-01',
  amount: 3500,
  payerName: 'Jessica Dowd',
  propertyAddress: '3432 NW 156th Dr.',
  propertyUnitNumber: '346',
  status: 'outstanding'
}, {
  id: 4,
  date: '2023-06-17',
  amount: 1200,
  payerName: 'Mike Ekhardt',
  propertyAddress: '111 SW Murray',
  propertyUnitNumber: '222',
  status: 'completed'
}, {
  id: 5,
  date: '2023-07-27',
  amount: 2000,
  payerName: 'Bryce Calhoun',
  propertyAddress: '3233 142nd Ave',
  propertyUnitNumber: '555',
  status: 'completed'
}]

const containerStyle = 'flex flex-col items-start overflow-x-auto shadow-md overflow-y-hidden mt-[65px] pt-4 pr-3 w-100 h-100 transition-[margin-left] ease-in-out duration-500'
const cellStyle = 'inline-block pl-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
const theadStyle = 'inline-block pl-1'

const StatusCell = ({ status } : { status: string }) => (
  <div className={`${status === STATUS.COMPLETED ? 'bg-info' : 'bg-warning'} flex w-full justify-center rounded py-1 text-[9px] xl:text-xs text-white font-extrabold`}>
    {status === STATUS.COMPLETED ? STATUS.COMPLETED.toUpperCase() : STATUS.OUTSTANDING.toUpperCase()}
  </div>
)

export default function TransactionsScreen() {
  const [payments, setPayments] = useState<any[]>(MOCK_PAYMENTS_FROM_BEND)
  const [filteredPayments, setFilteredPayments] = useState<any[]>(MOCK_PAYMENTS_FROM_BEND)

  const { sidebarOpen, setSidebarOptions } = useSidebarContext()

  useEffect(() => {
    setSidebarOptions([
      { text: 'From Bend', callbackFunc: () => {
        setPayments(MOCK_PAYMENTS_FROM_BEND)
        setFilteredPayments(MOCK_PAYMENTS_FROM_BEND) 
      }},
      { text: 'To Bend', callbackFunc: () => {
        setPayments(MOCK_PAYMENTS_TO_BEND)
        setFilteredPayments(MOCK_PAYMENTS_TO_BEND) 
      }}
    ])
  }, [])

  const filterPayments = (searchText: string) => {
    const filtered = payments?.filter((payment: any) => (
      payment.payerName?.toLowerCase().includes(searchText.toLowerCase()) || payment.propertyAddress?.toLowerCase().includes(searchText.toLowerCase())
    ))
    setFilteredPayments(filtered)
  }

  // Append class based on state of sidebar visiblity
  const appendClass = !sidebarOpen ? " ml-0 md:ml-[290px]" : " ml-[290px]"

  return (
    <div className={`${containerStyle} ${appendClass}`}>
      <Searchbar searchCallBack={filterPayments} />
      <table className="w-full text-md text-left text-gray-900 table-fixed hidden lg:block">
        <thead className="block table-fixed xl:text-sm text-xs text-gray-700 font-bold border-b border-b-black">
          <tr className="block h-[41px] flex items-center">
            <th scope="col" className={`${theadStyle} w-2/12`}>
              Date
            </th>
            <th scope="col" className={`${theadStyle} w-1/12`}>
              Amount
            </th>
            <th scope="col" className={`${theadStyle} w-3/12`}>
              Name
            </th>
            <th scope="col" className={`${theadStyle} w-3/12`}>
              Property
            </th>
            <th scope="col" className={`${theadStyle} w-1/12`}>
              Unit
            </th>
            <th scope="col" className={`${theadStyle} w-2/12`}>
              Status
            </th>
          </tr>
        </thead>
        <tbody className="block table-fixed overflow-y-auto">
          {
            filteredPayments?.map((payment: any) => (
              <tr
                key={payment.id}
                className={`block bg-white even:bg-gray-100 border-b cursor-pointer xl:text-sm text-xs`}
              >
                <td scope="row" className={`${cellStyle} w-2/12`}>
                  {payment.date}
                </td>
                <td scope="row" className={`${cellStyle} w-1/12`}>
                  ${payment.amount}
                </td>
                <td scope="row" className={`${cellStyle} w-3/12`}>
                  {payment.payerName}
                </td>
                <td scope="row" className={`${cellStyle} w-3/12`}>
                  {payment.propertyAddress}
                </td>
                <td scope="row" className={`${cellStyle} w-1/12`}>
                  {payment.propertyUnitNumber}
                </td>
                <td scope="row" className={`${cellStyle} w-2/12 pr-2`}>
                  <StatusCell status={payment.status} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className="text-xs w-full lg:hidden py-1 px-4">
        {
          filteredPayments?.map((account: any) => (
            <div key={account.id} className="border-b border-b-gray-400 py-2">
              <div className="flex my-1">
                <span>Date:</span>
                <span className="ml-2">{account.date}</span>
              </div>
              <div className="flex my-1">
                <span>Amount:</span>
                <span className="ml-2">{account.amount}</span>
              </div>
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