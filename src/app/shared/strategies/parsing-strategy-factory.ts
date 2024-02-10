import {IFileParsingStrategy} from "../interfaces/i-file-parsing-strategy";
import {TxtFileParsingStrategy} from "./txt-file-parsing-strategy";

export class ParsingStrategyFactory {
  static getStrategy(file: File): IFileParsingStrategy {
    if (file.name.endsWith('.txt')) {
      return new TxtFileParsingStrategy();
    }
    // Add other conditions for different file formats
    throw new Error('Unsupported file format');
  }
}
