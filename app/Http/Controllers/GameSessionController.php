<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\SetPlayersAsConfirmedRequest;
use App\Repositories\GameSessionRepositoryInterface;

class GameSessionController extends Controller
{
    private GameSessionRepositoryInterface $gameSessionRepository;

    public function __construct(GameSessionRepositoryInterface $gameSessionRepository)
    {
        $this->gameSessionRepository = $gameSessionRepository;
    }

    public function getPlayersToAddToSession()
    {
        $players = $this->gameSessionRepository->getPlayersToAddToSession();
        return response()->json($players);
    }

    public function setAllPlayersAsUnconfirmed()
    {
        $this->gameSessionRepository->setAllPlayersAsUnconfirmed();
        return response()->json(['message' => 'Todos os jogadores foram desconfirmados.']);
    }

    public function setPlayersAsConfirmed(SetPlayersAsConfirmedRequest $request)
    {
        $this->gameSessionRepository->setPlayersAsConfirmed($request['ids']);
        return response()->json(['message' => 'Jogadores confirmados com sucesso.']);
    }

    public function getGuilds()
    {
        $guilds = $this->gameSessionRepository->formGuild();
        return response()->json($guilds);
    }
}
