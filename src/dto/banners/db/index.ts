export interface BannersDB {
    id: string;
    title: string;
    sub_title: string;
    cta: string;
    image_url: string;
    created_at: string;
    updated_at: string | null;
}

export interface InsertBannersDB {
    id: string;
    title: string;
    sub_title: string;
    cta: string;
    image_url: string;
    created_at: string;
}

export interface UpdateBannersDB {
    title: string;
    sub_title: string;
    cta: string;
    image_url: string;
    updated_at: string | null;
}

