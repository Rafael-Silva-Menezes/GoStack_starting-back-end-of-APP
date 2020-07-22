import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterDoctorFieldToDoctorId1594731291380
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('schedules', 'doctor');
    await queryRunner.addColumn(
      'schedules',
      new TableColumn({
        name: 'doctor_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'schedules',
      new TableForeignKey({
        name: 'ScheduleDoctor',
        columnNames: ['doctor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('schedules', 'ScheduleDoctor');
    await queryRunner.dropColumn('schedules', 'doctor_id');
    await queryRunner.addColumn(
      'schedules',
      new TableColumn({
        name: 'doctor',
        type: 'varchar',
      }),
    );
  }
}
