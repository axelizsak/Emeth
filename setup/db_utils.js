import chalk from 'chalk';

export function printDatabaseContents(db) {
  db.query('SELECT * FROM RPCtest', (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données : ', error);
    } else {
      console.log(chalk.yellow('\n=== Database Contents ==='));
      results.forEach((row) => {
        console.log(chalk.green(`RPC: ${row.rpc}, Chain: ${row.chain}, MPD: ${row.mpd}`));
      });
    }
    db.end();
  });
}
