import { ReactNode, createContext, useContext, useState, useEffect } from 'react'

// import { trpc } from '../utils'

//delete
const MOCK_ORGANIZATIONS = {
	organizations: [
		{
			_id: "6509eb920753352a81f55a98",
			name: "Bend",
			address: {
				street: "Riverside Drive",
				number: "1640",
				city: "Hill Valley",
				state: "CA",
				zipCode: "91103"
			}
		},
		{
			_id: "6509eb920753352a81f55a54",
			name: "All Mega Corp Properties",
			address: {
				street: "Riverside Drive",
				number: "1640",
				city: "Hill Valley",
				state: "CA",
				zipCode: "91103"
			}
		}
	]
}

// delete
interface Organization {
  _id: string,
  name: string,
}

interface SearchContext {
   searchText: string,
   organization: string
   organizations: Organization[]
	 changeSearchText: (value: string) => void
   changeOrganization: (value: string) => void
}

export const SearchContext = createContext<SearchContext>({
  searchText: '',
  organization: '',
  organizations: [],
	changeSearchText: (value: string) => {},
  changeOrganization: (value: string) => {},
})

export const useSearchContext = () => {
   return useContext(SearchContext);
}

export default function SearchProvider({ children }: { children: ReactNode }) {
	const [searchText, setSearchText] = useState<string>('')
	const [organization, setOrganization] = useState<string>('')
	const [organizations, setOrganizations] = useState<Organization[]>([])

	useEffect(() => {
		const getOrganizations = async () => {
			//const res: any = await trpc.organizations.find.query({})

			//if (res?.organizations?.length) setOrganizations(res.organizations)

			// delete
			setOrganizations(MOCK_ORGANIZATIONS.organizations)
		}

		getOrganizations()
	}, [])

	const changeOrganization = (value: string) => {
		setOrganization(value)
	}

	const changeSearchText = (value: string) => {
		setSearchText(value)
	}

	return (
		<SearchContext.Provider
			value={{
				searchText,
				organization,
				organizations,
				changeSearchText,
				changeOrganization,
			}}
		>
			{children}
		</SearchContext.Provider>
   )
}
