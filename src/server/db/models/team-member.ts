import { z } from "zod";
import { Query } from "@/server/db/query";
import { teamMemberRole } from "@/lib/zod";

export namespace TeamMemberModel {
    export const schema = z.object({
        id: z.string(),
        team_id: z.string(),
        profile_id: z.string(),
        role: teamMemberRole
    });

    export type SchemaValue = z.infer<typeof schema>;

    export class TeamMember extends Query<SchemaValue> {
        constructor() {
            super("team_member", schema);
        }
    }
}