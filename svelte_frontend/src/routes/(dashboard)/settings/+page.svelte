<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData, PageData } from './$types';
    import Input from '$items/Input.svelte';
    import Form from '$items/Form.svelte';

    let { form, data }: PageProps<ActionData, PageData> = $props();
    let loading = $state(false);

    const initProfile = $state({
        bio: '',
        location: '',
        birth_date: '',
        first_name: '',
        last_name: ''
    });

    $effect(() => {
        const currentUser = data?.current_user;
        const profileData = data?.current_user?.profile;
        
        if (profileData) {
          initProfile.bio = profileData.bio ?? '';
          initProfile.location = profileData.location ?? '';
          initProfile.birth_date = profileData.birth_date ?? '';
          initProfile.first_name = currentUser?.first_name ?? '';
          initProfile.last_name = currentUser?.last_name ?? '';
        }
        console.log(initProfile);
    });
</script>

<div class="mx-auto p-4 max-w-2xl">
    <div class="flex flex-col gap-0 mb-6">
        <h1 class="font-bold text-2xl">Settings</h1>
        <span class="text-gray-500 dark:text-gray-400">Update your profile information</span>
    </div>

    <Form bind:loading class="flex flex-col gap-4" action="?/profile_update">
        <Input 
            name="first_name"
            text="First Name"
            placeholder="John"
            bind:value={initProfile.first_name}
        />
        <Input 
            name="last_name"
            text="Last Name"
            placeholder="Doe"
            bind:value={initProfile.last_name}
        />
        <Input 
            name="bio"
            text="Bio"
            type="textarea"
            placeholder="Tell us about yourself"
            bind:value={initProfile.bio}
        >
        </Input>
        <Input 
            name="location"
            text="Location"
            placeholder="New York, USA"
            bind:value={initProfile.location}
        />
        <Input 
            name="birth_date"
            text="Birth Date"
            type="date"
            bind:value={initProfile.birth_date}
        />
        
        <button type="submit" disabled={loading} class="font-black button-default">
            {#if loading}
                ......
            {:else}
                Save Changes
            {/if}
        </button>
    </Form>
</div>

<style>
    /* Add any additional custom styles here */
</style> 