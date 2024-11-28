import { useState } from "react";
import { HashLink } from 'react-router-hash-link';

export default function Header() {
    const [miniMenu, setMiniMenu] = useState(false);
    
    const openMiniMenu = () => {
        setMiniMenu(!miniMenu);
    }

    return (
        <header className="sticky inset-x-0 w-full top-0 bg-white/80 dark:bg-slate-900/90  z-50 border-b border-gray-200/20 dark:border-gray-700/40 backdrop-blur">
            <nav className="flex items-center w-full h-[54px] md:container justify-between px-6 md:px-8" aria-label="Global">
                <div className="flex space-x-8">
                    <a className="font-bold text-xl" href="/">
                        <div className="relative flex space-x-2 w-10 h-10 md:w-fit items-center justify-center text-black dark:text-white dark:-ml-4 -ml-2">
                            <span className="font-bold lg:inline-block">RPG</span>
                        </div>
                    </a>
                </div>
                <ul className="hidden lg:flex gap-8 font-medium items-center">
                    <li className="text-gray-500 dark:text-gray-300 font-regular text-sm hover:text-gray-800 dark:hover:text-gray-500">
                        <HashLink to="/">Sessão</HashLink>
                    </li>
                    <li className="text-gray-500 dark:text-gray-300 font-regular text-sm hover:text-gray-800 dark:hover:text-gray-500">
                        <HashLink to="/players">Jogadores</HashLink>
                    </li>
                    <li className="text-gray-500 dark:text-gray-300 font-regular text-sm hover:text-gray-800 dark:hover:text-gray-500">
                        <HashLink to="/guilds">Guildas</HashLink>
                    </li>
                </ul>
            </nav>
            {miniMenu && 
                <ul className="w-full shadow-2xl py-2 flex flex-col items-start font-medium pb-2" onClick={openMiniMenu}>
                    <li className="px-4 py-2 rounded-lg text-gray-900 dark:text-gray-300"><HashLink to="/">Sessão</HashLink></li>
                    <li className="px-4 py-2 rounded-lg text-gray-900 dark:text-gray-300"><HashLink to="/players">Jogadores</HashLink></li>
                    <li className="px-4 py-2 rounded-lg text-gray-900 dark:text-gray-300"><HashLink to="/guilds">Guildas</HashLink></li>
                </ul>
            }            
        </header>
    );
}