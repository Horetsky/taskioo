import { UserModel } from "@/server/db/models/user";
import User = UserModel.User;

class Database {
    public user: User;

    constructor() {
        this.user = new User();
    }
}

const db = new Database();
export default db;