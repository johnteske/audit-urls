declare const got: any;
declare const options: {
    timeout: number;
    retry: number;
};
interface LinkStatus {
    url: string;
    error?: string;
    status?: number;
    redirect?: string[];
    https?: "available" | "no";
}
