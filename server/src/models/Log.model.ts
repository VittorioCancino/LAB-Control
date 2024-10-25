import {Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo} from "sequelize-typescript"
import User from "./User.model";

@Table({
    tableName: "Log",
})

class Log extends Model{

    // Admin ID
    @PrimaryKey
    @AutoIncrement
    @Column({
        type:DataType.INTEGER
    })
    declare Id: number;

    @ForeignKey(() => User)
    @Column({
        type:DataType.INTEGER
    })
    declare UserId: User;

    @BelongsTo(() => User)
	declare UserFK: User;

    // Entry Time of the User
    @Column({
        type: DataType.STRING
    })
    declare EntryTime: string;

    // Exit Time of the User
    @Column({
        type: DataType.STRING
    })
    declare ExitTime: string;

    // Reason of the User
    @Column({
        type: DataType.STRING
    })
    declare Reason: string;

}
export default Log