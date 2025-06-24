-- Table Sexe
CREATE TABLE Sexe (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Libelle VARCHAR(50) NOT NULL
);

-- Insertion des données dans Sexe
INSERT INTO Sexe (Libelle) VALUES 
('Male'),
('Femelle'),
('Inconnu');

-- Table Type
CREATE TABLE Type (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Libelle VARCHAR(50) NOT NULL
);

-- Insertion des types
INSERT INTO Type (Libelle) VALUES 
('Insecte'),
('Dragon'),
('Fée'),
('Feu'),
('Spectre'),
('Sol'),
('Normal'),
('Psy'),
('Acier'),
('Ténèbre'),
('Electrik'),
('Vol'),
('Plante'),
('Glace'),
('Poison'),
('Roche'),
('Eau');

-- Table Pokémon
CREATE TABLE Pokemon (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(100) NOT NULL,
    Description TEXT NOT NULL,
    Photo VARCHAR(255) NOT NULL,
    Taille FLOAT NOT NULL,
    Type1_ID INT NOT NULL,
    Type2_ID INT,
    Sexe_ID INT NOT NULL,

    FOREIGN KEY (Type1_ID) REFERENCES Type(ID),
    FOREIGN KEY (Type2_ID) REFERENCES Type(ID),
    FOREIGN KEY (Sexe_ID) REFERENCES Sexe(ID)
);
