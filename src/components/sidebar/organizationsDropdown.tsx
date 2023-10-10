import { useSidebarContext } from "@/contexts/sidebarContext";
import { useState } from "react";


interface Company {
   name: string;
   location: string;
   logo: React.ReactNode;
}

export const OrganizationsDropdown = ({ organizations }: { organizations: any[]} ) => {
	const [organization, setOrganization] = useState<any>(organizations?.length ? organizations[0] : null)
	const[showList, setShowList] = useState<boolean>(false)

	const { switchSidebarOpen } = useSidebarContext()

	const handleShowList = () => {
		if (organizations?.length > 1) setShowList(prevState => !prevState)
	}

	const handleSelectOrganization = (organization: any) => {
		setOrganization(organization)
		setShowList(false)
		switchSidebarOpen()
	}

	return (
		<>
			<div
				className="h-[62px] w-full text-xs bg-gray-100 border-gray-200 border rounded-md before:content-['ORGANIZATION'] flex flex-col justify-between items-between p-2 cursor-pointer"
				aria-label="Organizations dropdown list"
				onClick={handleShowList}
			>
				<div className="text-base text-center font-bold">{organization?.name}</div>
			</div>
			{showList && (
				organizations?.map(org => (
					<div
						key={org.id}
						className="w-full h-[40px] bg-gray-50 border border-t-gray-100 flex justify-center items-center cursor-pointer hover:bg-gray-200 active:bg-gray-50"
						onClick={() => handleSelectOrganization(org)}
					>
						{org.name}
					</div>
				))
			)}
		</>
		
	)
}
