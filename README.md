# README

## Description

Ce dépôt contient une application web React avec deux fonctionnalités principales liées aux positions GPS :

1. **Liste des Positions** : Cette fonctionnalité permet aux utilisateurs de gérer les positions GPS. Les utilisateurs peuvent effectuer les actions suivantes :
    - Saisir des coordonnées GPS (latitude et longitude) et un nom pour ajouter une nouvelle position.
    - Visualiser une liste de positions GPS stockées dans la base de données.
    - Supprimer une position GPS.
    - Ajouter une nouvelle position GPS via une boîte de dialogue modale.

2. **Comparer les Positions** : Cette fonctionnalité permet aux utilisateurs de comparer deux positions GPS et de déterminer si elles se trouvent à moins de 10 km l'une de l'autre. Les utilisateurs peuvent :
    - Sélectionner deux positions GPS dans une liste.
    - Cliquer sur le bouton "Comparer" pour vérifier si les positions sélectionnées se trouvent à moins de 10 km l'une de l'autre.

L'application est construite en utilisant React et utilise une API RESTful pour gérer et comparer les positions GPS.

## Utilisation

### Liste des Positions

Pour accéder à la fonctionnalité de la Liste des Positions, rendez-vous sur la page d'accueil de l'application. Voici comment l'utiliser :

1. **Visualiser les Positions GPS** : Lorsque vous arrivez sur la page d'accueil, vous verrez un tableau affichant la liste des positions GPS, y compris leur ID, leur nom, leur latitude et leur longitude.

2. **Supprimer une Position** : Chaque ligne du tableau comporte un bouton "Supprimer". Cliquez sur ce bouton pour supprimer la position GPS correspondante.

3. **Ajouter une Nouvelle Position** : Pour ajouter une nouvelle position GPS, cliquez sur le bouton "Ajouter une localisation" en bas de la liste. Une boîte de dialogue modale apparaîtra, vous permettant d'entrer le nom, la latitude et la longitude de la nouvelle position. Cliquez sur le bouton "Ajouter" dans la modale pour enregistrer la nouvelle position.

### Comparer les Positions

Pour accéder à la fonctionnalité de Comparer les Positions, utilisez la barre de navigation pour passer à l'écran de comparaison. Voici comment l'utiliser :

1. **Sélectionner les Positions** : Sur l'écran de comparaison, vous trouverez deux menus déroulants intitulés "Position 1" et "Position 2". Choisissez deux positions GPS que vous souhaitez comparer parmi les options disponibles dans les menus déroulants.

2. **Comparer les Positions** : Après avoir sélectionné les deux positions, cliquez sur le bouton "Comparer" pour lancer la comparaison.

3. **Résultats** : L'application affichera le résultat de la comparaison, indiquant si les positions sélectionnées se trouvent à moins de 10 km l'une de l'autre. Le résultat sera soit "Distance inférieure ou égale à 10 km" soit "Distance supérieure à 10 km".

## Structure du Code

### Liste des Positions (positionsList.tsx)

Le composant `PositionsList` gère la gestion des positions GPS. Il inclut des fonctionnalités pour ajouter, visualiser et supprimer des positions. Les fonctions clés incluent la récupération des positions depuis l'API, la gestion de l'entrée utilisateur pour la création de positions et l'affichage d'une modale pour la suppression.

### Comparer les Positions (comparePositions.tsx)

Le composant `ComparePositions` gère la comparaison des positions GPS. Il permet aux utilisateurs de sélectionner deux positions et de déterminer leur proximité. Les fonctions clés incluent la récupération des positions depuis l'API, la comparaison des positions et l'affichage des résultats.

## Dépendances

- React
- React Bootstrap (pour les composants UI)
- API RESTful ici une API Spring Boot dépôt ici : https://github.com/maximelonguepe/CrystalBackend

## Configuration

Pour exécuter l'application, assurez-vous d'avoir React et les dépendances requises installés. Vous devrez également configurer l'API RESTful pour la gestion des positions GPS.

1. Clonez ce dépôt sur votre machine locale.

2. Installez les dépendances en utilisant la commande suivante :
   npm install
3. Lancez l'application : npm start
4. Modifiez le fichier .env pour matcher avec la configuration de votre API
5. Accédez à l'application dans votre navigateur web (en général : http://localhost:3000)
