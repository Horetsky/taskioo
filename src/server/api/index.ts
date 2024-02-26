import { User } from "@/server/api/user";

class Api {
    user: User;

    constructor() {
        this.user = new User();
    }
}

const api = new Api();

export default api;