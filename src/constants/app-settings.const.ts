export default class AppSettings {
    static readonly TEST_DATA = ['..', 'src', 'data'].join('/');
    static readonly RECOMMENDATIONS_FILE = [this.TEST_DATA, 'pizza-recommendations.#ENV#.csv'].join('/');
}