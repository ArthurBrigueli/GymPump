import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('database.db');

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS treinos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, data TEXT, exercicios TEXT);'
    );
  });
};

export const insertTreino = (nome, data, exercicios) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO treinos (nome, data, exercicios) VALUES (?, ?, ?);', [nome, data, exercicios]);
  });
};

export const fetchTreinos = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM treinos;', [], (_, { rows }) => {
      const treinos = [];
      for (let i = 0; i < rows.length; i++) {
        treinos.push(rows.item(i));
      }
      callback(treinos);
    });
  });
};


export const removeTable = () => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE treinos;');
    });
};


export const updateExercicio = (id, novoExercicio) => {
    db.transaction(tx => {
      tx.executeSql('UPDATE treinos SET exercicios = ? WHERE id = ?;', [novoExercicio, id]);
    });
};
