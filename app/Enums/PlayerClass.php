<?php

namespace App\Enums;

enum PlayerClass: string
{
    case WARRIOR = 'Guerreiro';
    case MAGE = 'Mago';
    case ARCHER = 'Arqueiro';
    case CLERIC = 'Clérigo';
}
