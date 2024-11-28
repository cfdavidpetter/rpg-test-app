import { SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";

import PaginationLinks from "@/shared/ui/paginationLinks";
import LoadCircle from "@/shared/ui/loadCircle";
import Table from "@/shared/ui/table";

import { PlayerService } from "@/core/services/player.service";
import { IPlayer } from "@/core/models/player.mode";
import ModalPlayer from "./ModalPlayer";

const playerService = new PlayerService();

type Player = Omit<IPlayer, 'confirmed'> & {
  confirmed: string;
};

export default function ListPlayers() {
  const alertSwal = withReactContent(Swal)
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [playerForm, setPlayerForm] = useState<IPlayer | null>(null);
  const [playerData, setPlayerData] = useState<IPlayer[]>([]);
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [searchParams] = useSearchParams();
  const [pagination, setPagination] = useState<any>({from: 0, to: 0, total: 0});
  const [links, setLinks] = useState<any[]>([]);
  
  const headers = ['Nome', 'Classe', 'XP', 'Confirmado', '#'];
  const [filter, setFilter] = useState(searchParams.get('filter'));
  const filterChange = (event: { target: { value: SetStateAction<string | null>; }; }) => {
    setFilter(event.target.value);
  };
  const [page, _setPage] = useState(searchParams.get('page'));

  useEffect(() => {
      console.log(filter, page);
      
      playerService.list()
        .then((r) => {
          setPlayerData(r.data);
          setPlayerList(r.data.map((d: IPlayer) => ({
            id: d.id,
            name: d.name,
            class: d.class,
            xp: d.xp,
            confirmed: d.confirmed ? 'sim' : 'não'
          })));
          setPagination({from: r.from, to: r.to, total: r.total})
          setLinks(r.links)
        })
        .finally(() => {
          setLoading(false);
        })
  }, []);

  useEffect(() => {
    if (openModal === false) setPlayerForm(null)
  }, [openModal]);

  const openModalFunc = (item: IPlayer) => {
    const u = playerData.find(d => d.id === item.id) as IPlayer;
    if (u) {
      setPlayerForm({
        ...u
      });
      setOpenModal(true);
    } else {
      alertSwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo deu errado!",
      });
    }
  };

  const deleteItem = (item: Player) => {
    alertSwal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        playerService.destroy(item.id as number)
          .then(() => {   
            alertSwal.fire({
              title: "Excluído!",
              text: "Registro foi excluído.",
              icon: "success"
            }).then(() => {
              window.location.replace("/players");
            });
          })
      }
    });
  };

  const renderActionBtn = (item: Player) => {
    return (
      <div className="space-x-1">
        <button 
          title="Editar operação."
          onClick={() => item.name && openModalFunc(item as unknown as IPlayer)}
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2"
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button 
          title="Deletar operação."
          onClick={() => item.name && deleteItem(item)}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2"
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M10 12V17" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 12V17" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 7H20" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    );
  };

  return (
      <div>
        <section>
          <div className="py-8 px-4 mx-auto md:container sm:pb-24 md:px-6 lg:px-6">
            <div className="mb-8 lg:mb-16 max-w-3xl mx-auto  w-full">
              <h2 className="mb-5 text-4xl leading-[44px] md:text-center  font-semibold text-gray-900 dark:text-white">
                Jogadores
              </h2>
            </div>
            <div className="flex justify-center">
              { loading ? <LoadCircle /> :
                <div className="relative h-full w-full rounded bg-white shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between m-3 space-y-2 md:space-y-0 md:space-x-2">
                    <form action="" method="get" className="w-full">
                      {/* <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                        </div>
                        <input type="text" name="filter" id="filter" value={filter || ''} onChange={filterChange} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Filtrar" required />
                        <div className="flex absolute end-2.5 bottom-2.5 space-x-2">
                          <button type="submit" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2">
                            Buscar
                          </button>
                          { filter && 
                            <a href="/players" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2">
                              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 20">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z" fill="#FFF"></path>
                              </svg>
                            </a>
                          }
                        </div>
                      </div> */}
                    </form>
                    <div className="flex flex-row space-x-1">
                      <button title="Criar nova operação." onClick={() => { setOpenModal(true) }} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                        <svg className="w-8 h-8"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none">
                          <path id="Vector" d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <Table headers={headers} data={playerList} renderAction={renderActionBtn} />

                  <PaginationLinks 
                    pagination={pagination}
                    links={links}
                  />
                </div>
              }
            </div>
          </div>
          { openModal && <ModalPlayer player={playerForm} setOpenModal={setOpenModal} /> }
        </section>
      </div>
  );
}