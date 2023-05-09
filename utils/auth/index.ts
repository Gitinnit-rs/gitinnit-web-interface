// TODO auth connection using the auth service
import { useUserStore } from "~/store/user.store";

export const logout = () => {
    const userStore = useUserStore();
    // const router = useRouter();
    userStore.setUser(null);
    // router.push("/");
};
