<?php

namespace App\Controller;

use App\Entity\Pokemon;
use App\Entity\Type;
use App\Entity\Sexe;
use App\Repository\PokemonRepository;
use App\Repository\TypeRepository;
use App\Repository\SexeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/pokemons')]
class PokemonController extends AbstractController
{
  #[Route('', methods: ['GET'])]
  public function list(PokemonRepository $repo): JsonResponse
  {
    return $this->json($repo->findAll(), context: ['groups' => 'pokemon:read']);
  }

  #[Route('/{id}', methods: ['GET'])]
  public function show(Pokemon $pokemon): JsonResponse
  {
    return $this->json($pokemon, context: ['groups' => 'pokemon:read']);
  }

  #[Route('/{id}', methods: ['DELETE'])]
  public function delete(EntityManagerInterface $em, Pokemon $pokemon): JsonResponse
  {
    $em->remove($pokemon);
    $em->flush();
    return $this->json(null, 204);
  }

  #[Route('/{id}', methods: ['PUT'])]
  public function update(
    Request $request,
    EntityManagerInterface $em,
    Pokemon $pokemon,
    TypeRepository $typeRepo,
    SexeRepository $sexRepo
  ): JsonResponse {
    $data = json_decode($request->getContent(), true);

    $pokemon->setName($data['name'] ?? $pokemon->getName());

    if (isset($data['type1'])) {
      $type1 = $typeRepo->find($data['type1']);
      $pokemon->setType1($type1);
    }

    if (array_key_exists('type2', $data)) {
      $type2 = $typeRepo->find($data['type2']);
      $pokemon->setType2($type2);
    }

    if (isset($data['sex'])) {
      $sex = $sexRepo->find($data['sex']);
      $pokemon->setSex($sex);
    }

    $em->flush();
    return $this->json($pokemon, context: ['groups' => 'pokemon:read']);
  }

  #[Route('', methods: ['POST'])]
  public function add(
    Request $request,
    EntityManagerInterface $em,
    TypeRepository $typeRepo,
    SexeRepository $sexRepo
  ): JsonResponse {
    $data = json_decode($request->getContent(), true);

    $pokemon = new Pokemon();
    $pokemon->setName($data['name'] ?? '');

    $type1 = $typeRepo->find($data['type1'] ?? null);
    $pokemon->setType1($type1);

    $type2 = $typeRepo->find($data['type2'] ?? null);
    $pokemon->setType2($type2);

    $sex = $sexRepo->find($data['sex'] ?? null);
    $pokemon->setSex($sex);

    $em->persist($pokemon);
    $em->flush();

    return $this->json($pokemon, 201, context: ['groups' => 'pokemon:read']);
  }
}
