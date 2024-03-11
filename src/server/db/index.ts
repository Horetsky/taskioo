import { UserModel } from "@/server/db/models/user";
import { AreaModel } from "@/server/db/models/area";
import { ProfileModel } from "@/server/db/models/profile";

import User = UserModel.User;
import Area = AreaModel.Area;
import Profile = ProfileModel.Profile;

class Database {
    public user: User;
    public area: Area;
    public profile: Profile;

    constructor() {
        this.user = new User();
        this.area = new Area();
        this.profile = new Profile();
    }
}

const db = new Database();
export default db;