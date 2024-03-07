import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient({

    handleReturnedServerError(e) {
        // Every other error that occurs will be masked with the default message.
        return e.message;
    },

});