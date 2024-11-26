import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"

@Table({
    tableName: "Role",
})

class Role extends Model {


    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare Id: number;



    @Column({
        type: DataType.STRING
    })
    declare Description: string;

}
export default Role