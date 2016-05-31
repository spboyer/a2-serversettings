export interface ISettings {
    title: string,
    environment: string,
    webApiUrl: string,
}


export class appSettings {
    public static settings: ISettings;
}