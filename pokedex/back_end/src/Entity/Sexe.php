<?php

namespace App\Entity;

use App\Repository\SexeRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Id;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SexeRepository::class)]
#[ORM\Table(name: "Sexe")]
class Sexe
{
  #[ORM\Id]
  #[ORM\GeneratedValue]
  #[ORM\Column(type: 'integer')]
  #[Groups(['sexe:read', 'pokemon:read'])]
  private ?int $id = null;

  #[ORM\Column(name: 'Libelle', type: 'string', length: 50)]
  #[Groups(['sexe:read', 'pokemon:read'])]
  private string $libelle;

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getLibelle(): string
  {
    return $this->libelle;
  }

  public function setLibelle(string $libelle): self
  {
    $this->libelle = $libelle;
    return $this;
  }

  public function __toString(): string
  {
    return $this->libelle;
  }
}
