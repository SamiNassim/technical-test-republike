# Republike

Voici le résultat de mon test technique pour Republike. </br>
J'ai délibérément push les fichiers .env pour faciliter le lancement de l'application.

## Instructions

Vous aurez besoin de **Docker** pour faire fonctionner la base de donnée PostgreSQL.

Une fois que Docker est installé et après avoir redémarrer votre PC, lancez Docker.

Ensuite :

```` 
git clone https://github.com/SamiNassim/republike.git
````

```` 
cd republike
````

```` 
npm install
````
```` 
docker compose up -d
````

```` 
npx prisma db push
````

```` 
npm run dev
````

## Temps passé sur le test

J'ai passé approximativement entre 20~30h sur ce test. </br>
J'ai pris la liberté de modifier le texte "Create profile" sur la page de Login qui ne correspondait pas sur la maquette.
