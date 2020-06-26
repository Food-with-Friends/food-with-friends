import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  title: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
