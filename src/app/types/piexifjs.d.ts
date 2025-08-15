declare module 'piexifjs' {
  export const ImageIFD: {
    XResolution: number;
    YResolution: number;
    ResolutionUnit: number;
  };

  // Тип для объекта EXIF (здесь описан только раздел 0th с ключами из ImageIFD)
  export interface ExifZeroth {
    [key: number]: number[]; // например: [72, 1]
  }

  export interface ExifObj {
    '0th': ExifZeroth;
  }

  export function dump(exifObj: ExifObj): string;

  export function insert(exifBytes: string, jpegBase64: string): string;

  export function remove(jpegBase64: string): string;

  export function load(jpegBase64: string): ExifObj | null;
}
