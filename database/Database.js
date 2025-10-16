import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('motoboy_gestao.db');

export const init = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS bikes (id INTEGER PRIMARY KEY NOT NULL, model TEXT, consumption REAL, status TEXT, totalValue REAL);',
                [],
                () => { resolve(); },
                (_, error) => { reject(error); }
            );
        });
    });
};

export default db; 