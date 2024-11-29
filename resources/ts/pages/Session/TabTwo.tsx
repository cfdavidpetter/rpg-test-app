import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Swal from 'sweetalert2'
import { SessionService } from '@/core/services/session.service';
import withReactContent from 'sweetalert2-react-content';

const sessionService = new SessionService();

interface TabTwoProps {
  currentTab: number;
  handleBack: () => void;
  handleNext: () => void;
}

const TabTwo: React.FC<TabTwoProps> = ({currentTab, handleBack, handleNext }) => {
  const alertSwal = withReactContent(Swal);
  const [loading, setLoading] = useState<boolean>(true);

  const [guilds, setGuilds] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);


  const getNewList = () => {
    setLoading(true);
    sessionService.getGuilds()
      .then((r) => {
        setGuilds(r);

        let totalJ = 0
        r.forEach((g: any) => {
          totalJ = totalJ + g.players.length;
        });
        setTotal(totalJ);
      })
      .catch((e) => {
        console.log(e);
        alertSwal.fire({
          icon: "error",
          title: "Oops...",
          text: e,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getNewList();
  }, []);

  const onDragEnd = (result: { source: any; destination: any; }) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedGuilds = [...guilds];

    const sourceGuild = updatedGuilds[source.droppableId];
    const destGuild = updatedGuilds[destination.droppableId];

    const [movedPlayer] = sourceGuild.players.splice(source.index, 1);
    sourceGuild.total_xp -= movedPlayer.xp;

    destGuild.players.splice(destination.index, 0, movedPlayer);
    destGuild.total_xp += movedPlayer.xp;

    setGuilds(updatedGuilds);
  };
  
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
            disabled={currentTab === 2}
          >
            Avançar
          </button>
        </div>

        <div className="flex justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Total de jogadores: {total}
          </h3>
        </div>

        <hr />
        
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Guildas</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guilds.map((guildWrapper: any, index: any) => (
                <Droppable key={guildWrapper.guild.id} droppableId={`${index}`}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-white shadow-md rounded-lg p-4 border"
                    >
                      <h2 className="text-xl font-semibold text-gray-800">
                        {guildWrapper.guild.name}
                      </h2>
                      <p className="text-gray-600">
                        XP Total:{" "}
                        <span className="font-bold">{guildWrapper.total_xp}</span>
                      </p>

                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-700">
                          Jogadores:
                        </h3>
                        <ul className="mt-2 space-y-2">
                          {guildWrapper.players.map((player: any, playerIndex: number) => (
                            <Draggable
                              key={player.id}
                              draggableId={`${player.id}`}
                              index={playerIndex}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="flex justify-between bg-gray-100 p-2 rounded-md"
                                >
                                  <div>
                                    <p className="font-medium">{player.name}</p>
                                    <p className="text-sm text-gray-600">
                                      Classe: {player.class}
                                    </p>
                                  </div>
                                  <p className="text-gray-700 font-semibold">
                                    XP: {player.xp}
                                  </p>
                                </li>
                              )}
                            </Draggable>
                          ))}
                        </ul>
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

export default TabTwo;