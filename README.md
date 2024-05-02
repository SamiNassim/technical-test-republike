# Republike

Voici le résultat de mon test technique pour Republike. </br>

Je devais reproduire le design d'une maquette et ajouter les fonctionnalités correspondantes. (Register, login, poster un message, liker un message.) 

https://www.figma.com/file/V60Qs8UHxHzDZEO15h7UO8/Technical-Test-Republike?type=design&node-id=0-1&mode=design&t=ipUQ9my3s1qzZniI-0

J'ai délibérément push les fichiers .env pour faciliter le lancement de l'application.</br>
J'ai pris la liberté de modifier le texte du bouton "Create profile" sur la page de login par rapport à la maquette.</br>

<i>Here is my submission for Republike technical test.</br>
I had to create a website from a Figma design and add the requested features. (Register, login, post a message, like a message.)
I pushed the .env on purpose to facilitate the installation process.</br>
I took the liberty to change the text of the login button. (On Figma, it says "Create profile")</i>


## Instructions

Vous aurez besoin de **Docker** pour faire fonctionner la base de donnée PostgreSQL. </br>
Une fois que Docker est installé et après avoir redémarrer votre PC, lancez Docker.

<i>You will need **Docker** in order to use the postgreSQL database as a container.</br>
Once Docker is installed, reboot your PC and make sure Docker is running.</i>

Ensuite : </br>
<i>Then :</i>

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

<i>I spent 20 to 30 hours total on this test.</i>
