import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('database.db');

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS treinos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, data TEXT, exercicios TEXT);'
    );
  });
};



export const deleteId = (id) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM treinos WHERE id = ?', [id]
    )
  })
}

export const insertTreino = (nome, data, exercicios) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO treinos (nome, data, exercicios) VALUES (?, ?, ?);',
        [nome, data, exercicios],
        (_, result) => {
          resolve(result.insertId); // Chamando resolve com o insertId
        },
        (_, error) => {
          reject(error); // Chamando reject com o erro, caso ocorra
        }
      );
    });
  });
};




export const fetchTreinos = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM treinos;', [], (_, { rows }) => {
      const treinos = [];
      for (let i = rows.length - 1; i >= 0; i--) {
        treinos.push(rows.item(i));
      }
      callback(treinos);
    });
  });
};

export const fetchTreinoId = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM treinos WHERE id = ?;',
      [id],
      (_, { rows }) => {
        const treinos = [];
        for (let i = rows.length - 1; i >= 0; i--) {
          treinos.push(rows.item(i));
        }
        callback(treinos);
      }
    );
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

export const updateTreino = (id, nome, data, exercicios) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE treinos SET nome = ?, data = ?, exercicios = ? WHERE id = ?;',[nome, data, exercicios,id])
  })
}