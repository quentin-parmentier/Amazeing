# Amazeing

## Interface permettant de créer des labyrinthes.

Appuyer sur une case pour la colorer en brun, cela devient alors un mur.
Appuyer sur le bouton pour que le joueur (IA) commence à chercher son chemin.
Le chemin se trace dès qu'une solution est trouvée.

## But

Le joueur commence en haut à gauche et doit trouver un chemin jusqu'en bas à droite.

## Résolution

Algorithme génétique

4 actions possibles (H,B,G,D)

Taille maximal d'un génome : 100

Si le joueur va dans un mur, il meurt

Fonction de fitness : pondération entre la distance et le nombre de pas effectuer (Une grande distance en peu de pas est plus apte à la survie)
