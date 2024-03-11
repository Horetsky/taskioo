import { UserModel } from "@/server/db/models/user";
import User = UserModel.User;

import { AreaModel } from "@/server/db/models/area";
import Area = AreaModel.Area;

class Database {
    public user: User;
    public area: Area;

    constructor() {
        this.user = new User();
        this.area = new Area();
    }
}

const db = new Database();
export default db;