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
   setSidebarOptions: (options: SibebarOption[]) => void
}

export const SidebarContext = createContext<SidebarContext>({
   sidebarOpen: false,
   options: [],
   switchSidebarOpen: () => {},
   setSidebarOptions: (options: SibebarOption[]) => {}
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

   const setSidebarOptions = (newOptions: SibebarOption[]) => {
      setOptions(newOptions)
   }

   return (
      <SidebarContext.Provider
         value={{
            sidebarOpen,
            options,
            switchSidebarOpen,
            setSidebarOptions
         }}
      >
         {children}
      </SidebarContext.Provider>
   )
}