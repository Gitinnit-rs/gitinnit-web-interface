import axios from "axios";
import { useDebounceFn } from "@vueuse/core";

import { BASE_URL } from "~/constants";

export const getUsersByName = useDebounceFn(async (name: string) => {
  const { data, status, statusText } = await axios(
    BASE_URL + "/user/name/" + name
  );

  if (status !== 200) {
    console.log(
      `Error while fetching user by name "${name}": `,
      status,
      statusText
    );
    throw new Error(
      `Error while fetching user by name "${name}": ` +
        status +
        " " +
        statusText
    );
  }

  return { data };
}, 1000);
