declare const got: any;
declare const options: {
    timeout: number;
    retry: number;
};
declare type LinkStatus = {
    url: string;
    error?: string;
    status?: number;
    redirect?: string[];
    https?: "available" | "no";
};
declare function getStatus(url: any): Promise<{
    url: any;
    error: any;
    status: any;
    redirect?: undefined;
    https?: undefined;
} | {
    url: any;
    status: any;
    redirect: any;
    https: any;
    error?: undefined;
}>;
declare function formatStatus(v: LinkStatus): void;
