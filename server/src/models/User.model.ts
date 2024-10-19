import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Unique, HasOne } from "sequelize-typescript"
import Active from "./Active.model";
import Log from "./Log.model";

@Table({
    tableName: "User",
})

class User extends Model {
    // TODO Add Nature of the variables
    // Id of the User
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare Id: number;

    // Rut Identificator of the User
    @Unique
    @Column({
        type: DataType.STRING
    })
    declare Rut: string;

    // Email of the User
    @Unique
    @Column({
        type: DataType.STRING
    })
    declare Email: string;

    // Name of the User
    @Column({
        type: DataType.STRING
    })
    declare Name: string;

    // LastName of the User
    @Column({
        type: DataType.STRING
    })
    declare LastName: string;

    // Current Career of the User
    @Column({
        type: DataType.STRING
    })
    declare Career: string;

    @Column({
        type: DataType.STRING
    })
    declare Role: string;

}
export default User
