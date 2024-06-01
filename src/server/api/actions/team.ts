"use server";

import { action } from "@/lib/action";
import db from "@/server/db";

export const getUserTeamMembers = action(null, async ({ ctx }) => {
    const {
        teamId
    } = ctx.session.user;

    if(!teamId) {
        throw new Error("");
    }

    // const teamMembers = await db.teamMember.findMany({
    //     where: {
    //         team_id: teamId
    //     },
    //     include: {
    //         "team": "team_id"
    //     }
    // });
    //
    // console.log(teamMembers);
});