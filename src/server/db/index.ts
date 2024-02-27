import { User } from "@/server/db/models/user";

class Database {
    user: User;

    constructor() {
        this.user = new User();
    }
}

const db = new Database();
export default db;