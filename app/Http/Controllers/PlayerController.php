<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlayerRequest;
use App\Http\Requests\UpdatePlayerRequest;
use App\Models\Player;
use App\Repositories\PlayerRepositoryInterface;

class PlayerController extends Controller
{
    private PlayerRepositoryInterface $playerRepository;

    public function __construct(PlayerRepositoryInterface $playerRepository)
    {
        $this->playerRepository = $playerRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $players = $this->playerRepository->getAllPlayers();
        return response()->json($players);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlayerRequest $request)
    {
        $player = $this->playerRepository->createPlayer($request->validated());
        return response()->json($player, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Player $player)
    {
        return response()->json($player);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlayerRequest $request, Player $player)
    {
        $updated = $this->playerRepository->updatePlayer($player->id, $request->validated());
        if (!$updated) {
            return response()->json(['error' => 'A atualização do jogador falhou.'], 400);
        }
        return response()->json(['success' => 'Jogador atualizado com sucesso.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Player $player)
    {
        $deleted = $this->playerRepository->deletePlayer($player->id);
        if (!$deleted) {
            return response()->json(['error' => 'Falha na exclusão do jogador.'], 400);
        }
        return response()->json(['success' => 'Jogador excluído com sucesso.']);
    }
}
