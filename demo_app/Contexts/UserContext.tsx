import {createContext, ReactNode, useState} from 'react'

interface Usuario{
    id: number,
    email: string,
    nome: string,
    cidade:string
}

interface usuarioContextType  {
    usuarioInfo: Usuario | undefined,
    setUsuario: (usuario: Usuario) => void
}

interface UsuarioContextProviderProps{
    children: ReactNode
}
export const usuarioContext = createContext({} as usuarioContextType)

export function UsuarioContextProvider({children}: UsuarioContextProviderProps){
    const [usuarioInfo, setUsuarioInfo] = useState<Usuario>()
    async function setUsuario(usuarioInfoParams:any){
        setUsuarioInfo(usuarioInfoParams)
    }

    return(
        <usuarioContext.Provider
        value={{
            usuarioInfo,
            setUsuario
        }}>
            {children}
        </usuarioContext.Provider>
    )
}
