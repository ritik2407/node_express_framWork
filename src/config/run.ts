import mysql from 'mysql2';
import { environment } from './environment';



const connection = mysql.createConnection({
    host: environment.DB_HOST,
    user: environment.DB_USER,
    password: environment.DB_PASSWORD,
    database: environment.DB_NAME,
});




const tables = "show tables"
const usersTable = "CREATE TABLE `users` ( `id` INT NOT NULL AUTO_INCREMENT,  `email` VARCHAR(100) NOT NULL, `password` VARCHAR(15) NOT NULL, `status` TINYINT(1) NOT NULL DEFAULT '1', `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY (`id`), UNIQUE (`email`) )";
const tokenTable = "CREATE TABLE `authToken` (`id` VARCHAR(64) NOT NULL , `user_id` INT NOT NULL , `scope` INT NOT NULL , `status` TINYINT(1) NOT NULL DEFAULT '1' , `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `validUpto` DATETIME NOT NULL , PRIMARY KEY (`id`));";
const sessionTable = "CREATE TABLE `sessions` ( `id` int NOT NULL, `user_id` int NOT NULL, `token` int NOT NULL, `createdAt` int NOT NULL, `updatedAt` int NOT NULL, `status` tinyint(1) NOT NULL, PRIMARY KEY (`id`), UNIQUE KEY `id` (`id`))";


try {
    connection.connect();

    connection.query(tables, (err, rows: any) => {

        if (err) {
            console.log(err);
        } else {

            if (rows.some((rows: any) => rows['Tables_in_' + environment.DB_NAME] == 'users')) {
                console.log("users Table is already exists");
            }
            else {
                connection.query(usersTable, (error, results, fields) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(results);
                    }
                });
            }

            if (rows.some((rows: any) => rows['Tables_in_' + environment.DB_NAME] == 'authtoken')) {
                console.log("authToken table is already exists");
            }
            else {
                connection.query(tokenTable, (error, results, fields) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(results);
                    }
                });
            }

            if (rows.some((rows: any) => rows['Tables_in_' + environment.DB_NAME] == 'sessions')) {
                console.log("session table is already exists");
            }
            else {
                connection.query(sessionTable, (error, results, fields) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(results);
                    }
                });
            }

        }


        connection.end();
    })


} catch (error) {
    console.log(error);
}


