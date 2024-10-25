import {Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo} from "sequelize-typescript"
import User from "./User.model";

@Table({
    tableName: "FingerPrint",
})

class FingerPrint extends Model{

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
        type: DataType.INTEGER
    })
    declare Data: string;

}
export default FingerPrint