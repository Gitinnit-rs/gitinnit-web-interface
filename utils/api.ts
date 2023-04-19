import { BASE_URL } from "~/constants";

export function getUsersByName(name: string) {
  const { data, error, pending, refresh } = useLazyFetch(
    BASE_URL + "/user/name/" + name
  );
  if (error)
    throw new Error(
      `Error while fetching user by name "${name}": `,
      error.value?.message as any
    );

  console.log("Data in api call", data);

  return { data, pending, refresh };
}
