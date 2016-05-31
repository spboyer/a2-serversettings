export interface ISettings {
    title: string,
    environment: string,
    webApiUrl: string,
}


export class AppSettings {
    public static settings: ISettings;
}