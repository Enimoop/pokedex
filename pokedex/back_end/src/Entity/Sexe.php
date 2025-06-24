<?php

namespace App\Entity;

use App\Repository\SexRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SexRepository::class)]
#[ORM\Table(name: "Sexe")]
class Sex
{
  #[ORM\Id]
  #[ORM\GeneratedValue]
  #[ORM\Column(type: 'integer')]
  #[Groups(['Sexe:read'])]
  private ?int $id = null;

  #[ORM\Column(name: 'Type', type: 'string', length: 50)]
  #[Groups(['Sexe:read'])]
  private string $label;

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getLabel(): string
  {
    return $this->label;
  }

  public function setLabel(string $label): self
  {
    $this->label = $label;
    return $this;
  }

  public function __toString(): string
  {
    return $this->label;
  }
}
