import Swal from 'sweetalert2'
import { SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

import { playerClass } from '@/core/constants/sys';
import { IPlayer } from "@/core/models/player.mode";
import { PlayerService } from '@/core/services/player.service';
import FormField from '@/shared/ui/formField';
import FormSelectField from '@/shared/ui/formSelectField';

const playerService = new PlayerService();

type Inputs = {
  [P in keyof IPlayer]?: IPlayer[P];
}

type FieldErrors = {
  [P in keyof Inputs]?: string;
}

type ErrorState = FieldErrors & {
  message?: string;
}

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  player: IPlayer | null;
}

const ModalPlayer: React.FC<Props>  = ({ setOpenModal, player }) => {

  const alertSwal = withReactContent(Swal)
  const [errors, setErrors] = useState<ErrorState>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
  } = useForm<Inputs>();

  useEffect(() => {
    if (player) {
      setValue('id', player.id);
      setValue('name', player.name);
      setValue('class', player.class);
      setValue('xp', player.xp);
      setValue('confirmed', player.confirmed);
    } else {
      setValue('confirmed', false);
    }
  }, [player]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {  
    const payload = {
      name: data.name,
      class: data.class,
      xp: data.xp,
      confirmed: data.confirmed,
    }

    setLoading(true);

    if (data.id) {
      playerService.update(data.id, payload as IPlayer)
        .then(r => {
          if (r.message) setMessage(r.message);
          reset();
  
          alertSwal.fire({
            icon: "success",
            title: 'Sucesso!',
            text: r.message || '',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            window.location.replace("/players");
          });
        })
        .catch((e: SetStateAction<ErrorState>) => {
          setErrors(e);
        })
        .finally(() => {
          setLoading(false);
        })
    } else {     
      playerService.store(payload as IPlayer)
        .then(r => {
          if (r.message) setMessage(r.message);
          reset();
  
          alertSwal.fire({
            icon: "success",
            title: 'Sucesso!',
            text: r.message || '',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            window.location.replace("/players");
          });
        })
        .catch((e: SetStateAction<ErrorState>) => {
          setErrors(e);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }

  return (
    <>
      <div className="bg-gray-900/50 fixed inset-0 z-40">
        <div id="default-modal" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    { player?.id ? 'Atualizar Jogador' : 'Novo Jogador' }
                  </h3>
                  <button onClick={() => { setOpenModal(false) }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Fechar</span>
                  </button>
                </div>
                <div className="p-4 space-y-4 md:p-5">
                  <div className="w-full">
                    { message && <div className="mb-6">
                      <div className="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{message}</span>
                      </div>
                    </div> }
                    { errors.message && <div className="mb-6">
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{errors.message}</span>
                      </div>
                    </div> }
                  </div>

                  <FormField
                    name="name"
                    label="Nome"
                    type="text"
                    register={register}
                    error={errors.name}
                    required={true}
                    placeholder=""
                  />

                  <FormSelectField
                    name="class"
                    label="Classe"
                    options={Object.entries(playerClass).map(([_key, value]) => {
                      return { value, label: value };
                    })}
                    register={register}
                    error={errors.class}
                    required={true}
                    placeholder="Selecione uma opção"
                  />

                  <FormField
                    name="xp"
                    label="XP"
                    type="number"
                    register={register}
                    error={errors.xp}
                    required={true}
                    placeholder=""
                  />

                  <FormField
                    name="confirmed"
                    label="Confirmado para a sessão"
                    type="checkbox"
                    register={register}
                    error={errors.confirmed}
                    placeholder=""
                  />
                </div>

                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                  <button disabled={loading} type="submit" data-modal-hide="default-modal" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Salvar
                  </button>
                  <button onClick={() => { setOpenModal(false) }} data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-10">
                    Fechar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalPlayer;