import { UserModel } from "@/server/db/models/user";
import { AreaModel } from "@/server/db/models/area";
import { ProfileModel } from "@/server/db/models/profile";
import { ListModel } from "@/server/db/models/list";

import User = UserModel.User;
import Area = AreaModel.Area;
import Profile = ProfileModel.Profile;
import List = ListModel.List;

class Database {
    public user: User;
    public area: Area;
    public profile: Profile;
    public list: List;

    constructor() {
        this.user = new User();
        this.area = new Area();
        this.profile = new Profile();
        this.list = new List();
    }
}

const db = new Database();
export default db;