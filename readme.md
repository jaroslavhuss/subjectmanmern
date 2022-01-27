# Jak si zprovoznit appku

1. sudo npm install -g typescript
2. cd server && npm install
3. cd ..
4. cd client && npm install
5. cd ..
6. touch .env

A do .env file si uložte následující:

DB*LOCAL = mongodb://127.0.0.1:27017/subjectman \
DB_PRODUCTION = \_tenhle string vám dá Honza* \
DEV*MODE = development \
JWT_SECRET = \_tenhle string vám dá Jarda* \
JWT_EXPIRE = 10min

## Spuštění

cd server && npm run dev

## Hrubá představa ohldě rout

/api/subjects
GET - bude na fe sluzba pro admina i pro uzivatele a bude vracet seznam vsech predmetu
POST - sluzba bude creatovat novej predmet az bude admin obrazovka
mysleno z DB jako subject View

/api/subjects/{id subjectu} 
GET - vrati konkretni subject.
PATCH - bude updatovat konkretni subject v ramci administrace
DELETE - bude mazat konkretni subject

/api/topics
GET - sluzba bude vracet seznam vsech topicu pro administraci
POST - sluzba bude creatovat novej topic az bude admin obrazovka

/api/topics/{id topic}
GET - vrati konkretni topic.
PATCH - bude updatovat konkretni topic v ramci administrace
DELETE - bude mazat konkretni topic

uzivatelske sluzby bych ponechal tak jak tedko jsou, tohle si mozna jeste budeme muset nejak vykomunikovat jak pak udelat samotny zapis predmetu. Vyuzil bych toziz nejak jiz implementovanejch sluzeb :)
