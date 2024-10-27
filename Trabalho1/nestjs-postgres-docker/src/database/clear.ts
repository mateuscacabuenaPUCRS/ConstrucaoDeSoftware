import { DataSource } from 'typeorm';

export async function truncateAllTables(dataSource: DataSource) {
  const queryRunner = dataSource.createQueryRunner();

  try {
    // Start a transaction
    await queryRunner.startTransaction();

    // Disable foreign key constraints
    await queryRunner.query('SET session_replication_role = replica;');

    // Get all table names
    const tables = await queryRunner.query(
      `SELECT tablename FROM pg_tables WHERE schemaname = 'public';`
    );

    // Truncate each table
    for (const { tablename } of tables) {
      await queryRunner.query(`TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE;`);
    }

    // Commit the transaction
    await queryRunner.commitTransaction();
  } catch (error) {
    // Rollback if something goes wrong
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    // Re-enable foreign key constraints
    await queryRunner.query('SET session_replication_role = DEFAULT;');
    
    // Release the query runner
    await queryRunner.release();
  }
}
