import Sheet from "./sheet_model";

export default class SheetHelper {
  /**
   * Create a sheet with empty entries
   * @returns {Sheet}
   */
  toSheetWithoutEntries(key, data) {
    return new Sheet(key, data.date, []);
  }
}
