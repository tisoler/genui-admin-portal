'use client'
import { useEffect, useState } from "react"
import CsvDownloader from 'react-csv-downloader'

import { useSearchContext } from "../../contexts/searchContext"
import Searchbar from "../../components/searchbar"

enum STATUS {
  OUTSTANDING = 'outstanding',
  COMPLETED = 'completed',
}

const MOCK_PAYMENTS: any = [{
  id: 1,
  date: '2023-02-23',
  amount: 2000,
  payerName: 'Sarah Allbee',
  propertyUnitNumber: '123',
  status: 'outstanding',
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
  date: '2023-05-21',
  amount: 1200,
  payerName: 'Bob Balaban',
  propertyUnitNumber: '234',
  status: 'completed',
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
  date: '2023-06-01',
  amount: 3500,
  payerName: 'Jessica Dowd',
  propertyUnitNumber: '178',
  status: 'completed',
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
  date: '2023-06-17',
  amount: 1200,
  payerName: 'Bob Balaban',
  propertyUnitNumber: '234',
  status: 'outstanding',
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
  date: '2023-07-27',
  amount: 2000,
  payerName: 'Sarah Allbee',
  propertyUnitNumber: '123',
  status: 'outstanding',
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

const StatusCell = ({ status } : { status: string }) => (
  <div className={`${status === STATUS.COMPLETED ? 'bg-info' : 'bg-warning'} flex w-full justify-center rounded py-1 text-[9px] xl:text-xs text-white font-extrabold`}>
    {status === STATUS.COMPLETED ? STATUS.COMPLETED.toUpperCase() : STATUS.OUTSTANDING.toUpperCase()}
  </div>
)

export default function TransactionsScreen() {
  const [payments, setPayments] = useState<any[]>(MOCK_PAYMENTS)
  const [filteredPayments, setFilteredPayments] = useState<any[]>(MOCK_PAYMENTS)

  const { searchText, organization } = useSearchContext()

  const filterAccounts = () => {
    const filtered = payments?.filter((paym: any) => (
      (paym.payerName?.toLowerCase().includes(searchText.toLowerCase())
      || paym.property?.name?.toLowerCase().includes(searchText.toLowerCase()))
      && (!organization || paym.property?.organizationId === organization)
    ))
    setFilteredPayments(filtered)
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
          filename="transactions"
          extension=".csv"
          separator=";"
          datas={filteredPayments?.map(paym => ({ ...paym, propertyName: paym.property?.name, }))}
          text="Export to csv"
          columns={[
            { id: 'date', displayName: 'Date' },
            { id: 'amount', displayName: 'Amount' },
            { id: 'payerName', displayName: 'Tenant Name' },
            { id: 'propertyName', displayName: 'Property' },
            { id: 'propertyUnitNumber', displayName: 'Unit' },
          ]}
        />  
      </div>
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
        <tbody className="block table-fixed overflow-y-auto mt-3">
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
                  {payment.property?.name}
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

      <div className="text-sm w-full lg:hidden py-1 px-4">
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
                <span className="ml-2">{account.property?.name}</span>
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

      {!filteredPayments?.length && <div className="w-full my-4 flex justify-center"><span>No transactions found</span></div>}
    </div>
  )
}