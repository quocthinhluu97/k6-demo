export default class FileUtils {
    static getPathByEnv(filePath: string): string {
        return filePath.replace('#ENV#', __ENV.ENV || '');
    }
}