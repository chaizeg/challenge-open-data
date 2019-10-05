# Challenge open data
Ayoub Nasr – Zegoumou Chaimaa – Hamza tamenaoul – Zakaria Maaraki – Kenza Halably.

## Introduction
Cette WebApp à été développée dans le cadre du Challenge Open Data; le but principal étant de permettre à l’utilisateur de visualiser et de parcourir un grand jeu de données de manière interactive, simplifiée. 
L’application visualise les inégalités de revenu entre différentes catégories d’individus en France. Ces individus seront classés par sexe, tranche d’âge, poste, et région géographique.

## Jeu de données
Le jeu de données choisi provient du site web  [Kaggle](https://www.kaggle.com/etiennelq/french-employment-by-town). Il s'agit du compte rendu d’un recensement conduit par l’INSEE en 2014 sur l’ensemble des villes françaises. Il contient les tables suivantes:

- entreprises classées par nombre d'employés par ville.
- salaires moyens des citoyens par ville, âge, sexe, et poste.
- population de chaque ville par âge et sexe.
- données géographiques : région et département de chaque ville. 

Ces données font 344Mo de taille; il était alors évident qu'il fallait faire un bon travail de filtrage et de sélection de données pertinentes à notre vision de ce projet. Ainsi, initialement, en format CSV, on a retenu la table des salaires ainsi que celle des données géographiques.
On a également utilisé un [fichier geojson](https://github.com/gregoiredavid/france-geojson/blob/298b2cf21ebe12be4dafcf22b3ca6c6cb4f9e225/regions.geojson) qui décrit les contours de chaque région de France en 2014.

## Traitements
A partir des deux fichiers selectionnés, on a extrait les salaires moyens des citoyens par âge, sexe, poste par région.
Ceci est réalisé en employant un script Python qui calcule la moyenne de chaque valeur des salaires (par âge, sexe, poste) pour toutes les villes d'une région. Le script formatte le résultat final au format JSON pour qu'il soit directement placé dans le code de la page web.

## Visualisations

### Limitations
Le jeu de données présente une limitation autour de laquelle on a dû concevoir l'outil de visualisation: 
Les moyennes des salaires sont faites par sexe, par âge, et par position mais on n'y trouve pas toutes les combinaisons possibles de ces trois critères. Les critères présentés par le jeu de données sont:

- âge
- sexe
- position
- sexe + position
- sexe + âge

Un premier challenge de la visualisation était de créer une interface qui interdit la selection d'autres combinaisons sans tout de même limiter l'utilité de la page web. 

### Interface
On s'est concentrés tout au long du projet sur la conception d'une interface simple et intuitive.
L'utilisateur se retrouve face à un écran d'accueil avec le bouton "Commencer" qui défile la page vers le bas, où l'on retrouve une carte qui met en avant les différentes régions. L'utilisateur peut séléctionner une ou plusieurs régions sur la carte.
Au dessous de la carte, On retrouve des sélecteurs pour les critères que l'utilisateur peut choisir.
Un graphe est généré en dessous des sélecteurs à chaque nouvelle selection.


### La carte
Le rendu de la carte est fait à l'aide de l'[API Leaflet](https://leafletjs.com). On y ajoute le fichier geojson des régions géographiques pour les mettre en avant. Cet API permet de spécifer des callbacks pour les actions de l'utilisateur sur la carte, comme la génération de nouveaux graphes à la sélection ou à la désélection d'une région.

### Les graphes
Les graphes sont générés à l'aide de l'API [chartjs](https://www.chartjs.org/) à partir des données traitées.
Vu que nos données concernent uniquement l'année 2014, et sont alors fixes dans le temps, il était clair qu'on n'allait pas utiliser des graphes du type 'Line' ou 'area'. La relation de causalité entre un facteur X et le salaire n'est pas non plus explorée; d'où le manque d'intérêt à un graphe X-Y. 

Le choix d'un graphe du type 'pie chart' était uniquement limité à la combinaison (1 région + sexe); afin de montrer l'inégalité flagrante entre le salaire des hommes et celui des femmes.

Le reste des graphes est présenté sous forme de 'barplots', qui sont intéressants en terme de visualisation pour plusieurs catégories (par exemple pour les différents postes ou les multiples tranches d'âge avec plusieurs régions sélectionnées..).

Quant au choix des couleurs, on a utilisé les couleurs classiques pour représenter le sexe (rouge pour femmes et bleu pour hommes), des couleurs représentant le niveau d'énergie classiquement connu pour les tranches d'âge (jaune pour 18-25 ans, orange pour 26-50 ans et violet pour plus de 50 ans), ainsi qu'une sélection de couleurs polychromatiques pour les postes afin de faire la différence entre ces différentes catégories.