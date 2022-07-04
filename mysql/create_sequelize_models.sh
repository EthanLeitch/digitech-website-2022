#!/bin/bash
npx sequelize-cli init
npx sequelize-cli db:create
npx sequelize-cli model:generate --name classroom --attributes 'RoomNumber:integer,Latitude:decimal,Longitude:decimal'
npx sequelize-cli db:migrate