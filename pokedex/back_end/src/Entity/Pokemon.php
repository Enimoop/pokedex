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

  #[ORM\Column(name: 'Pokemon', type: 'string', length: 100)]
  #[Groups(['pokemon:read', 'pokemon:write'])]
  private string $name;

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
  private ?Sex $sex = null;

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

  public function getSex(): ?Sex
  {
    return $this->sex;
  }

  public function setSex(?Sex $sex): self
  {
    $this->sex = $sex;
    return $this;
  }
}
