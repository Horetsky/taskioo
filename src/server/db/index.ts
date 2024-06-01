import { UserModel } from "@/server/db/models/user";
import { AreaModel } from "@/server/db/models/area";
import { ProfileModel } from "@/server/db/models/profile";
import { ListModel } from "@/server/db/models/list";
import { TaskModel } from "@/server/db/models/task";
import { TeamModel } from "@/server/db/models/team";
import { TeamMemberModel } from "@/server/db/models/team-member";

import User = UserModel.User;
import Area = AreaModel.Area;
import Profile = ProfileModel.Profile;
import List = ListModel.List;
import Task = TaskModel.Task;
import Team = TeamModel.Team;
import TeamMember = TeamMemberModel.TeamMember;

class Database {
    public user: User;
    public area: Area;
    public profile: Profile;
    public list: List;
    public task: Task;
    public team: Team;
    public teamMember: TeamMember;

    constructor() {
        this.user = new User();
        this.area = new Area();
        this.profile = new Profile();
        this.list = new List();
        this.task = new Task();
        this.team = new Team();
        this.teamMember = new TeamMember();
    }
}

const db = new Database();
export default db;