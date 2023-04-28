// TODO auth connection using the auth service
import { useUserStore } from "~/store/user.store";

export const signOut = () => {
  const userStore = useUserStore();
  const router = useRouter();
  userStore.user = null;
  router.push("/");
};
