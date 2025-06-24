<?php

namespace App\Controller;

use App\Repository\SexRepository;
use App\Repository\TypeRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/references')]
class ReferenceController extends AbstractController
{
  #[Route('/types', methods: ['GET'])]
  public function getTypes(TypeRepository $repo): JsonResponse
  {
    return $this->json($repo->findAll(), context: ['groups' => ['type:read']]);
  }

  #[Route('/sexes', methods: ['GET'])]
  public function getSexes(SexRepository $repo): JsonResponse
  {
    return $this->json($repo->findAll(), context: ['groups' => ['sex:read']]);
  }
}
