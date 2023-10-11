import { ReactNode, createContext, useContext, useState } from 'react';

interface SibebarOption {
	text: string,
	callbackFunc?: () => void,
	href?: string,
}

interface SidebarContext {
   sidebarOpen: boolean
   options: SibebarOption[]
   switchSidebarOpen: () => void
   setSidebarOptions: (options: SibebarOption[]) => void,
   changeSidebarStatus: (options: boolean) => void,
}

export const SidebarContext = createContext<SidebarContext>({
   sidebarOpen: false,
   options: [],
   switchSidebarOpen: () => {},
   setSidebarOptions: (options: SibebarOption[]) => {},
   changeSidebarStatus: (options: boolean) => {},
})

export const useSidebarContext = () => {
   return useContext(SidebarContext);
}

export default function SidebarProvider({ children }: { children: ReactNode }) {
   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
   const [options, setOptions] = useState<SibebarOption[]>([])

   const switchSidebarOpen = () => {
      setSidebarOpen(prevState => !prevState)
   }

   const changeSidebarStatus = (value: boolean) => {
      setSidebarOpen(value)
   }

   const setSidebarOptions = (newOptions: SibebarOption[]) => {
      setOptions(newOptions)
   }

   return (
      <SidebarContext.Provider
         value={{
            sidebarOpen,
            options,
            switchSidebarOpen,
            setSidebarOptions,
            changeSidebarStatus,
         }}
      >
         {children}
      </SidebarContext.Provider>
   )
}
