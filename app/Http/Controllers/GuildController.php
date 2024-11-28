<?php

namespace App\Http\Controllers;

use App\Models\Guild;
use App\Http\Requests\StoreGuildRequest;
use App\Http\Requests\UpdateGuildRequest;
use App\Repositories\GuildRepositoryInterface;

class GuildController extends Controller
{
    private GuildRepositoryInterface $playerRepository;

    public function __construct(GuildRepositoryInterface $playerRepository)
    {
        $this->playerRepository = $playerRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $players = $this->playerRepository->getAll();
        return response()->json($players);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGuildRequest $request)
    {
        $player = $this->playerRepository->create($request->validated());
        return response()->json($player, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Guild $player)
    {
        return response()->json($player);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGuildRequest $request, Guild $player)
    {
        $updated = $this->playerRepository->update($player->id, $request->validated());
        if (!$updated) {
            return response()->json(['error' => 'A atualização do jogador falhou.'], 400);
        }
        return response()->json(['success' => 'Jogador atualizado com sucesso.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guild $player)
    {
        $deleted = $this->playerRepository->delete($player->id);
        if (!$deleted) {
            return response()->json(['error' => 'Falha na exclusão do jogador.'], 400);
        }
        return response()->json(['success' => 'Jogador excluído com sucesso.']);
    }
}
