<?php

namespace App\Entity;

use App\Repository\PokemonRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PokemonRepository::class)]
#[ORM\Table(name: "Pokemon")]
class Pokemon
{
  #[ORM\Id]
  #[ORM\GeneratedValue]
  #[ORM\Column(type: 'integer')]
  #[Groups(['pokemon:read'])]
  private ?int $id = null;

  #[ORM\Column(name: 'Nom', type: 'string', length: 100)]
  #[Groups(['pokemon:read', 'pokemon:write'])]
  private string $name;

  #[ORM\Column(name: 'Description', type: 'text')]
  #[Groups(['pokemon:read', 'pokemon:write'])]
  private string $description;

  #[ORM\Column(name: 'Photo', type: 'string', length: 255)]
  #[Groups(['pokemon:read', 'pokemon:write'])]
  private string $photo;

  #[ORM\Column(name: 'Taille', type: 'float')]
  #[Groups(['pokemon:read', 'pokemon:write'])]
  private float $taille;

  #[ORM\ManyToOne]
  #[ORM\JoinColumn(name: 'Type1_ID', referencedColumnName: 'id', nullable: false)]
  #[Groups(['pokemon:read', 'pokemon:write'])]
  private ?Type $type1 = null;

  #[ORM\ManyToOne]
  #[ORM\JoinColumn(name: 'Type2_ID', referencedColumnName: 'id', nullable: true)]
  #[Groups(['pokemon:read', 'pokemon:write'])]
  private ?Type $type2 = null;

  #[ORM\ManyToOne]
  #[ORM\JoinColumn(name: 'Sexe_ID', referencedColumnName: 'id', nullable: false)]
  #[Groups(['pokemon:read', 'pokemon:write'])]
  private ?Sexe $sex = null;

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function setName(string $name): self
  {
    $this->name = $name;
    return $this;
  }

  public function getDescription(): string
  {
    return $this->description;
  }

  public function setDescription(string $description): self
  {
    $this->description = $description;
    return $this;
  }

  public function getPhoto(): string
  {
    return $this->photo;
  }

  public function setPhoto(string $photo): self
  {
    $this->photo = $photo;
    return $this;
  }

  public function getTaille(): float
  {
    return $this->taille;
  }

  public function setTaille(float $taille): self
  {
    $this->taille = $taille;
    return $this;
  }

  public function getType1(): ?Type
  {
    return $this->type1;
  }

  public function setType1(?Type $type1): self
  {
    $this->type1 = $type1;
    return $this;
  }

  public function getType2(): ?Type
  {
    return $this->type2;
  }

  public function setType2(?Type $type2): self
  {
    $this->type2 = $type2;
    return $this;
  }

  public function getSex(): ?Sexe
  {
    return $this->sex;
  }

  public function setSex(?Sexe $sex): self
  {
    $this->sex = $sex;
    return $this;
  }
}
