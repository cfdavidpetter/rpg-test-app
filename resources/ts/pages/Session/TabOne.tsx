import Swal from 'sweetalert2'
import { IPlayer } from '@/core/models/player.mode';
import { SessionService } from '@/core/services/session.service';
import LoadCircle from '@/shared/ui/loadCircle';
import Table from '@/shared/ui/table';
import React, { useEffect, useRef, useState } from 'react';
import withReactContent from 'sweetalert2-react-content';

const sessionService = new SessionService();

interface TabOneProps {
  currentTab: number;
  handleBack: () => void;
  handleNext: () => void;
}

type Player = Omit<IPlayer, 'confirmed'> & {
  confirmed: JSX.Element,
};

const TabOne: React.FC<TabOneProps> = ({currentTab, handleBack, handleNext }) => {
  const pgIni = {from: 0, to: 0, total: 0, nextPage: null};

  const headers = ['Confirmado', 'Nome', 'Classe', 'XP'];

  const alertSwal = withReactContent(Swal);
  const [loading, setLoading] = useState<boolean>(true);

  const [confirmedIds, setConfirmedIds] = useState<number[]>([]);
  const confirmedIdsRef = useRef(confirmedIds);

  const [playerList, setPlayerList] = useState<Player[]>([]);
  const playerListRef = useRef(playerList);

  const [page, setPage] = useState('1');
  const [pagination, setPagination] = useState<any>(pgIni);

  const getNewList = (pg: string, oldList: Player[] = []) => {
    setLoading(true);
    sessionService.getPlayersToAddToSession(pg)
      .then((r) => {
        setPlayerList([
          ...oldList,
          ...r.players.data.map(d => ({
            id: d.id, 
            confirmed: (
              <input 
                type="checkbox" 
                checked={d.confirmed}
                onChange={() => handleCheckboxChange(d.id || 0)}
              />
            ),
            name: d.name,
            class: d.class,
            xp: d.xp 
          }))
        ]);
        setPagination({from: r.players.from, to: r.players.to, total: r.players.total, nextPage: r.players.next_page_url});

        if (confirmedIds.length === 0) {
          setConfirmedIds(r.confirmedIds);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getNewList(page, playerList);
  }, []);

  useEffect(() => {
    playerListRef.current = playerList;
    confirmedIdsRef.current = confirmedIds;
  }, [playerList, confirmedIds]);

  const handleCheckboxChange = (id: number) => {
    if (confirmedIdsRef.current.includes(id)) {
      setConfirmedIds(confirmedIdsRef.current.filter(confirmedId => confirmedId !== id));
    } else {
      setConfirmedIds([...confirmedIdsRef.current, id]);
    }    

    const list = playerListRef.current.map(p =>
      p.id === id
        ? { ...p, confirmed: <input 
          type="checkbox" 
          checked={!p.confirmed.props.checked}
          onChange={() => handleCheckboxChange(p.id || 0)}
        /> }
        : p
    );    
    setPlayerList(list);
  };

  const clearPlayers = () => {
    alertSwal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionService.setAllPlayersAsUnconfirmed().then(() => {
          alertSwal.fire({
            icon: "success",
            title: 'Sucesso!',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            const list = playerListRef.current.map(p => ({
              ...p, confirmed: <input 
                type="checkbox" 
                checked={false}
                onChange={() => handleCheckboxChange(p.id || 0)}
              /> 
            }));    
            setPlayerList(list);
            setConfirmedIds([]);
          });
        })
      }
    });
  }

  const handleNextTab = () => {
    sessionService.setPlayersAsConfirmed({ ids: confirmedIds }).then(() => {
      handleNext();
    });
  }
  
  return (
    <>
      <div className="p-4 md:p-5 space-y-4">
        <div className="flex justify-between">
          <button
            className={`px-4 py-2 ${currentTab === 1 ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded`}
            onClick={handleBack}
            disabled={currentTab === 1}
          >
            Voltar
          </button>
          <div className="text-xl font-bold">{currentTab} / 2</div>
          <button
            className={`px-4 py-2 ${currentTab === 2 ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded`}
            onClick={handleNextTab}
            disabled={confirmedIds.length === 0}
          >
            Avançar
          </button>
        </div>

        <div className="flex justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Adicionar jogadores na sessão | Total de jogadores confirmados: {confirmedIds.length}
          </h3>
          <button onClick={clearPlayers} type="button" data-modal-hide="default-modal" className="flex text-white bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            <span>Remover confirmados</span>
          </button>
        </div>

        <hr />        
        
        <Table headers={headers} data={playerList} />

        { loading && <div className="flex justify-center"><LoadCircle /></div> }

        { pagination.nextPage &&
          <div className="flex justify-center">
            <button onClick={() => { 
              const pg = (Number(page) + 1).toString()
              setPage(pg)
              getNewList(pg, playerList);
              }}  type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              +
            </button>
          </div>
        }
      </div>
    </>
  );
};

export default TabOne;