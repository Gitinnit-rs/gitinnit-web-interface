<script lang="ts" setup>
import { BASE_URL } from "~/constants";

useHead({
    title: "Search",
});

const route = useRoute();
const query = ref(route.query.q);
const url = computed(() => `${BASE_URL}/search/${query.value}`);

const { data, pending, error, execute } = useFetch<any[]>(url);

watch(
    () => route.query,
    () => {
        query.value = route.query.q;

        execute();
    }
);

console.log("Search data", data);
</script>

<template>
    <section v-if="pending">Loading...</section>
    <section v-else-if="error" class="p-10">
        <div class="alert alert-error shadow-lg">
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>
                    An error occurred while fetching search results<br />{{
                        error
                    }}
                </span>
            </div>
        </div>
    </section>
    <section v-else>
        <p>Search Results</p>
        Query: {{ query }} <br />Data:
        {{ data }}
    </section>
</template>
