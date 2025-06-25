<?php

namespace App\Entity;

use App\Repository\TypeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TypeRepository::class)]
#[ORM\Table(name: "Type")]
class Type
{
  #[ORM\Id]
  #[ORM\GeneratedValue]
  #[ORM\Column(type: 'integer')]
  #[Groups(['pokemon:read', 'type:read'])]
  private ?int $id = null;

  #[ORM\Column(name: 'Libelle', type: 'string', length: 50)]
  #[Groups(['pokemon:read', 'type:read'])]
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
