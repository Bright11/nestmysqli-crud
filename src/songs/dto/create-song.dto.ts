import { IsArray, IsDateString, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateSongDTO {

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true }) // Explicitly validate each array element
  readonly artists: string[];

  @IsNotEmpty()
  @IsDateString()
  readonly releaseDate: string; // Changed to string

  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, { message: "duration must be in HH:MM or HH:MM:SS format" })
  readonly duration: string; // Changed to string, with regex validation
}