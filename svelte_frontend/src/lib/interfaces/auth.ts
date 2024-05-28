export interface User {
    id: number;
    first_name?: string;
    last_name?: string;
    email: string;
    username: string;
    is_staff?: string;
    is_superuser?: string;
    is_verified?: boolean;
    status: Status;
    profile: Profile;
    socket_token?: string;
    date_joined: string;
}

export interface Status {
    is_confirmed: boolean;
    last_sent_time: string;
    token_key_expires: string;
}

export interface Profile {
    bio?: string;
    location?: string;
    birth_date?: string;
    image?: string;
}
