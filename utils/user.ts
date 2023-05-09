import axios from "axios";
import { useUserStore } from "../store/user.store";
import { BASE_URL } from "../constants";

export async function getUserDetails(initial_access_token?: string) {
    const { user, updateAccessToken, updateUserId } = useUserStore();

    const access_token = initial_access_token || user.access_token;

    if (!access_token) throw new Error("No access token found" + 500);

    //query github api to get user details
    const github_url = "https://api.github.com/user";
    const { data, status } = await axios.get(github_url, {
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: "Bearer " + access_token,
        },
    });

    if (status === 401) {
        // Need to login again, show login banner below
        updateAccessToken("");
        return;
    }

    if (status !== 200) throw new Error("Got invalid status code " + status);

    //update the user store
    updateAccessToken(access_token);

    //check if user exists in db
    const url = BASE_URL + "/user/?id=" + data.id;
    //get user details from supabase if user exists
    const { data: user_data, status: user_status } = await axios.get(url);

    if (user_status !== 200)
        throw new Error("Got invalid status code " + status);

    //create user if it does not exist
    console.log(user_data);
    if (user_data.length === 0) {
        const create_url = BASE_URL + "/user";
        const { data: create_data, status: create_status } = await axios.post(
            create_url,
            {
                id: data.id,
                name: data.name,
                username: data.login,
                bio: data.bio,
                profile_photo: data.avatar_url,
            }
        );
        if (create_status !== 200)
            throw new Error("Got invalid status code " + status);
        updateUserId(create_data.id);
    } else {
        updateUserId(user_data[0].id);
    }
    return data;
}

export async function getUserFollowers(id: string) {
    const url = BASE_URL + "/user/followers/" + String(id);
    const { data, status } = await axios.get(url);
    if (status !== 200) throw new Error("Got invalid status code " + status);
    return data;
}

export async function followUser(
    follower_id: string,
    following_id: string,
    bearer_token: string
) {
    console.log(follower_id, following_id, bearer_token);
    const url = BASE_URL + "/user/follow";
    const { status, data } = await axios.post(
        url,
        {
            follower_id,
            following_id,
        },
        {
            headers: {
                Authorization: "Bearer " + bearer_token,
            },
        }
    );
    // if (status !== 200) throw new Error("Got invalid status code " + status);
    return data;
}

export async function unfollowUser(
    follower_id: string,
    following_id: string,
    bearer_token: string
) {
    console.log(follower_id, following_id, bearer_token);
    const url = BASE_URL + "/user/unfollow";
    const { status, data } = await axios.post(
        url,
        {
            follower_id,
            following_id,
        },
        {
            headers: {
                Authorization: "Bearer " + bearer_token,
            },
        }
    );
    // if (status !== 200) throw new Error("Got invalid status code " + status);
    return data;
}
