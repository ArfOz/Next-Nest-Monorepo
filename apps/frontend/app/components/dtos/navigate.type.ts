export interface Navigate {
    name: string;
    href: string;
}
export interface UpdateCommentDataDto {
    id: string;
    title?: string;
    comment?: string;
    star?: number;
}
