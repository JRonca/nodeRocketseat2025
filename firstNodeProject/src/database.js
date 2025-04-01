import fs from 'node:fs';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  constructor () {
    fs.readFile(databasePath, 'utf-8', (err, data) => {
      if (err) {
        this.#persist();
      } else {
        this.#database = JSON.parse(data);
      }
    });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database), (err) => {
      if (err) {
        console.log('Error writing file:', err);
      }
    });
  }

  select (table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  insert (table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}