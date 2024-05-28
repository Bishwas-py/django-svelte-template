export type SiteData = {
    title: string;
    subtitle: string;
    description: string;
    thumbnail: string;
    email: string;
    keywords: string;
    ads_on: boolean;
    site: Site
}

export type Site = {
    domain: string;
    name: string;
}