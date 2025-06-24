<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250624093905 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE pokemon (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(100) NOT NULL, Type1_ID INT NOT NULL, Type2_ID INT DEFAULT NULL, Sexe_ID INT NOT NULL, INDEX IDX_62DC90F3E833C5DD (Type1_ID), INDEX IDX_62DC90F3FA866A33 (Type2_ID), INDEX IDX_62DC90F325D806CA (Sexe_ID), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE sex (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(50) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', available_at DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', delivered_at DATETIME DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE pokemon ADD CONSTRAINT FK_62DC90F3E833C5DD FOREIGN KEY (Type1_ID) REFERENCES type (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE pokemon ADD CONSTRAINT FK_62DC90F3FA866A33 FOREIGN KEY (Type2_ID) REFERENCES type (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE pokemon ADD CONSTRAINT FK_62DC90F325D806CA FOREIGN KEY (Sexe_ID) REFERENCES sex (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE pokemon DROP FOREIGN KEY FK_62DC90F3E833C5DD
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE pokemon DROP FOREIGN KEY FK_62DC90F3FA866A33
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE pokemon DROP FOREIGN KEY FK_62DC90F325D806CA
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE pokemon
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE sex
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE type
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE messenger_messages
        SQL);
    }
}
