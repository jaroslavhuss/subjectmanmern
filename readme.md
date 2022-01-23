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
