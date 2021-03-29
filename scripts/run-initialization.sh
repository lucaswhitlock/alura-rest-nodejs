sleep 10s

/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P CorrectHorseBatteryStapleFor_ -d master -i create-database.sql