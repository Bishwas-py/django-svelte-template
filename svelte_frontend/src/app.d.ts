// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            current_user: import('$lib/interfaces/auth').User;
            site_data: import('$lib/interfaces/siteData').SiteData;
        }

        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
