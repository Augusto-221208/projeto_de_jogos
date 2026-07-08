CREATE DATABASE loja_games;
USE loja_games;

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(255),
    categoria_id INT NOT NULL,

    INDEX (categoria_id),

    CONSTRAINT fk_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

INSERT INTO categorias (nome) VALUES
('Esporte'),
('Sandbox'),
('Ação'),
('Aventura'),
('RPG'),
('Terror'),
('FPS'),
('Corrida'),
('Simulação'),
('Indie'),
('MOBA');

INSERT INTO produtos
(nome, descricao, preco, imagem, categoria_id)
VALUES
('EA Sports FC 26','Jogo de futebol da EA Sports.',349.90,'https://placehold.co/300x400?text=EA+Sports+FC+26',1),

('Minecraft','Jogo sandbox de construção e sobrevivência.',149.90,'https://placehold.co/300x400?text=Minecraft',2),

('Grand Theft Auto V','Jogo de ação em mundo aberto.',99.90,'https://placehold.co/300x400?text=GTA+V',3),

('Red Dead Redemption 2','Aventura em mundo aberto no velho oeste.',249.90,'https://placehold.co/300x400?text=RDR2',4),

('Cyberpunk 2077','RPG futurista em Night City.',199.90,'https://placehold.co/300x400?text=Cyberpunk+2077',5),

('Elden Ring','RPG de ação desenvolvido pela FromSoftware.',279.90,'https://placehold.co/300x400?text=Elden+Ring',5),

('God of War Ragnarök','Kratos enfrenta o Ragnarök.',299.90,'https://placehold.co/300x400?text=God+of+War',3),

('The Last of Us Part I','Aventura com Joel e Ellie.',249.90,'https://placehold.co/300x400?text=The+Last+of+Us',4),

('Resident Evil 4 Remake','Remake do clássico survival horror.',199.90,'https://placehold.co/300x400?text=Resident+Evil+4',6),

('Valorant','FPS competitivo gratuito.',0.00,'https://placehold.co/300x400?text=Valorant',7),

('Counter-Strike 2','FPS competitivo da Valve.',0.00,'https://placehold.co/300x400?text=CS2',7),

('Call of Duty: Black Ops 6','FPS militar.',349.90,'https://placehold.co/300x400?text=Black+Ops+6',7),

('Forza Horizon 5','Jogo de corrida em mundo aberto.',249.90,'https://placehold.co/300x400?text=Forza+Horizon+5',8),

('F1 25','Simulador oficial da Fórmula 1.',299.90,'https://placehold.co/300x400?text=F1+25',8),

('The Sims 4','Simulador de vida.',0.00,'https://placehold.co/300x400?text=The+Sims+4',9),

('Stardew Valley','Simulador de fazenda.',39.90,'https://placehold.co/300x400?text=Stardew+Valley',9),

('Hollow Knight','Metroidvania independente.',46.99,'https://placehold.co/300x400?text=Hollow+Knight',10),

('Hades','Roguelike de ação.',73.99,'https://placehold.co/300x400?text=Hades',10),

('Terraria','Sandbox de aventura.',32.99,'https://placehold.co/300x400?text=Terraria',2),

('League of Legends','MOBA competitivo.',0.00,'https://placehold.co/300x400?text=League+of+Legends',11);